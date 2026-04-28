@extends('admin.layout')

@section('title', 'Dashboard')
@section('page_title', 'Dashboard')

@section('content')
    <section class="stats-grid">
        <article class="stat-card highlight"><span>Total Messages</span><strong>{{ $totalMessages }}</strong><i class="fa-solid fa-envelope"></i></article>
        <article class="stat-card"><span>Unread Messages</span><strong>{{ $unreadMessages }}</strong><i class="fa-solid fa-bell"></i></article>
        <article class="stat-card"><span>Replied</span><strong>{{ $repliedMessages }}</strong><i class="fa-solid fa-reply"></i></article>
        <article class="stat-card"><span>Projects</span><strong>{{ $publishedProjects }}/{{ $totalProjects }}</strong><i class="fa-solid fa-code"></i></article>
    </section>

    <section class="admin-grid two">
        <article class="panel">
            <div class="panel-head">
                <h2>Latest Messages</h2>
                <a href="{{ route('admin.messages.index') }}">View all</a>
            </div>
            <div class="list-stack">
                @forelse($latestMessages as $message)
                    <a class="message-row" href="{{ route('admin.messages.show', $message) }}">
                        <span class="status {{ $message->status }}">{{ $message->status_badge }}</span>
                        <div>
                            <strong>{{ $message->subject }}</strong>
                            <small>{{ $message->name }} • {{ $message->created_at->diffForHumans() }}</small>
                        </div>
                    </a>
                @empty
                    <p class="empty">No messages yet.</p>
                @endforelse
            </div>
        </article>

        <article class="panel">
            <div class="panel-head">
                <h2>Latest Projects</h2>
                <a href="{{ route('admin.projects.create') }}">Add project</a>
            </div>
            <div class="list-stack">
                @forelse($latestProjects as $project)
                    <a class="message-row" href="{{ route('admin.projects.edit', $project) }}">
                        <span class="status {{ $project->is_published ? 'read' : 'archived' }}">{{ $project->is_published ? 'Live' : 'Hidden' }}</span>
                        <div>
                            <strong>{{ $project->title }}</strong>
                            <small>{{ $project->category }} • {{ $project->techStackText() }}</small>
                        </div>
                    </a>
                @empty
                    <p class="empty">No projects yet.</p>
                @endforelse
            </div>
        </article>
    </section>
@endsection
