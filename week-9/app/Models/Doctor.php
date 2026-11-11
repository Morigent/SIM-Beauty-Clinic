<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    protected $table = 'doctors';

    protected $fillable = [
        'name',
        'specialty',
        'patients',
        'status',
        'image',
    ];

    public function isAvailable(): bool
    {
        return $this->status === 'available';
    }

    public function getStatusLabel(): string
    {
        return $this->isAvailable() ? 'Tersedia' : 'Tidak tersedia';
    }

    public function getStatusBadgeClass(): string
    {
        return $this->isAvailable() ? 'status-available' : 'status-unavailable';
    }
}

