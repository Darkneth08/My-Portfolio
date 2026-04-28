<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\SiteSetting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            'hero_title' => 'Hi, I\'m Kenneth Borja',
            'hero_subtitle' => 'I build professional Laravel systems, dashboards, and database-driven applications with polished interfaces and interactive web experiences.',
            'about_summary' => 'Web developer from Davao City focused on Laravel, PHP, JavaScript, UI/UX, MySQL, admin systems, and practical business-ready web applications.',
            'location' => 'Davao City, Philippines',
        ];

        foreach ($settings as $key => $value) {
            SiteSetting::put($key, $value);
        }

        $projects = [
            [
                'title' => 'Farm Inventory System',
                'category' => 'Laravel / Inventory',
                'short_description' => 'A farm supply inventory system concept for stock monitoring, item management, and business operations.',
                'description' => 'Designed for farm supply businesses that need product tracking, inventory visibility, and organized sales support.',
                'tech_stack' => ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
                'github_url' => 'https://github.com/Darkneth08/farm-inventory-system',
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Boarding House System',
                'category' => 'Web System',
                'short_description' => 'A boarding house management system concept with room, tenant, and payment workflows.',
                'description' => 'Built as a practical system idea for managing boarding house operations, tenants, rooms, and records.',
                'tech_stack' => ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
                'github_url' => 'https://github.com/Darkneth08/boarding-house-system',
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Library Borrowing System',
                'category' => 'Management System',
                'short_description' => 'A digital library borrowing system concept for books, users, borrowing records, and transactions.',
                'description' => 'Focused on improving library search, borrowing, holds, notifications, and user-friendly navigation.',
                'tech_stack' => ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
                'github_url' => 'https://github.com/Darkneth08/Library_Borrowing',
                'is_featured' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Barangay San Antonio Website',
                'category' => 'Community Website',
                'short_description' => 'A barangay website concept for public information, services, announcements, and local access.',
                'description' => 'A public-facing website layout for barangay information and digital community service presentation.',
                'tech_stack' => ['HTML', 'CSS', 'JavaScript'],
                'github_url' => 'https://github.com/Darkneth08/barangay-san-antonio',
                'is_featured' => false,
                'sort_order' => 4,
            ],
        ];

        foreach ($projects as $project) {
            Project::query()->updateOrCreate(
                ['slug' => Str::slug($project['title'])],
                array_merge($project, ['slug' => Str::slug($project['title']), 'is_published' => true])
            );
        }
    }
}
