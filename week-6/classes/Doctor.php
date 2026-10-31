<?php
declare(strict_types=1);

require_once __DIR__ . '/ClinicItem.php';

class Doctor extends ClinicItem
{
    private string $specialty;
    private string $patients;

    public function __construct(
        int $id,
        string $name,
        string $specialty,
        string $patients,
        string $status,
        string $image
    ) {
        parent::__construct($id, $name, $status, $image);
        $this->specialty = $specialty;
        $this->patients = $patients;
    }

    public function getSpecialty(): string
    {
        return $this->specialty;
    }

    public function getPatients(): string
    {
        return $this->patients;
    }

    public function isAvailable(): bool
    {
        return $this->hasStatus('available');
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
