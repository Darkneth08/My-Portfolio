<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class AdminAuthController extends Controller
{
    public function showLogin(): View|RedirectResponse
    {
        if (session('portfolio_admin_logged_in')) {
            return redirect()->route('admin.dashboard');
        }

        return view('admin.auth.login');
    }

    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $validEmail = hash_equals(config('portfolio.admin_email'), $credentials['email']);
        $validPassword = hash_equals(config('portfolio.admin_password'), $credentials['password']);

        if (! $validEmail || ! $validPassword) {
            return back()->withInput(['email' => $credentials['email']])->with('error', 'Invalid admin email or password.');
        }

        $request->session()->regenerate();
        $request->session()->put('portfolio_admin_logged_in', true);
        $request->session()->put('portfolio_admin_email', $credentials['email']);

        return redirect()->route('admin.dashboard')->with('success', 'Welcome back, Kenneth!');
    }

    public function logout(Request $request): RedirectResponse
    {
        $request->session()->forget(['portfolio_admin_logged_in', 'portfolio_admin_email']);
        $request->session()->regenerateToken();

        return redirect()->route('admin.login')->with('success', 'You have logged out successfully.');
    }
}
