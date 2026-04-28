# Kenneth Borja Laravel Portfolio System

This package converts your static portfolio into a Laravel-ready portfolio system with a public website and admin dashboard.

## What is included

- Public portfolio homepage with smooth animation, dark/light mode, project filters, GitHub links, and contact form
- Laravel contact form that stores messages in the database
- Admin login page
- Admin dashboard with message counts and project stats
- Admin message inbox: read, mark replied, archive, delete
- Admin project manager: add, edit, publish/unpublish, delete projects
- GitHub repository integration using your profile: `Darkneth08`
- Optional email notification when someone sends a message
- Ready-to-copy Laravel controllers, models, views, migrations, routes, CSS, and JS

## Recommended folder name

Create or use a Laravel project named:

```bash
portfolio-laravel
```

## Step 1: Create Laravel project

Inside Laragon Terminal or CMD:

```bash
composer create-project laravel/laravel portfolio-laravel
cd portfolio-laravel
```

If you already have a Laravel project, you can use that instead.

## Step 2: Copy files

Copy the folders from this package into your Laravel project root.

When Windows asks to merge folders like `app`, `routes`, `resources`, `database`, and `public`, choose **Yes / Replace**.

## Step 3: Configure `.env`

Open your Laravel `.env` file and set your database:

```env
DB_DATABASE=portfolio_laravel
DB_USERNAME=root
DB_PASSWORD=
```

Then add these portfolio settings:

```env
PORTFOLIO_ADMIN_EMAIL=admin@kenneth.test
PORTFOLIO_ADMIN_PASSWORD=admin12345
PORTFOLIO_OWNER_EMAIL=kennethborja2003@gmail.com
PORTFOLIO_GITHUB_USERNAME=Darkneth08
PORTFOLIO_FACEBOOK_URL=#
PORTFOLIO_LINKEDIN_URL=#
```

Replace `#` with your real Facebook and LinkedIn links.

## Step 4: Run migration and seed data

```bash
php artisan migrate --seed
```

## Step 5: Run the website

```bash
php artisan serve
```

Open:

```text
http://127.0.0.1:8000
```

Admin dashboard:

```text
http://127.0.0.1:8000/admin/login
```

Default admin login:

```text
Email: admin@kenneth.test
Password: admin12345
```

## Important security note

This package uses a simple session-based admin login to keep it easy for your portfolio project. For a production system, replace the simple login with Laravel Breeze, Laravel Jetstream, or Laravel Fortify.

## Optional: Email notification

By default, Laravel may log emails instead of sending them. To send real email notifications, configure your mail settings in `.env`.

Example using Gmail SMTP needs an app password, not your normal Gmail password.

## File map

```text
app/
  Http/Controllers/
  Http/Controllers/Admin/
  Http/Middleware/
  Mail/
  Models/
config/
database/
  migrations/
  seeders/
public/assets/
resources/views/
routes/web.php
```
