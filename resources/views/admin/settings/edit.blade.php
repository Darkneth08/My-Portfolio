@extends('admin.layout')

@section('title', 'Settings')
@section('page_title', 'Portfolio Settings')

@section('content')
    <section class="panel form-panel">
        <form method="POST" action="{{ route('admin.settings.update') }}">
            @csrf
            @method('PUT')

            <label>Hero Title</label>
            <input type="text" name="hero_title" value="{{ old('hero_title', $settings['hero_title']) }}" required>

            <label>Hero Subtitle</label>
            <input type="text" name="hero_subtitle" value="{{ old('hero_subtitle', $settings['hero_subtitle']) }}" required>

            <label>About Summary</label>
            <textarea name="about_summary" rows="6" required>{{ old('about_summary', $settings['about_summary']) }}</textarea>

            <label>Location</label>
            <input type="text" name="location" value="{{ old('location', $settings['location']) }}" required>

            <button type="submit" class="primary-btn">Save Settings</button>
        </form>
    </section>
@endsection
