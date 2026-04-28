<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Admin Dashboard') | Kenneth Portfolio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <link rel="stylesheet" href="{{ asset('assets/css/admin.css') }}">
</head>
<body class="admin-body">
    <aside class="admin-sidebar">
        <a href="{{ route('admin.dashboard') }}" class="admin-logo"><span>KB</span> Admin</a>
        <nav>
            <a href="{{ route('admin.dashboard') }}" class="{{ request()->routeIs('admin.dashboard') ? 'active' : '' }}"><i class="fa-solid fa-gauge"></i> Dashboard</a>
            <a href="{{ route('admin.messages.index') }}" class="{{ request()->routeIs('admin.messages.*') ? 'active' : '' }}"><i class="fa-solid fa-inbox"></i> Messages <b>{{ \App\Models\ContactMessage::unread()->count() }}</b></a>
            <a href="{{ route('admin.projects.index') }}" class="{{ request()->routeIs('admin.projects.*') ? 'active' : '' }}"><i class="fa-solid fa-folder-open"></i> Projects</a>
            <a href="{{ route('admin.settings.edit') }}" class="{{ request()->routeIs('admin.settings.*') ? 'active' : '' }}"><i class="fa-solid fa-gear"></i> Settings</a>
            <a href="{{ route('portfolio.home') }}" target="_blank"><i class="fa-solid fa-globe"></i> View Site</a>
        </nav>
    </aside>

    <div class="admin-shell">
        <header class="admin-topbar">
            <div>
                <p class="muted">Kenneth Borja Portfolio System</p>
                <h1>@yield('page_title', 'Dashboard')</h1>
            </div>
            <form method="POST" action="{{ route('admin.logout') }}">
                @csrf
                <button type="submit" class="ghost-btn"><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
            </form>
        </header>

        @if(session('success'))
            <div class="alert success">{{ session('success') }}</div>
        @endif
        @if(session('error'))
            <div class="alert danger">{{ session('error') }}</div>
        @endif
        @if($errors->any())
            <div class="alert danger">
                <strong>Please fix these errors:</strong>
                <ul>
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <main class="admin-content">
            @yield('content')
        </main>
    </div>
</body>
</html>
