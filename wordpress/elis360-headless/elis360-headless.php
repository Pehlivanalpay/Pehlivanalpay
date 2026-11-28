<?php
/**
 * Plugin Name:       ELIS360 Headless
 * Description:       cms.elis360news.com'u yalnızca yönetim paneli + veri kaynağı yapar: önyüzü ana siteye yönlendirir, haber alanlarını (son dakika, özel haber, sponsorlu, video) ekler, yayın bildirimini ve önizlemeyi Next.js'e bağlar, bülten abonelerini saklar.
 * Version:           1.1.0
 * Requires at least: 6.5
 * Requires PHP:      8.0
 * Requires Plugins:  wp-graphql
 * Author:            ELIS360 NEWS
 * Text Domain:       elis360
 *
 * Kurulum ve wp-config.php ayarları: README.md (bu klasörde).
 */

if (!defined('ABSPATH')) {
	exit;
}

/* ─────────────────────────────────────────────────────────────────────────
 * Ayarlar — wp-config.php içinde tanımlanır (gizli değerler veritabanına girmez)
 *   ELIS360_FRONTEND_URL     https://www.elis360news.com
 *   ELIS360_WEBHOOK_SECRET   Vercel'deki WP_WEBHOOK_SECRET ile aynı
 *   ELIS360_PREVIEW_SECRET   Vercel'deki WP_PREVIEW_SECRET ile aynı
 * ───────────────────────────────────────────────────────────────────────── */

function elis360_frontend_url(): string {
	return rtrim(defined('ELIS360_FRONTEND_URL') ? ELIS360_FRONTEND_URL : 'https://www.elis360news.com', '/');
}

function elis360_secret(string $name): string {
	return defined($name) ? (string) constant($name) : '';
}

/** Haber alanları: meta anahtarı => [GraphQL adı, tür, panel etiketi, açıklama] */
function elis360_fields(): array {
	return [
		'_elis360_breaking'  => ['isBreaking', 'boolean', 'Son dakika', 'Header\'daki son dakika şeridinde gösterilir.'],
		'_elis360_exclusive' => ['isExclusive', 'boolean', 'Özel haber', 'Manşette "Özel haber" etiketiyle çıkar.'],
		'_elis360_sponsored' => ['isSponsored', 'boolean', 'Sponsorlu içerik', 'Sitede HER ZAMAN "Sponsorlu içerik" etiketiyle gösterilir. Kaldırılamaz.'],
		'_elis360_sponsor'   => ['sponsorName', 'string', 'Sponsor adı', 'Sponsorlu içerikte etiketin yanında yazılır.'],
		'_elis360_video_url' => ['videoUrl', 'string', 'Video adresi (YouTube)', 'Doluysa haber video olarak işaretlenir.'],
		'_elis360_duration'  => ['videoDuration', 'string', 'Video süresi', 'Örn. 04:32'],
	];
}

/* ── 1. Başsız (headless) çalışma ─────────────────────────────────────────── */

// Önyüz: yönetim, giriş, GraphQL, REST, cron ve önizleme dışındaki her istek ana siteye.
add_action('template_redirect', function () {
	if (is_admin() || wp_doing_ajax() || wp_doing_cron() || (defined('REST_REQUEST') && REST_REQUEST) || is_preview()) {
		return;
	}
	if (function_exists('is_graphql_http_request') && is_graphql_http_request()) {
		return;
	}
	$path = '';
	if (is_singular('post')) {
		$path = '/haber/' . get_post_field('post_name', get_queried_object_id());
	} elseif (is_category()) {
		$path = '/' . get_queried_object()->slug;
	}
	wp_redirect(elis360_frontend_url() . $path, 301);
	exit;
}, 1);

// Bu alan adı arama motorlarına kapalı: içerik yalnızca elis360news.com'da indekslenir.
add_filter('pre_option_blog_public', fn() => '0');
add_action('send_headers', fn() => header('X-Robots-Tag: noindex, nofollow', true));

// Gereksiz saldırı yüzeyleri.
add_filter('xmlrpc_enabled', '__return_false');
add_filter('rest_endpoints', function ($endpoints) {
	// Kullanıcı listesi herkese açık olmasın (yazar adları GraphQL'den gelir).
	if (!is_user_logged_in()) {
		unset($endpoints['/wp/v2/users'], $endpoints['/wp/v2/users/(?P<id>[\d]+)']);
	}
	return $endpoints;
});

// "Görüntüle" bağlantıları ana sitedeki adrese gitsin.
add_filter('post_link', function ($url, $post) {
	return $post->post_status === 'publish' ? elis360_frontend_url() . '/haber/' . $post->post_name : $url;
}, 10, 2);

/* ── 2. Kategoriler ──────────────────────────────────────────────────────── */

function elis360_default_categories(): array {
	return [
		'gundem'        => 'Gündem',
		'turkiye'       => 'Türkiye',
		'izmir-ve-ege'  => 'İzmir ve Ege',
		'dunya'         => 'Dünya',
		'video'         => 'Video',
		'ozel-dosyalar' => 'Özel dosyalar',
	];
}

register_activation_hook(__FILE__, function () {
	foreach (elis360_default_categories() as $slug => $name) {
		if (!term_exists($slug, 'category')) {
			wp_insert_term($name, 'category', ['slug' => $slug]);
		}
	}
	// Varsayılan "Genel/Uncategorized" yerine Gündem.
	$gundem = get_term_by('slug', 'gundem', 'category');
	if ($gundem) {
		update_option('default_category', $gundem->term_id);
	}
	// WPGraphQL için anlamlı kalıcı bağlantılar gerekir.
	if (!get_option('permalink_structure')) {
		update_option('permalink_structure', '/%postname%/');
		flush_rewrite_rules();
	}
});

/* ── 3. Haber alanları: kayıt + yazı ekranı kutusu + GraphQL ──────────────── */

add_action('init', function () {
	foreach (elis360_fields() as $key => [, $type]) {
		register_post_meta('post', $key, [
			'type'              => $type,
			'single'            => true,
			'show_in_rest'      => false,
			'sanitize_callback' => $type === 'boolean' ? 'rest_sanitize_boolean' : 'sanitize_text_field',
			'auth_callback'     => fn() => current_user_can('edit_posts'),
		]);
	}
});

add_action('add_meta_boxes_post', function () {
	add_meta_box('elis360_fields', 'ELIS360 — haber ayarları', 'elis360_render_box', 'post', 'side', 'high');
});

function elis360_render_box(WP_Post $post): void {
	wp_nonce_field('elis360_save', 'elis360_nonce');
	foreach (elis360_fields() as $key => [, $type, $label, $help]) {
		$value = get_post_meta($post->ID, $key, true);
		$id    = esc_attr($key);
		echo '<p style="margin:0 0 12px">';
		if ($type === 'boolean') {
			printf(
				'<label for="%1$s"><input type="checkbox" id="%1$s" name="%1$s" value="1" %2$s> <strong>%3$s</strong></label>',
				$id,
				checked((bool) $value, true, false),
				esc_html($label)
			);
		} else {
			printf(
				'<label for="%1$s"><strong>%2$s</strong></label><br><input type="text" id="%1$s" name="%1$s" value="%3$s" class="widefat">',
				$id,
				esc_html($label),
				esc_attr((string) $value)
			);
		}
		printf('<br><span class="description">%s</span></p>', esc_html($help));
	}
}

add_action('save_post_post', function (int $post_id) {
	if (!isset($_POST['elis360_nonce']) || !wp_verify_nonce(sanitize_key($_POST['elis360_nonce']), 'elis360_save')) {
		return;
	}
	if ((defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) || !current_user_can('edit_post', $post_id)) {
		return;
	}
	foreach (elis360_fields() as $key => [, $type]) {
		if ($type === 'boolean') {
			update_post_meta($post_id, $key, !empty($_POST[$key]));
		} else {
			$val = isset($_POST[$key]) ? sanitize_text_field(wp_unslash($_POST[$key])) : '';
			if ($key === '_elis360_video_url' && $val !== '') {
				$val = esc_url_raw($val, ['https']);
			}
			$val === '' ? delete_post_meta($post_id, $key) : update_post_meta($post_id, $key, $val);
		}
	}
}, 10, 1);

add_action('graphql_register_types', function () {
	foreach (elis360_fields() as $key => [$gql, $type, $label]) {
		register_graphql_field('Post', $gql, [
			'type'        => $type === 'boolean' ? 'Boolean' : 'String',
			'description' => 'ELIS360: ' . $label,
			'resolve'     => function ($post) use ($key, $type) {
				$v = get_post_meta($post->databaseId, $key, true);
				return $type === 'boolean' ? (bool) $v : ($v === '' ? null : (string) $v);
			},
		]);
	}
	// Son dakika yazılarını süzmek için: posts(where: { isBreaking: true })
	register_graphql_field('RootQueryToPostConnectionWhereArgs', 'isBreaking', ['type' => 'Boolean']);
	register_graphql_field('RootQueryToPostConnectionWhereArgs', 'isSponsored', ['type' => 'Boolean']);
});

add_filter('graphql_post_object_connection_query_args', function ($args, $source, $input) {
	$meta = [];
	foreach (['isBreaking' => '_elis360_breaking', 'isSponsored' => '_elis360_sponsored'] as $arg => $key) {
		if (isset($input['where'][$arg])) {
			$meta[] = $input['where'][$arg]
				? ['key' => $key, 'value' => '1']
				: ['relation' => 'OR', ['key' => $key, 'compare' => 'NOT EXISTS'], ['key' => $key, 'value' => '1', 'compare' => '!=']];
		}
	}
	if ($meta) {
		$args['meta_query'] = array_merge(['relation' => 'AND'], $args['meta_query'] ?? [], $meta);
	}
	return $args;
}, 10, 3);

/* ── 4. Yayın bildirimi → Next.js yeniden doğrulama ───────────────────────── */

function elis360_notify(WP_Post $post): void {
	$secret = elis360_secret('ELIS360_WEBHOOK_SECRET');
	if ($secret === '' || $post->post_type !== 'post') {
		return;
	}
	$cats = wp_get_post_categories($post->ID, ['fields' => 'slugs']);
	wp_remote_post(elis360_frontend_url() . '/api/revalidate', [
		'blocking' => false, // editörü bekletme
		'timeout'  => 5,
		'headers'  => ['Content-Type' => 'application/json', 'X-Elis360-Secret' => $secret],
		'body'     => wp_json_encode(['slug' => $post->post_name, 'categories' => is_array($cats) ? $cats : []]),
	]);
}

// Yayına girme, yayından kalkma (taslağa çekme / çöpe atma) ve yayındaki yazının güncellenmesi.
add_action('transition_post_status', function ($new, $old, $post) {
	if ($new === 'publish' || $old === 'publish') {
		elis360_notify($post);
	}
}, 10, 3);
add_action('post_updated', function ($id, $after, $before) {
	if ($after->post_status === 'publish' && $before->post_name !== $after->post_name) {
		elis360_notify($before); // eski adres de temizlensin
	}
}, 10, 3);

/* ── 5. Önizleme → Next.js taslak modu ─────────────────────────────────────── */

add_filter('preview_post_link', function ($link, $post) {
	$secret = elis360_secret('ELIS360_PREVIEW_SECRET');
	if ($secret === '' || $post->post_type !== 'post') {
		return $link;
	}
	return add_query_arg(['secret' => $secret, 'id' => $post->ID], elis360_frontend_url() . '/api/preview');
}, 10, 2);

/* ── 6. Bülten aboneleri (harici servis yok — veriler burada kalır) ─────── */

add_action('init', function () {
	register_post_type('elis360_subscriber', [
		'labels'          => ['name' => 'Bülten aboneleri', 'singular_name' => 'Abone', 'menu_name' => 'Bülten'],
		'public'          => false,
		'show_ui'         => true,
		'show_in_menu'    => true,
		'menu_icon'       => 'dashicons-email-alt',
		'supports'        => ['title'],
		'capability_type' => 'post',
		'capabilities'    => ['create_posts' => 'do_not_allow'], // yalnızca formdan eklenir
		'map_meta_cap'    => true,
	]);
});

// Next.js sunucusundan gelen kayıt. Tarayıcıdan doğrudan çağrılamaz (gizli anahtar).
add_action('rest_api_init', function () {
	register_rest_route('elis360/v1', '/subscribe', [
		'methods'             => 'POST',
		'permission_callback' => function (WP_REST_Request $req) {
			$secret = elis360_secret('ELIS360_WEBHOOK_SECRET');
			return $secret !== '' && hash_equals($secret, (string) $req->get_header('x-elis360-secret'));
		},
		'args'                => [
			'email'   => ['required' => true, 'validate_callback' => fn($v) => is_email($v)],
			'consent' => ['required' => true, 'validate_callback' => fn($v) => (bool) $v],
		],
		'callback'            => function (WP_REST_Request $req) {
			$email = sanitize_email($req['email']);
			$existing = get_posts(['post_type' => 'elis360_subscriber', 'title' => $email, 'post_status' => 'any', 'fields' => 'ids', 'numberposts' => 1]);
			if (!$existing) {
				$id = wp_insert_post(['post_type' => 'elis360_subscriber', 'post_title' => $email, 'post_status' => 'private'], true);
				if (is_wp_error($id)) {
					return new WP_Error('elis360_save', 'Kaydedilemedi', ['status' => 500]);
				}
				update_post_meta($id, '_elis360_consent_at', gmdate('c')); // açık rıza zamanı (KVKK)
			}
			// Var olan adres için de aynı yanıt: kimin abone olduğu dışarıdan öğrenilemez.
			return ['ok' => true];
		},
	]);
});

// Abone listesinde rıza tarihi sütunu.
add_filter('manage_elis360_subscriber_posts_columns', fn($c) => ['cb' => $c['cb'], 'title' => 'E-posta', 'consent' => 'Rıza tarihi (UTC)']);
add_action('manage_elis360_subscriber_posts_custom_column', function ($col, $id) {
	if ($col === 'consent') {
		echo esc_html((string) get_post_meta($id, '_elis360_consent_at', true));
	}
}, 10, 2);
