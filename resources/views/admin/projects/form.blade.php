@extends('admin.layout')

@section('title', $project->exists ? 'Edit Project' : 'Add Project')
@section('page_title', $project->exists ? 'Edit Project' : 'Add New Project')

@section('content')
    <section class="panel form-panel">
        <form method="POST" action="{{ $project->exists ? route('admin.projects.update', $project) : route('admin.projects.store') }}">
            @csrf
            @if($project->exists)
                @method('PUT')
            @endif

            <div class="form-grid">
                <div>
                    <label>Project Title</label>
                    <input type="text" name="title" value="{{ old('title', $project->title) }}" required>
                </div>
                <div>
                    <label>Slug</label>
                    <input type="text" name="slug" value="{{ old('slug', $project->slug) }}" placeholder="Auto-generated if empty">
                </div>
                <div>
                    <label>Category</label>
                    <input type="text" name="category" value="{{ old('category', $project->category ?: 'Web System') }}" required>
                </div>
                <div>
                    <label>Sort Order</label>
                    <input type="number" name="sort_order" value="{{ old('sort_order', $project->sort_order ?? 0) }}" required>
                </div>
            </div>

            <label>Short Description</label>
            <input type="text" name="short_description" value="{{ old('short_description', $project->short_description) }}" maxlength="260" required>

            <label>Full Description</label>
            <textarea name="description" rows="6">{{ old('description', $project->description) }}</textarea>

            <label>Tech Stack <small>Separate with commas</small></label>
            <input type="text" name="tech_stack" value="{{ old('tech_stack', $project->techStackText()) }}" placeholder="Laravel, PHP, MySQL, JavaScript">

            <div class="form-grid">
                <div>
                    <label>GitHub URL</label>
                    <input type="url" name="github_url" value="{{ old('github_url', $project->github_url) }}">
                </div>
                <div>
                    <label>Live Demo URL</label>
                    <input type="url" name="live_url" value="{{ old('live_url', $project->live_url) }}">
                </div>
            </div>

            <label>Featured Image Path</label>
            <input type="text" name="featured_image" value="{{ old('featured_image', $project->featured_image) }}" placeholder="assets/img/project.jpg">

            <div class="check-row">
                <label><input type="checkbox" name="is_featured" value="1" @checked(old('is_featured', $project->is_featured))> Featured project</label>
                <label><input type="checkbox" name="is_published" value="1" @checked(old('is_published', $project->exists ? $project->is_published : true))> Published</label>
            </div>

            <div class="actions-row">
                <button type="submit" class="primary-btn">{{ $project->exists ? 'Save Changes' : 'Create Project' }}</button>
                <a href="{{ route('admin.projects.index') }}" class="ghost-btn">Cancel</a>
            </div>
        </form>
    </section>
@endsection
