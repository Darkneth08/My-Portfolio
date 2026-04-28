# Vercel Deployment

This Laravel portfolio is prepared for Vercel using the community PHP runtime.

## Files Added

- `api/index.php` - Laravel serverless entrypoint
- `vercel.json` - Vercel runtime, routes, and production-safe runtime env
- `.vercelignore` - keeps temporary files out of the upload

## Deploy

Run these from the project root:

```bash
vercel login
vercel
```

For production:

```bash
vercel --prod
```

## Required Vercel Environment Variables

Set these in the Vercel dashboard under Project Settings > Environment Variables:

```env
APP_KEY=base64:your-generated-laravel-key
APP_URL=https://your-vercel-domain.vercel.app
PORTFOLIO_OWNER_EMAIL=kennethborja2003@gmail.com
PORTFOLIO_SECONDARY_EMAIL=kennethborja00@gmail.com
PORTFOLIO_GITHUB_USERNAME=Darkneth08
PORTFOLIO_GITHUB_URL=https://github.com/Darkneth08?tab=repositories
PORTFOLIO_FACEBOOK_URL=https://www.facebook.com/share/17yoZGKbnQ/
PORTFOLIO_ADMIN_EMAIL=admin@kenneth.test
PORTFOLIO_ADMIN_PASSWORD=change-this-before-production
```

## Database Note

Vercel serverless functions do not provide persistent writable storage for SQLite. If you want the contact form, admin inbox, projects, and settings to work online, use a hosted database and set the matching Laravel DB variables in Vercel, for example:

```env
DB_CONNECTION=mysql
DB_HOST=your-database-host
DB_PORT=3306
DB_DATABASE=your-database-name
DB_USERNAME=your-database-user
DB_PASSWORD=your-database-password
```

After connecting a database, run migrations from a connected environment:

```bash
php artisan migrate --seed --force
```
