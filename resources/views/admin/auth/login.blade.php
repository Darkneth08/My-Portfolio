<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Admin Login</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('assets/css/admin.css') }}">
</head>
<body class="auth-body">
    <main class="auth-card">
        <div class="brand-mark">KB</div>
        <h1>Admin Dashboard</h1>
        <p>Login to manage your portfolio messages, projects, and public content.</p>

        @if(session('error'))
            <div class="alert danger">{{ session('error') }}</div>
        @endif
        @if(session('success'))
            <div class="alert success">{{ session('success') }}</div>
        @endif

        <form action="{{ route('admin.login.store') }}" method="POST" class="auth-form">
            @csrf
            <label>Email</label>
            <input type="email" name="email" value="{{ old('email', config('portfolio.admin_email')) }}" required>
            @error('email')<small>{{ $message }}</small>@enderror

            <label>Password</label>
            <input type="password" name="password" placeholder="Enter admin password" required>
            @error('password')<small>{{ $message }}</small>@enderror

            <button type="submit">Login</button>
        </form>

        <a href="{{ route('portfolio.home') }}" class="back-link">← Back to portfolio</a>
    </main>
</body>
</html>
