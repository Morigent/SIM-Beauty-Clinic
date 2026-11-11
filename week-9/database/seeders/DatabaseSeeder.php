<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\Service;
use App\Models\Slide;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Truncate/refresh data
        Slide::truncate();
        Doctor::truncate();
        Service::truncate();

        // 1. Data Slide Hero
        Slide::create([
            'eyebrow' => 'Perawatan Personal',
            'title' => 'Kulit Sehat, Bersinar Alami',
            'description' => 'Temukan perawatan yang tepat untuk kebutuhan kulit Anda bersama tenaga profesional kami.',
            'image' => '/assets/images/hero_woman.jpg',
            'image_alt' => 'Perawatan kecantikan untuk kulit sehat',
            'badge' => 'Konsultasi tersedia',
            'action' => 'Lihat Layanan',
            'target' => '#services',
        ]);

        Slide::create([
            'eyebrow' => 'Ditangani Tenaga Ahli',
            'title' => 'Rawat Diri dengan Percaya Diri',
            'description' => 'Konsultasikan tujuan perawatan Anda dan dapatkan rekomendasi terbaik dari dokter spesialis klinik.',
            'image' => '/assets/images/doctor.jpg',
            'image_alt' => 'Dokter klinik kecantikan',
            'badge' => 'Dokter berpengalaman',
            'action' => 'Kenali Dokter',
            'target' => '#doctors',
        ]);

        Slide::create([
            'eyebrow' => 'Teknologi dan Kenyamanan',
            'title' => 'Waktunya Memberi Perhatian pada Kulit',
            'description' => 'Pilih dari rangkaian layanan kulit medis modern yang dirancang untuk menemani perjalanan perawatan Anda.',
            'image' => '/assets/images/treatment.jpg',
            'image_alt' => 'Perawatan kulit di klinik',
            'badge' => 'Layanan pilihan',
            'action' => 'Jelajahi Perawatan',
            'target' => '#services',
        ]);

        // 2. Data Dokter
        Doctor::create([
            'name' => 'Dr. Cevin',
            'specialty' => 'Spesialis Kulit',
            'patients' => '1.5k+ Pasien',
            'status' => 'available',
            'image' => '/assets/images/D1.jpg',
        ]);

        Doctor::create([
            'name' => 'Dr. Diandra Pratama',
            'specialty' => 'Sp. Kecantikan',
            'patients' => '1.2k+ Pasien',
            'status' => 'available',
            'image' => '/assets/images/doctor.jpg',
        ]);

        Doctor::create([
            'name' => 'Dr. Candra Wijaya',
            'specialty' => 'Sp. Estetika',
            'patients' => '1.8k+ Pasien',
            'status' => 'unavailable',
            'image' => '/assets/images/D3.jpg',
        ]);

        Doctor::create([
            'name' => 'Dr. Mavendra',
            'specialty' => 'Sp. Dermatologi',
            'patients' => '1.5k+ Pasien',
            'status' => 'available',
            'image' => '/assets/images/D2.jpg',
        ]);

        // 3. Data Layanan
        Service::create([
            'name' => 'Facial Treatment',
            'description' => 'Membersihkan pori-pori secara mendalam, melembapkan, dan merawat kulit wajah dengan tahapan yang disesuaikan oleh dokter ahli.',
            'status' => 'available',
            'image' => '/assets/images/fas.png',
        ]);

        Service::create([
            'name' => 'Skin Brightening',
            'description' => 'Membantu meratakan tampilan warna kulit dan menjaga kilau alami dengan perawatan serum terarah tanpa iritasi.',
            'status' => 'available',
            'image' => '/assets/images/hero_woman.jpg',
        ]);

        Service::create([
            'name' => 'Anti-Aging',
            'description' => 'Perawatan untuk membantu menjaga elastisitas kulit dan menyamarkan tampilan garis halus serta kerutan.',
            'status' => 'limited',
            'image' => '/assets/images/treatment.jpg',
        ]);

        Service::create([
            'name' => 'Laser Therapy',
            'description' => 'Perawatan dengan teknologi laser mutakhir untuk membantu menangani hiperpigmentasi dan memperbaiki tekstur kulit.',
            'status' => 'unavailable',
            'image' => '/assets/images/treatment.jpg',
        ]);
    }
}

