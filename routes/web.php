<?php

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\PortfolioController;
use App\Http\Middleware\EnsurePortfolioAdmin;
use Illuminate\Support\Facades\Route;

Route::get('/', [PortfolioController::class, 'index'])->name('portfolio.home');
Route::post('/contact', [ContactMessageController::class, 'store'])->name('contact.store');
Route::get('/projects/{project:slug}', [PortfolioController::class, 'project'])->name('projects.show');

Route::get('/admin/login', [AdminAuthController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [AdminAuthController::class, 'login'])->name('admin.login.store');
Route::post('/admin/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');

Route::prefix('admin')
    ->name('admin.')
    ->middleware(EnsurePortfolioAdmin::class)
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        Route::resource('projects', ProjectController::class)->except(['show']);
        Route::get('messages', [MessageController::class, 'index'])->name('messages.index');
        Route::get('messages/{message}', [MessageController::class, 'show'])->name('messages.show');
        Route::patch('messages/{message}/status', [MessageController::class, 'updateStatus'])->name('messages.status');
        Route::delete('messages/{message}', [MessageController::class, 'destroy'])->name('messages.destroy');
        Route::get('settings', [SettingController::class, 'edit'])->name('settings.edit');
        Route::put('settings', [SettingController::class, 'update'])->name('settings.update');
    });
