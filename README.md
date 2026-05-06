# Kristine Bernadette D. Burgos Portfolio

React + Laravel portfolio with a live Three.js hero, light/dark mode, downloadable resumes, saved contact messages, and an admin inbox.

## Features

- React single-page portfolio mounted inside Laravel
- Three.js animated finance-themed visual scene
- Light and dark mode
- Contact form saved to the configured database
- Admin inbox at `/admin`
- Message search, read, reply, archive, and delete actions
- Render deployment files included

## Local Setup

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm run build
php artisan serve
```

Default admin PIN:

```text
2468
```

Change it in `.env`:

```env
PORTFOLIO_ADMIN_PIN=your-new-pin
```

## Render Deploy

This repo includes:

- `Dockerfile`
- `render.yaml`
- `.dockerignore`

In Render, create a new Blueprint from this GitHub repository. Render will build the Docker image, run migrations, and connect the portfolio to Render Postgres.

The Blueprint creates:

- A free Docker web service
- A free Render Postgres database for contact/admin messages

Render will ask for these secret values during Blueprint setup:

- `APP_KEY`: generate one with `php artisan key:generate --show`
- `PORTFOLIO_ADMIN_PIN`: your admin inbox PIN
