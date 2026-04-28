@extends('admin.layout')

@section('title', 'Projects')
@section('page_title', 'Project Manager')

@section('content')
    <section class="panel">
        <div class="panel-head">
            <form method="GET" class="filter-bar compact">
                <input type="search" name="search" placeholder="Search projects..." value="{{ $search }}">
                <button type="submit">Search</button>
            </form>
            <a href="{{ route('admin.projects.create') }}" class="primary-btn">+ Add Project</a>
        </div>

        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>Order</th>
                        <th>Project</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Featured</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($projects as $project)
                        <tr>
                            <td>{{ $project->sort_order }}</td>
                            <td>
                                <strong>{{ $project->title }}</strong><br>
                                <small>{{ $project->short_description }}</small>
                            </td>
                            <td>{{ $project->category }}</td>
                            <td><span class="status {{ $project->is_published ? 'read' : 'archived' }}">{{ $project->is_published ? 'Published' : 'Hidden' }}</span></td>
                            <td>{{ $project->is_featured ? 'Yes' : 'No' }}</td>
                            <td class="table-actions">
                                <a href="{{ route('admin.projects.edit', $project) }}" class="small-link">Edit</a>
                                <form action="{{ route('admin.projects.destroy', $project) }}" method="POST" onsubmit="return confirm('Delete this project?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-danger">Delete</button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="6" class="empty">No projects found.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        {{ $projects->links() }}
    </section>
@endsection
