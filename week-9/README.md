# 🏥 Week 9 — Klinik Kecantikan (Laravel MVC, Migrations & Eloquent)

Project Laravel lengkap untuk tugas Praktikum Week 9 yang mengintegrasikan data klinik kecantikan dari Week 5–7 ke dalam arsitektur Laravel modern.

---

## 📂 Struktur File yang Dibuat

1. **Konfigurasi Database**:
   - [`.env`](.env) — Koneksi MySQL ke database `clinic_week9`
   - [`.env.example`](.env.example)

2. **Migrations (3 Tabel)** di `database/migrations/`:
   - `2026_01_01_000001_create_slides_table.php` (Tabel `slides`)
   - `2026_01_01_000002_create_doctors_table.php` (Tabel `doctors`)
   - `2026_01_01_000003_create_services_table.php` (Tabel `services`)

3. **Models (Eloquent)** di `app/Models/`:
   - `Slide.php` — Model untuk tabel `slides`
   - `Doctor.php` — Model untuk tabel `doctors` (dengan method `isAvailable()`, `getStatusLabel()`, `getStatusBadgeClass()`)
   - `Service.php` — Model untuk tabel `services` (dengan method `isAvailable()`, `isLimited()`, `getStatusLabel()`, `getStatusBadgeClass()`)

4. **Seeder** di `database/seeders/`:
   - `DatabaseSeeder.php` — Berisi data awal (3 slide, 4 dokter, 4 layanan) dari Week 5–7

5. **Controller** di `app/Http/Controllers/`:
   - `ClinicController.php` — Method `index()` mengambil data dari Model `Slide`, `Doctor`, dan `Service` lalu mengirimkannya ke view

6. **Views (Blade Template)** di `resources/views/`:
   - `index.blade.php` — Tampilan responsive modern lengkap dengan hero slider interaktif, grid dokter, tab layanan dinamis, ulasan, dan footer

7. **Routes** di `routes/`:
   - `web.php` — Menghubungkan URL `/` ke `ClinicController@index`

---

## 🚀 Cara Menjalankan

### 1. Masuk ke folder `week-9` dan install dependencies:
```bash
cd c:\kumpulansmt5\Pratikum\Prak_Mob\Project\week5\clinic\week-9
composer install
```

### 2. Buat database di MySQL (XAMPP / Laragon):
Buka `phpMyAdmin` atau terminal MySQL, lalu buat database:
```sql
CREATE DATABASE clinic_week9;
```

### 3. Jalankan Migrasi & Seeder:
```bash
php artisan migrate --seed
```

### 4. Jalankan Server:
```bash
php artisan serve
```
Buka browser di: **`http://127.0.0.1:8000`**

