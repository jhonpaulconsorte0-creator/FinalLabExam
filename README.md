# HelpDesk: setup and deployment

## 1. Scaffold (run once, in an empty folder)
```
composer create-project laravel/laravel helpdesk
cd helpdesk
composer require laravel/breeze --dev
php artisan breeze:install react      # pick: no dark mode, PHPUnit/Pest, whichever
```
Then copy every file from this package over the project (same paths, overwrite when asked).

## 2. Three small edits to existing files

**app/Models/User.php**: add the relationship
```php
use Illuminate\Database\Eloquent\Relations\HasMany;

public function tickets(): HasMany
{
    return $this->hasMany(Ticket::class);
}
```

**bootstrap/app.php**: trust Railway's proxy so HTTPS URLs are generated
```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->trustProxies(at: '*');
    // keep Breeze's web(append: [HandleInertiaRequests::class, ...]) lines
})
```

**app/Providers/AppServiceProvider.php**: force https in production (no mixed content)
```php
use Illuminate\Support\Facades\URL;

public function boot(): void
{
    if ($this->app->environment('production')) {
        URL::forceScheme('https');
    }
}
```

## 3. Run locally
```
cp .env.example .env && php artisan key:generate
# set DB_* in .env (MySQL, or sqlite locally)
php artisan migrate --seed
npm install && npm run dev        # and: php artisan serve
```
Demo login: demo@example.com / password123

## 4. Railway
1. Push to a PUBLIC GitHub repo. Check `.env` is NOT committed (it's in Laravel's default .gitignore).
2. Railway > New Project > Deploy from GitHub repo.
3. In the project: + New > Database > MySQL.
4. On the app service > Variables:
```
APP_NAME=HelpDesk
APP_ENV=production
APP_DEBUG=false
APP_KEY=<output of: php artisan key:generate --show>
APP_URL=https://<your-app>.up.railway.app
DB_CONNECTION=mysql
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_DATABASE=${{MySQL.MYSQLDATABASE}}
DB_USERNAME=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
SESSION_DRIVER=database
LOG_CHANNEL=stderr
```
5. Settings > Networking > Generate Domain.
6. `railway.json` runs `migrate --force` and the idempotent seeder on each deploy. The build step runs `composer install` and `npm run build` automatically; confirm in the build logs.

## 5. Pre-defense checklist
- Open /tickets/<another user's id> -> must show 403.
- Log out, open /tickets -> redirected to /login.
- Submit an invalid form -> errors under fields, input kept, button disabled while saving.
- Redeploy, confirm the data is still there (MySQL, not SQLite).
