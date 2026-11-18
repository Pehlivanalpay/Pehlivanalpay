#!/usr/bin/env bash
# cPanel "Setup Node.js App" (CloudLinux + Passenger) için yükleme paketi: elis360-site.zip
#
# İçerik: Next standalone sunucusu (server.js) + derlenmiş .next + public/ + package.json + package-lock.json
# node_modules YOK: CloudLinux paketleri kendi sanal ortamında tutar ve uygulama klasöründe
# node_modules klasörü kabul etmez. Sunucuda "Run NPM Install" bağımlılıkları kilit dosyasındaki
# sürümlerle kurar (derlenen Next sürümüyle birebir aynı olması şart).
#
# Kullanım: npm run build:cpanel   → kılavuz: docs/deploy-cpanel.md
set -euo pipefail
cd "$(dirname "$0")/.."

rm -rf .next deploy elis360-site.zip
npx next build

mkdir -p deploy/.next
cp -r .next/standalone/.next/. deploy/.next/
cp .next/standalone/server.js deploy/server.js
cp -r .next/static deploy/.next/static
cp -r public deploy/public
rm -rf deploy/.next/cache   # sunucuda yeniden oluşur

# Turbopack harici modül takma adları (.next/node_modules/<paket>-<hash>) symlink'tir ve
# ../../node_modules/<paket>'i gösterir. Zip ve cPanel "Extract" symlink'i güvenilir taşımaz;
# her birini gerçek paketi require eden küçük bir klasörle değiştir. require('postcss')
# uygulama kökündeki node_modules'a (CloudLinux sanal ortamı) çözülür.
if [ -d deploy/.next/node_modules ]; then
  for link in deploy/.next/node_modules/*; do
    [ -L "$link" ] || continue
    target_pkg="$(basename "$(readlink "$link")")"
    rm "$link"
    mkdir -p "$link"
    printf "module.exports = require('%s')\n" "$target_pkg" > "$link/index.js"
    printf '{ "name": "%s", "private": true, "main": "index.js" }\n' "$(basename "$link")" > "$link/package.json"
    echo "takma ad: $(basename "$link") → $target_pkg"
  done
fi

# Sunucu için sade package.json: yalnızca çalışma bağımlılıkları, tek betik "start".
# ("Run JS script" menüsünde build/lint gibi sunucuda çalışmaması gereken komutlar çıkmasın.)
node -e '
const p = require("./package.json");
const out = { name: p.name, version: p.version, private: true, engines: p.engines,
  scripts: { start: "node server.js" }, dependencies: p.dependencies };
require("fs").writeFileSync("deploy/package.json", JSON.stringify(out, null, 2) + "\n");
'
# Kilit dosyası: npm install aynı sürümleri kursun
cp package-lock.json deploy/package-lock.json

(cd deploy && zip -qr ../elis360-site.zip . -x '*.DS_Store')
echo "Hazır: elis360-site.zip ($(du -h elis360-site.zip | cut -f1))"
