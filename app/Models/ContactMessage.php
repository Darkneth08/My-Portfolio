<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'subject',
        'message',
        'status',
        'ip_address',
        'user_agent',
    ];

    public function scopeUnread(Builder $query): Builder
    {
        return $query->where('status', 'unread');
    }

    public function scopeVisible(Builder $query): Builder
    {
        return $query->where('status', '!=', 'archived');
    }

    public function getStatusBadgeAttribute(): string
    {
        return match ($this->status) {
            'unread' => 'New',
            'read' => 'Read',
            'replied' => 'Replied',
            'archived' => 'Archived',
            default => ucfirst((string) $this->status),
        };
    }
}
