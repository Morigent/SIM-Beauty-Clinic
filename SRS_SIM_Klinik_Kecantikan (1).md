# Software Requirements Specification (SRS)
# Sistem Informasi Manajemen (SIM) Klinik Kecantikan

**Versi:** 0.1 (Draft)
**Tanggal:** 23 September 2026
**Disusun oleh:** Morigent

---

## 1. Pendahuluan

### 1.1 Tujuan Dokumen
Dokumen ini menjelaskan kebutuhan fungsional dan non-fungsional untuk pengembangan Sistem Informasi Manajemen (SIM) Klinik Kecantikan berbasis web, yang melayani 4 (empat) jenis aktor: Pengguna/Pasien, Karyawan, Dokter, dan Super Admin.

### 1.2 Ruang Lingkup (Scope)
Sistem ini mencakup:
- Landing page publik untuk promosi dan akuisisi pasien baru
- Sistem booking treatment/perawatan
- Manajemen rekam medis pasien (Rekam Medis Elektronik / RME)
- Manajemen operasional harian (kasir, stok, jadwal)
- Dashboard reporting dan manajemen sistem untuk admin

**Asumsi awal (sudah dikonfirmasi):**
- [x] **Single-cabang** — tidak perlu arsitektur multi-cabang untuk MVP ini
- [x] **Pembayaran offline saja** — tidak ada payment gateway online, transaksi dilakukan di kasir (Karyawan)
- [x] **Tidak ada integrasi sistem eksternal** (tanpa akuntansi/WA Business API di MVP ini)
- [x] **Diasumsikan klinik punya izin praktik resmi** — standar RME tetap diperlakukan sebagai kebutuhan (karena ini dummy project untuk latihan/portofolio, tapi tetap disimulasikan seolah real agar SRS lebih representatif)

### 1.3 Definisi & Istilah
| Istilah | Keterangan |
|---|---|
| SIM | Sistem Informasi Manajemen |
| RME | Rekam Medis Elektronik |
| DP | Down Payment / uang muka booking |
| CRUD | Create, Read, Update, Delete |
| RBAC | Role-Based Access Control |

### 1.4 Aktor Sistem
1. **Guest/Pengunjung** — belum login, akses landing page saja
2. **User/Pasien** — pengguna terdaftar yang melakukan booking dan punya riwayat treatment
3. **Karyawan** (Front Office/Kasir/Beautician) — mengelola operasional harian
4. **Dokter** — mengelola data medis dan treatment pasien
5. **Super Admin** — kontrol penuh atas sistem

---

## 2. Kebutuhan Fungsional (Functional Requirements)

Format kode: `FR-[MODUL]-[NOMOR]`

### 2.1 Modul Landing Page (Guest)

| Kode | Kebutuhan |
|---|---|
| FR-LP-01 | Sistem menampilkan hero section dengan tagline klinik dan CTA booking |
| FR-LP-02 | Sistem menampilkan daftar layanan/treatment beserta deskripsi dan harga estimasi |
| FR-LP-03 | Sistem menampilkan profil dokter (foto, spesialisasi, jam praktik) |
| FR-LP-04 | Sistem menampilkan galeri before-after (dengan consent form yang tercatat) |
| FR-LP-05 | Sistem menampilkan testimoni pasien |
| FR-LP-06 | Sistem menampilkan lokasi klinik (map embed) dan jam operasional |
| FR-LP-07 | Sistem menyediakan form kontak/WhatsApp CTA |
| FR-LP-08 | Sistem menampilkan artikel/blog edukasi (opsional, bagus untuk SEO) |
| FR-LP-09 | Landing page harus responsive (mobile-first, karena traffic klinik kecantikan umumnya dominan mobile) |

### 2.2 Modul Autentikasi & Manajemen Akun

| Kode | Kebutuhan |
|---|---|
| FR-AUTH-01 | Sistem mendukung registrasi pasien via email/nomor HP dengan OTP verification |
| FR-AUTH-02 | Sistem mendukung login untuk 4 role berbeda dengan RBAC |
| FR-AUTH-03 | Sistem mendukung reset password |
| FR-AUTH-04 | Super Admin dapat membuat akun Karyawan dan Dokter (tidak self-register) |
| FR-AUTH-05 | Sistem mencatat log aktivitas login (audit trail) per role |
| FR-AUTH-06 | Sistem mendukung manajemen sesi (auto-logout setelah idle, khususnya untuk role yang akses data medis) |

### 2.3 Modul User/Pasien

| Kode | Kebutuhan |
|---|---|
| FR-USR-01 | Pasien dapat melengkapi profil (data diri, riwayat alergi, kontak darurat) |
| FR-USR-02 | Pasien dapat melakukan booking treatment: pilih layanan → pilih dokter/beautician → pilih slot jadwal |
| FR-USR-03 | Sistem menampilkan ketersediaan slot jadwal secara real-time |
| FR-USR-04 | Pasien membayar DP/pelunasan booking secara offline di kasir saat kedatangan (tidak ada payment gateway online) |
| FR-USR-05 | Pasien dapat melihat riwayat booking dan status (pending/confirmed/completed/cancelled) |
| FR-USR-06 | Pasien dapat reschedule/cancel booking sesuai kebijakan (mis. min. H-1) |
| FR-USR-07 | Pasien dapat melihat riwayat treatment dan rekomendasi lanjutan dari dokter |
| FR-USR-08 | Pasien menerima notifikasi (email/WA/push) untuk reminder jadwal dan promo |
| FR-USR-09 | Pasien dapat memberikan rating/review setelah treatment selesai |
| FR-USR-10 | Pasien dapat mengunduh invoice/kuitansi digital |

### 2.4 Modul Karyawan (Front Office/Kasir)

| Kode | Kebutuhan |
|---|---|
| FR-KRY-01 | Karyawan dapat melihat dan mengelola daftar booking harian (approve/reject/reschedule) |
| FR-KRY-02 | Karyawan dapat melakukan check-in pasien saat kedatangan |
| FR-KRY-03 | Karyawan dapat membuat transaksi kasir (treatment + produk retail jika ada) |
| FR-KRY-04 | Karyawan dapat mengelola stok produk (in/out, minimum stock alert) |
| FR-KRY-05 | Karyawan dapat mencetak/mengirim invoice ke pasien |
| FR-KRY-06 | Karyawan dapat melihat jadwal dokter/beautician untuk keperluan penjadwalan |
| FR-KRY-07 | Karyawan dapat menginput data pasien walk-in (tanpa booking online) |

### 2.5 Modul Dokter

| Kode | Kebutuhan |
|---|---|
| FR-DOK-01 | Dokter dapat melihat jadwal pasien pada hari berjalan dan mendatang |
| FR-DOK-02 | Dokter dapat mengakses riwayat medis pasien sebelum treatment |
| FR-DOK-03 | Dokter dapat menginput hasil pemeriksaan/diagnosa |
| FR-DOK-04 | Dokter dapat menginput resep/rekomendasi produk |
| FR-DOK-05 | Dokter dapat mengunggah foto before-after (dengan flag consent pasien) |
| FR-DOK-06 | Dokter dapat memberikan rekomendasi treatment lanjutan beserta jadwal ulang |
| FR-DOK-07 | Dokter dapat menandai treatment tertentu yang butuh approval khusus (mis. tindakan invasif) |
| FR-DOK-08 | Sistem mencatat setiap perubahan pada rekam medis dengan timestamp dan user (tidak bisa dihapus, hanya bisa ditambah revisi — untuk keperluan audit medis) |

### 2.6 Modul Super Admin

| Kode | Kebutuhan |
|---|---|
| FR-ADM-01 | Admin dapat CRUD master data: layanan/treatment, harga, kategori, produk |
| FR-ADM-02 | Admin dapat CRUD data dokter, karyawan, dan hak akses (role & permission) |
| FR-ADM-03 | Admin dapat melihat dashboard reporting: revenue harian/bulanan, treatment terpopuler, okupansi dokter |
| FR-ADM-04 | Admin dapat mengatur konfigurasi sistem: jam operasional, kebijakan cancel/reschedule, kebijakan DP |
| FR-ADM-05 | Admin dapat mengelola promo/diskon dan voucher |
| FR-ADM-06 | Admin dapat mengekspor laporan (Excel/PDF) untuk keperluan akuntansi |
| FR-ADM-07 | Admin dapat melihat audit log seluruh aktivitas sistem |
| FR-ADM-08 | Admin dapat mengelola konten landing page (CMS ringan: testimoni, galeri, artikel) tanpa perlu developer |

---

## 3. Kebutuhan Non-Fungsional (Non-Functional Requirements)

| Kode | Kategori | Kebutuhan |
|---|---|---|
| NFR-01 | Keamanan | Data medis dan data pribadi pasien harus dienkripsi (at-rest & in-transit) |
| NFR-02 | Keamanan | Implementasi RBAC ketat — dokter tidak boleh akses data finansial, karyawan tidak boleh akses rekam medis detail |
| NFR-03 | Keamanan | Password hashing (bcrypt/argon2), rate limiting untuk login |
| NFR-04 | Kepatuhan | Mengacu pada regulasi perlindungan data pribadi (UU PDP) dan standar RME jika berlaku |
| NFR-05 | Performa | Landing page load time < 3 detik (penting untuk SEO & akuisisi) |
| NFR-06 | Performa | Sistem booking harus mendukung concurrent user tanpa double-booking slot |
| NFR-07 | Skalabilitas | Sistem single-cabang untuk MVP ini; tidak ada requirement multi-cabang |
| NFR-08 | Usability | Dashboard karyawan dan dokter harus minim klik (dipakai berulang setiap hari, prioritaskan efisiensi) |
| NFR-09 | Ketersediaan | Uptime sistem operasional (booking, kasir) minimal 99% |
| NFR-10 | Auditability | Semua perubahan data medis dan transaksi tercatat log dengan jejak (siapa, kapan, apa) |
| NFR-11 | Kompatibilitas | Landing page & booking harus optimal di mobile browser (mayoritas user akses via HP) |
| NFR-12 | Backup | Backup database rutin (harian) mengingat data medis kritikal |

---

## 4. Model Data (High-Level, untuk didetailkan nanti)

Entitas utama yang kemungkinan dibutuhkan:

- **User** (id, nama, kontak, role, status)
- **Patient Profile** (user_id, alergi, riwayat, kontak darurat)
- **Doctor Profile** (user_id, spesialisasi, jadwal praktik)
- **Employee Profile** (user_id, jabatan, cabang)
- **Service/Treatment** (id, nama, kategori, harga, durasi, deskripsi)
- **Booking** (id, patient_id, service_id, doctor_id, jadwal, status, dp_amount)
- **Medical Record** (id, patient_id, doctor_id, tanggal, diagnosa, resep, foto, versi/revisi)
- **Transaction/Invoice** (id, booking_id, total, metode_bayar, status)
- **Product/Stock** (id, nama, stok, harga, minimum_alert)
- **Promo/Voucher** (id, kode, diskon, masa_berlaku)
- **Audit Log** (id, user_id, aksi, timestamp, entitas_terkait)

> Catatan: struktur di atas untuk single-cabang. Tidak ada entitas Branch karena scope MVP ini sudah difiksasi single-cabang.

---

## 5. Use Case Prioritas untuk MVP

Karena titik mulai lo adalah landing page dan desain, urutan pengembangan yang disarankan:

1. **Fase 1 — Landing Page** (FR-LP-01 s/d FR-LP-09) ← fokus saat ini
2. **Fase 2 — Auth & Booking dasar** (FR-AUTH-*, FR-USR-01 s/d FR-USR-06)
3. **Fase 3 — Operasional Karyawan** (FR-KRY-*)
4. **Fase 4 — Rekam Medis Dokter** (FR-DOK-*)
5. **Fase 5 — Admin Dashboard & Reporting** (FR-ADM-*)
6. **Fase 6 — Fitur lanjutan**: payment gateway online, CMS landing page, multi-cabang

---

## 6. Hal yang Perlu Diputuskan Sebelum Lanjut ke Desain Sistem (bukan landing page)

- Kebijakan cancel/reschedule booking (berapa jam sebelum jadwal?)
- Apakah DP booking wajib atau opsional?
- Standar consent form untuk foto before-after (legal & etika)
- Struktur harga: apakah per treatment tetap atau bisa custom per pasien (mis. paket)
- Apakah butuh multi-bahasa (Indonesia saja atau + Inggris)?

---

*Dokumen ini adalah draft awal (v0.1) dan perlu direview lebih lanjut bersama stakeholder klinik (owner, dokter penanggung jawab) sebelum masuk ke tahap desain sistem penuh.*
