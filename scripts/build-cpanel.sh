#!/usr/bin/env bash
# cPanel "Setup Node.js App" (Passenger) için yükleme paketi üretir: elis360-site.zip
# İçerik: Next standalone sunucusu (server.js) + statik dosyalar + public/
# Kullanım: npm run build:cpanel   → kılavuz: docs/deploy-cpanel.md
set -euo pipefail
cd "$(dirname "$0")/.."

rm -rf .next deploy elis360-site.zip
npx next build

mkdir -p deploy
cp -r .next/standalone/. deploy/
mkdir -p deploy/.next
cp -r .next/static deploy/.next/static
cp -r public deploy/public
# Yerel ortam dosyaları pakete girmesin — gizli değerler cPanel'de "Environment variables"a girilir
rm -f deploy/.env deploy/.env.local deploy/.env.*.local

(cd deploy && zip -qr ../elis360-site.zip . -x '*.DS_Store')
echo "Hazır: elis360-site.zip ($(du -h elis360-site.zip | cut -f1))"
