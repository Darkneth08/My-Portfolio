<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $project->title }} | Kenneth Borja</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <link rel="stylesheet" href="/assets/css/portfolio.css">
</head>
<body>
    <header class="site-header compact-header">
        <a href="{{ route('portfolio.home') }}" class="brand"><span>KB</span><strong>Kenneth</strong></a>
        <nav class="nav-menu static">
            <a href="{{ route('portfolio.home') }}#projects">Back to Projects</a>
            <a href="{{ route('admin.login') }}">Admin</a>
        </nav>
    </header>

    <main class="project-page">
        <article class="project-detail-card reveal">
            <p class="eyebrow">{{ $project->category }}</p>
            <h1>{{ $project->title }}</h1>
            <p class="lead">{{ $project->short_description }}</p>

            <div class="tech-tags large">
                @foreach(($project->tech_stack ?? []) as $tech)
                    <span>{{ $tech }}</span>
                @endforeach
            </div>

            <div class="project-description">
                {!! nl2br(e($project->description ?: 'No detailed description yet. You can add more project details in the admin dashboard.')) !!}
            </div>

            <div class="hero-actions">
                @if($project->github_url)<a class="btn primary" href="{{ $project->github_url }}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> GitHub</a>@endif
                @if($project->live_url)<a class="btn secondary" href="{{ $project->live_url }}" target="_blank" rel="noopener"><i class="fa-solid fa-up-right-from-square"></i> Live Demo</a>@endif
                <a class="btn ghost" href="{{ route('portfolio.home') }}#projects">Back</a>
            </div>
        </article>
    </main>

    <script src="/assets/js/portfolio.js"></script>
</body>
</html>
