#!/usr/bin/env bash
set -e

if [ -z "$APP_KEY" ]; then
    php artisan key:generate --force --no-interaction
fi

if [ "${DB_CONNECTION:-sqlite}" = "sqlite" ]; then
    export DB_DATABASE="${DB_DATABASE:-/tmp/database.sqlite}"
    touch "$DB_DATABASE"
fi

php artisan config:clear --no-interaction
php artisan route:clear --no-interaction
php artisan view:clear --no-interaction
php artisan migrate --seed --force --no-interaction || true

apache2-foreground
