# Free Render Deployment

This project is ready for Render Free using Docker.

## Deploy Steps

1. Push this folder to GitHub.
2. Go to https://render.com and create a free account.
3. Click **New +** then **Blueprint**.
4. Connect the GitHub repo.
5. Render will detect `render.yaml`.
6. Set these required values when Render asks:

```env
APP_URL=https://your-render-url.onrender.com
PORTFOLIO_ADMIN_PASSWORD=change-this-password
```

7. Deploy.

## Notes

- This uses SQLite at `/tmp/database.sqlite` so the portfolio loads for free.
- On Render Free, data can reset when the service restarts. That means contact messages and admin project changes are not guaranteed to persist forever.
- For permanent admin/messages, add a free hosted PostgreSQL database and change:

```env
DB_CONNECTION=pgsql
DB_HOST=your-postgres-host
DB_PORT=5432
DB_DATABASE=your-database
DB_USERNAME=your-user
DB_PASSWORD=your-password
```

The public portfolio will still work even with the temporary SQLite setup.
