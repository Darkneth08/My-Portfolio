<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'category',
        'short_description',
        'description',
        'tech_stack',
        'github_url',
        'live_url',
        'featured_image',
        'is_featured',
        'is_published',
        'sort_order',
    ];

    protected $casts = [
        'tech_stack' => 'array',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::saving(function (Project $project) {
            if (! $project->slug) {
                $project->slug = Str::slug($project->title);
            }
        });
    }

    public function techStackText(): string
    {
        return collect($this->tech_stack ?? [])->filter()->implode(', ');
    }
}
