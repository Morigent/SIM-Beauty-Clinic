<?php
declare(strict_types=1);

require_once __DIR__ . '/Doctor.php';
require_once __DIR__ . '/Service.php';

class ClinicRepository
{
    private array $doctors;
    private array $services;

    public function __construct(string $assetPath)
    {
        $this->doctors = [
            new Doctor(1, 'Dr. Cevin', 'Spesialis Kulit', '1.5k+ Pasien', 'available', $assetPath . 'D1.jpg'),
            new Doctor(2, 'Dr. Diandra Pratama', 'Sp. Kecantikan', '1.2k+ Pasien', 'available', $assetPath . 'doctor.jpg'),
            new Doctor(3, 'Dr. Candra Wijaya', 'Sp. Estetika', '1.8k+ Pasien', 'unavailable', $assetPath . 'D3.jpg'),
            new Doctor(4, 'Dr. Mavendra', 'Sp. Dermatologi', '1.5k+ Pasien', 'available', $assetPath . 'D2.jpg'),
        ];

        $this->services = [
            new Service(
                1,
                'Facial Treatment',
                'Membersihkan pori-pori secara mendalam, melembapkan, dan merawat kulit wajah dengan tahapan yang disesuaikan oleh dokter ahli.',
                'available',
                $assetPath . 'fas.png'
            ),
            new Service(
                2,
                'Skin Brightening',
                'Membantu meratakan tampilan warna kulit dan menjaga kilau alami dengan perawatan serum terarah tanpa iritasi.',
                'available',
                $assetPath . 'hero_woman.jpg'
            ),
            new Service(
                3,
                'Anti-Aging',
                'Perawatan untuk membantu menjaga elastisitas kulit dan menyamarkan tampilan garis halus serta kerutan.',
                'limited',
                $assetPath . 'treatment.jpg'
            ),
            new Service(
                4,
                'Laser Therapy',
                'Perawatan dengan teknologi laser mutakhir untuk membantu menangani hiperpigmentasi dan memperbaiki tekstur kulit.',
                'unavailable',
                $assetPath . 'treatment.jpg'
            ),
        ];
    }

    public function getDoctors(): array
    {
        return $this->doctors;
    }

    public function getServices(): array
    {
        return $this->services;
    }
}
