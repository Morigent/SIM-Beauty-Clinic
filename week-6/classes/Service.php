<?php
declare(strict_types=1);

require_once __DIR__ . '/ClinicItem.php';

class Service extends ClinicItem
{
    private string $description;

    public function __construct(
        int $id,
        string $name,
        string $description,
        string $status,
        string $image
    ) {
        parent::__construct($id, $name, $status, $image);
        $this->description = $description;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function isAvailable(): bool
    {
        return !$this->hasStatus('unavailable');
    }

    public function isLimited(): bool
    {
        return $this->hasStatus('limited');
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
