<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $table = 'services';

    protected $fillable = [
        'name',
        'description',
        'status',
        'image',
    ];

    public function isAvailable(): bool
    {
        return $this->status !== 'unavailable';
    }

    public function isLimited(): bool
    {
        return $this->status === 'limited';
    }

    public function getStatusLabel(): string
    {
        if ($this->isLimited()) {
            return 'Terbatas';
        }

        return $this->isAvailable() ? 'Tersedia' : 'Tidak tersedia';
    }

    public function getStatusBadgeClass(): string
    {
        if ($this->isLimited()) {
            return 'status-limited';
        }

        return $this->isAvailable() ? 'status-available' : 'status-unavailable';
    }
}

