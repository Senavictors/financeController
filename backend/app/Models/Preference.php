<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Preference extends Model
{
    protected $table = 'preferences';
    protected $primaryKey = 'id';
    
    protected $fillable = [
        'user_id',
        'currency',
        'timezone',
        'language',
        'date_format',
        'week_starts_on',
        'theme',
        'notifications_enabled',
        'email_notifications',
        'push_notifications'
    ];

    protected $casts = [
        'notifications_enabled' => 'boolean',
        'email_notifications' => 'boolean',
        'push_notifications' => 'boolean'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}