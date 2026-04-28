<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Project;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function index(): View
    {
        return view('admin.dashboard', [
            'totalMessages' => ContactMessage::count(),
            'unreadMessages' => ContactMessage::unread()->count(),
            'repliedMessages' => ContactMessage::where('status', 'replied')->count(),
            'totalProjects' => Project::count(),
            'publishedProjects' => Project::where('is_published', true)->count(),
            'latestMessages' => ContactMessage::latest()->limit(6)->get(),
            'latestProjects' => Project::latest()->limit(5)->get(),
        ]);
    }
}
