<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class ProjectController extends Controller
{
    public function index(Request $request): View
    {
        $search = $request->query('search');

        $projects = Project::query()
            ->when($search, fn ($query) => $query->where('title', 'like', "%{$search}%")->orWhere('category', 'like', "%{$search}%"))
            ->orderBy('sort_order')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return view('admin.projects.index', compact('projects', 'search'));
    }

    public function create(): View
    {
        return view('admin.projects.form', ['project' => new Project()]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validatedData($request);
        $data['slug'] = Str::slug($data['slug'] ?: $data['title']);
        $data['tech_stack'] = $this->stackArray($data['tech_stack'] ?? '');
        $data['is_featured'] = $request->boolean('is_featured');
        $data['is_published'] = $request->boolean('is_published');

        Project::create($data);

        return redirect()->route('admin.projects.index')->with('success', 'Project added successfully.');
    }

    public function edit(Project $project): View
    {
        return view('admin.projects.form', compact('project'));
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $data = $this->validatedData($request, $project->id);
        $data['slug'] = Str::slug($data['slug'] ?: $data['title']);
        $data['tech_stack'] = $this->stackArray($data['tech_stack'] ?? '');
        $data['is_featured'] = $request->boolean('is_featured');
        $data['is_published'] = $request->boolean('is_published');

        $project->update($data);

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }

    private function validatedData(Request $request, ?int $projectId = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:180'],
            'slug' => ['nullable', 'string', 'max:190', Rule::unique('projects', 'slug')->ignore($projectId)],
            'category' => ['required', 'string', 'max:120'],
            'short_description' => ['required', 'string', 'max:260'],
            'description' => ['nullable', 'string'],
            'tech_stack' => ['nullable', 'string', 'max:500'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'live_url' => ['nullable', 'url', 'max:255'],
            'featured_image' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['required', 'integer', 'min:0', 'max:9999'],
        ]);
    }

    private function stackArray(string $value): array
    {
        return collect(explode(',', $value))
            ->map(fn ($item) => trim($item))
            ->filter()
            ->values()
            ->all();
    }
}
