<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class SettingController extends Controller
{
    public function edit(): View
    {
        $settings = [
            'hero_title' => SiteSetting::value('hero_title', 'Hi, I\'m Kenneth Borja'),
            'hero_subtitle' => SiteSetting::value('hero_subtitle', 'I build professional web systems, dashboards, and database-driven applications with polished user interfaces.'),
            'about_summary' => SiteSetting::value('about_summary', ''),
            'location' => SiteSetting::value('location', 'Davao City, Philippines'),
        ];

        return view('admin.settings.edit', compact('settings'));
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'hero_title' => ['required', 'string', 'max:180'],
            'hero_subtitle' => ['required', 'string', 'max:260'],
            'about_summary' => ['required', 'string', 'max:1000'],
            'location' => ['required', 'string', 'max:180'],
        ]);

        foreach ($validated as $key => $value) {
            SiteSetting::put($key, $value);
        }

        return back()->with('success', 'Portfolio settings updated.');
    }
}
