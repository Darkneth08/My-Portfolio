<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kenneth Borja | Professional Portfolio</title>
    <meta name="description" content="Kenneth Borja professional resume portfolio - web developer, Laravel developer, UI/UX system builder, and dashboard creator from Davao City, Philippines.">
    <link rel="icon" type="image/svg+xml" href="{{ asset('assets/img/kb-logo.svg') }}">
    <link rel="apple-touch-icon" href="{{ asset('assets/img/kb-logo.svg') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <link rel="stylesheet" href="{{ asset('assets/css/portfolio.css') }}">
</head>
<body>
    <canvas class="space-canvas" id="spaceCanvas" aria-hidden="true"></canvas>
    <div class="cursor-glow" aria-hidden="true"></div>
    <div class="scroll-progress" aria-hidden="true"><span></span></div>

    <header class="site-header">
        <a href="#home" class="brand" aria-label="Kenneth Borja portfolio home">
            <span class="brand-mark">KB</span>
            <strong>Kenneth</strong>
        </a>

        <nav class="nav-menu" id="navMenu">
            <a href="#home" class="nav-link active">Home</a>
            <a href="#about" class="nav-link">About</a>
            <a href="#services" class="nav-link">Services</a>
            <a href="#skills" class="nav-link">Skills</a>
            <a href="#projects" class="nav-link">Projects</a>
            <a href="#github" class="nav-link">GitHub</a>
            <a href="#contact" class="nav-link">Contact</a>
        </nav>

        <div class="header-actions">
            <a href="{{ route('admin.login') }}" class="admin-link">Admin</a>
            <button class="theme-toggle" id="themeToggle" type="button" aria-label="Toggle theme"><i class="fa-solid fa-moon"></i></button>
            <button class="menu-toggle" id="menuToggle" type="button" aria-label="Toggle menu">
                <span></span><span></span><span></span>
            </button>
        </div>
    </header>

    <main>
        <section class="hero section" id="home">
            <div class="hero-grid">
                <div class="hero-copy reveal">
                    <p class="eyebrow"><i class="fa-solid fa-location-dot"></i> {{ $settings['location'] }}</p>
                    <h1>{{ $settings['hero_title'] }}</h1>
                    <h2>I create <span id="typedText">Laravel web systems</span><span class="caret">|</span></h2>
                    <p class="hero-desc">{{ $settings['hero_subtitle'] }}</p>

                    <div class="hero-tags">
                        <span>Laravel</span>
                        <span>PHP</span>
                        <span>MySQL</span>
                        <span>JavaScript</span>
                        <span>UI/UX</span>
                    </div>

                    <div class="hero-actions">
                        <a href="#projects" class="btn primary"><i class="fa-solid fa-rocket"></i> View Projects</a>
                        <a href="#contact" class="btn secondary"><i class="fa-solid fa-paper-plane"></i> Send Message</a>
                        <a href="{{ config('portfolio.github_url') }}" target="_blank" rel="noopener" class="btn ghost"><i class="fa-brands fa-github"></i> GitHub</a>
                    </div>

                    <div class="social-links">
                        <a href="{{ config('portfolio.github_url') }}" target="_blank" rel="noopener" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
                        <a href="{{ config('portfolio.facebook_url') }}" target="_blank" rel="noopener" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>
                        <a href="{{ config('portfolio.linkedin_url') }}" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
                        <a href="mailto:{{ config('portfolio.owner_email') }}" aria-label="Email"><i class="fa-solid fa-envelope"></i></a>
                    </div>
                </div>

                <div class="hero-visual reveal delay-1">
                    <div class="holo-stage tilt-card" aria-label="Kenneth Borja interactive 3D profile">
                        <div class="holo-rings" aria-hidden="true">
                            <span></span><span></span><span></span>
                        </div>
                        <div class="avatar-orb">
                            <img src="{{ asset('assets/img/kenneth-profile.jpg') }}" alt="Kenneth Borja professional profile photo">
                        </div>
                        <div class="orbit orbit-one"><span>Laravel</span></div>
                        <div class="orbit orbit-two"><span>MySQL</span></div>
                        <div class="orbit orbit-three"><span>UI/UX</span></div>
                        <div class="profile-card">
                            <h3>Kenneth Borja</h3>
                            <p>Web Developer | Laravel Developer</p>
                            <span class="availability"><i></i> Open for Projects</span>
                        </div>
                    </div>

                    <div class="code-card tilt-card">
                        <div class="window-dots"><i></i><i></i><i></i></div>
<pre><code>Route::get('/', PortfolioController::class);
$message = ContactMessage::create($data);
return view('admin.dashboard');</code></pre>
                    </div>
                </div>
            </div>

            <div class="stats-strip reveal delay-2">
                <article><strong>{{ $projects->count() }}+</strong><span>Portfolio Projects</span></article>
                <article><strong>{{ count($githubRepos) ?: 'Live' }}</strong><span>GitHub Repositories</span></article>
                <article><strong>Admin</strong><span>Message Dashboard</span></article>
                <article><strong>100%</strong><span>Responsive Layout</span></article>
            </div>
        </section>

        <section class="section command-center" id="command-center">
            <div class="section-heading reveal">
                <p class="eyebrow">Portfolio Command Center</p>
                <h2>Professional system features behind the design</h2>
                <p>This portfolio is no longer just a page. It has Laravel routes, saved messages, project management, settings, cached GitHub data, and an admin area for real updates.</p>
            </div>

            <div class="command-grid">
                <article class="command-card reveal">
                    <span>01</span>
                    <h3>Live Message Inbox</h3>
                    <p>Contact form submissions are stored in the database and organized by unread, read, replied, and archived status.</p>
                </article>
                <article class="command-card reveal delay-1">
                    <span>02</span>
                    <h3>Project Control</h3>
                    <p>Add featured projects, reorder cards, change categories, and publish or hide work from the dashboard.</p>
                </article>
                <article class="command-card reveal delay-2">
                    <span>03</span>
                    <h3>Modern Visual Identity</h3>
                    <p>The interface uses motion, depth, glass panels, 3D orbit elements, and a reactive animated canvas background.</p>
                </article>
            </div>
        </section>

        <section class="section about" id="about">
            <div class="section-heading reveal">
                <p class="eyebrow">About Me</p>
                <h2>A portfolio that works like a real Laravel system</h2>
                <p>{{ $settings['about_summary'] }}</p>
            </div>

            <div class="feature-grid">
                <article class="glass-card reveal">
                    <i class="fa-solid fa-database"></i>
                    <h3>Database Connected</h3>
                    <p>Messages and custom projects are stored in MySQL through Laravel migrations and Eloquent models.</p>
                </article>
                <article class="glass-card reveal delay-1">
                    <i class="fa-solid fa-lock"></i>
                    <h3>Admin Dashboard</h3>
                    <p>You can login, read messages, mark replies, archive messages, and manage portfolio project cards.</p>
                </article>
                <article class="glass-card reveal delay-2">
                    <i class="fa-brands fa-github"></i>
                    <h3>GitHub Integrated</h3>
                    <p>The site can show repositories from your GitHub account and also show featured projects from your database.</p>
                </article>
            </div>
        </section>

        <section class="section services" id="services">
            <div class="section-heading reveal">
                <p class="eyebrow">Services</p>
                <h2>What I can build</h2>
            </div>

            <div class="services-grid">
                <article class="service-card reveal"><span>01</span><i class="fa-solid fa-laptop-code"></i><h3>Web Development</h3><p>Responsive websites, landing pages, CRUD systems, dashboards, and web apps using Laravel, PHP, JS, and MySQL.</p></article>
                <article class="service-card reveal delay-1"><span>02</span><i class="fa-solid fa-layer-group"></i><h3>Business Systems</h3><p>Real-world system builds such as inventory, library, boarding house, barangay, and management dashboards.</p></article>
                <article class="service-card reveal delay-2"><span>03</span><i class="fa-solid fa-pen-ruler"></i><h3>UI/UX Design</h3><p>Clean layouts, better navigation, user-friendly screens, and modern interface design with smooth transitions.</p></article>
                <article class="service-card reveal delay-3"><span>04</span><i class="fa-solid fa-chart-line"></i><h3>Admin Dashboards</h3><p>Useful dashboards for messages, status, project records, inventory data, and important system reports.</p></article>
            </div>
        </section>

        <section class="section skills" id="skills">
            <div class="section-heading reveal">
                <p class="eyebrow">Skills</p>
                <h2>My technical toolkit</h2>
            </div>

            <div class="skills-shell reveal">
                @php
                    $skills = [
                        ['Laravel', 86], ['PHP', 84], ['MySQL', 82], ['JavaScript', 85],
                        ['HTML/CSS', 92], ['Bootstrap/Tailwind', 80], ['UI/UX Design', 78], ['GitHub', 82],
                    ];
                @endphp
                @foreach($skills as [$skill, $level])
                    <div class="skill-line">
                        <div><span>{{ $skill }}</span><strong>{{ $level }}%</strong></div>
                        <i style="--level: {{ $level }}%"></i>
                    </div>
                @endforeach
            </div>
        </section>

        <section class="section projects" id="projects">
            <div class="section-heading reveal">
                <p class="eyebrow">Featured Projects</p>
                <h2>Database-powered project cards</h2>
                <p>These projects can be changed from your Laravel admin dashboard.</p>
            </div>

            <div class="project-controls reveal">
                <button class="filter-btn active" data-filter="all">All</button>
                @foreach($projects->pluck('category')->unique()->take(5) as $category)
                    <button class="filter-btn" data-filter="{{ \Illuminate\Support\Str::slug($category) }}">{{ $category }}</button>
                @endforeach
            </div>

            <div class="project-grid">
                @forelse($projects as $project)
                    <article class="project-card reveal" data-category="{{ \Illuminate\Support\Str::slug($project->category) }}">
                        <div class="project-top">
                            <span>{{ $project->category }}</span>
                            @if($project->is_featured)<b>Featured</b>@endif
                        </div>
                        <h3>{{ $project->title }}</h3>
                        <p>{{ $project->short_description }}</p>
                        <div class="tech-tags">
                            @foreach(($project->tech_stack ?? []) as $tech)
                                <span>{{ $tech }}</span>
                            @endforeach
                        </div>
                        <div class="project-links">
                            <a href="{{ route('projects.show', $project) }}">Details</a>
                            @if($project->github_url)<a href="{{ $project->github_url }}" target="_blank" rel="noopener">GitHub</a>@endif
                            @if($project->live_url)<a href="{{ $project->live_url }}" target="_blank" rel="noopener">Live</a>@endif
                        </div>
                    </article>
                @empty
                    <p class="empty-state">No projects yet. Login to the admin dashboard and add your first project.</p>
                @endforelse
            </div>
        </section>

        <section class="section github" id="github">
            <div class="section-heading reveal">
                <p class="eyebrow">GitHub</p>
                <h2>Latest repositories from Darkneth08</h2>
                <p>Laravel fetches your public repositories and keeps the page fast with cached data.</p>
            </div>

            <div class="github-grid reveal">
                @forelse($githubRepos as $repo)
                    <a class="repo-card" href="{{ $repo['url'] }}" target="_blank" rel="noopener">
                        <div>
                            <i class="fa-brands fa-github"></i>
                            <span>{{ $repo['language'] }}</span>
                        </div>
                        <h3>{{ $repo['name'] }}</h3>
                        <p>{{ $repo['description'] }}</p>
                        <small><i class="fa-solid fa-star"></i> {{ $repo['stars'] }} stars</small>
                    </a>
                @empty
                    <article class="repo-card">
                        <div><i class="fa-brands fa-github"></i><span>GitHub</span></div>
                        <h3>Open Kenneth's repositories</h3>
                        <p>GitHub API is not available right now, but your profile link still works.</p>
                        <a href="{{ config('portfolio.github_url') }}" target="_blank" rel="noopener">View GitHub</a>
                    </article>
                @endforelse
            </div>
        </section>

        <section class="section contact" id="contact">
            <div class="section-heading reveal">
                <p class="eyebrow">Contact</p>
                <h2>Send me a message</h2>
                <p>Your message will be saved inside the Laravel admin dashboard.</p>
            </div>

            <div class="contact-grid">
                <aside class="contact-card reveal">
                    <h3>Contact Information</h3>
                <p>Direct contact is available by email and through the message form. Messages are saved in the admin dashboard.</p>
                    <ul>
                        <li><i class="fa-solid fa-envelope"></i> {{ config('portfolio.owner_email') }}</li>
                        <li><i class="fa-solid fa-envelope-open"></i> {{ config('portfolio.secondary_email') }}</li>
                        <li><i class="fa-solid fa-location-dot"></i> {{ $settings['location'] }}</li>
                        <li><i class="fa-brands fa-github"></i> {{ config('portfolio.github_username') }}</li>
                    </ul>
                </aside>

                <form class="contact-form reveal delay-1" action="{{ route('contact.store') }}" method="POST">
                    @csrf

                    @if(session('success'))
                        <div class="form-alert success">{{ session('success') }}</div>
                    @endif

                    <div class="form-grid">
                        <label>
                            Your Name
                            <input type="text" name="name" value="{{ old('name') }}" required>
                            @error('name')<small>{{ $message }}</small>@enderror
                        </label>
                        <label>
                            Your Email
                            <input type="email" name="email" value="{{ old('email') }}" required>
                            @error('email')<small>{{ $message }}</small>@enderror
                        </label>
                    </div>

                    <label>
                        Subject
                        <input type="text" name="subject" value="{{ old('subject') }}" required>
                        @error('subject')<small>{{ $message }}</small>@enderror
                    </label>

                    <label>
                        Message
                        <textarea name="message" rows="7" required>{{ old('message') }}</textarea>
                        @error('message')<small>{{ $message }}</small>@enderror
                    </label>

                    <button class="btn primary" type="submit"><i class="fa-solid fa-paper-plane"></i> Save & Send Message</button>
                </form>
            </div>
        </section>
    </main>

    <button class="back-to-top" id="backToTop" type="button" aria-label="Back to top"><i class="fa-solid fa-arrow-up"></i></button>

    <footer>
        <p>© <span id="year"></span> Kenneth Borja. Built with Laravel.</p>
    </footer>

    <script src="{{ asset('assets/js/portfolio.js') }}"></script>
</body>
</html>
