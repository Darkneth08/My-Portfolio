<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\SiteSetting;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\View\View;

class PortfolioController extends Controller
{
    public function index(): View
    {
        $settings = [
            'hero_title' => SiteSetting::value('hero_title', 'Hi, I\'m Kenneth Borja'),
            'hero_subtitle' => SiteSetting::value('hero_subtitle', 'I build professional web systems, dashboards, and database-driven applications with polished user interfaces.'),
            'about_summary' => SiteSetting::value('about_summary', 'Web developer from Davao City focused on Laravel, PHP, JavaScript, UI/UX, database systems, admin dashboards, and practical business-ready web applications.'),
            'location' => SiteSetting::value('location', 'Davao City, Philippines'),
        ];

        $projects = Project::query()
            ->where('is_published', true)
            ->orderByDesc('is_featured')
            ->orderBy('sort_order')
            ->latest()
            ->get();

        $githubRepos = $this->githubRepos();

        return view('portfolio.index', compact('settings', 'projects', 'githubRepos'));
    }

    public function project(Project $project): View
    {
        abort_unless($project->is_published, 404);

        return view('portfolio.project', compact('project'));
    }

    private function githubRepos(): array
    {
        $username = config('portfolio.github_username', 'Darkneth08');

        return Cache::remember("github_repos_{$username}", now()->addMinutes(30), function () use ($username) {
            try {
                $response = Http::timeout(6)
                    ->acceptJson()
                    ->get("https://api.github.com/users/{$username}/repos", [
                        'sort' => 'updated',
                        'per_page' => 12,
                    ]);

                if (! $response->successful()) {
                    return [];
                }

                return collect($response->json())
                    ->filter(fn ($repo) => empty($repo['fork']))
                    ->map(fn ($repo) => [
                        'name' => $repo['name'] ?? 'Untitled Repository',
                        'description' => $repo['description'] ?: 'GitHub repository by Kenneth Borja.',
                        'language' => $repo['language'] ?? 'Code',
                        'url' => $repo['html_url'] ?? '#',
                        'stars' => $repo['stargazers_count'] ?? 0,
                        'updated_at' => $repo['updated_at'] ?? null,
                    ])
                    ->values()
                    ->all();
            } catch (\Throwable $exception) {
                return [];
            }
        });
    }
}
