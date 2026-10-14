<?php
declare(strict_types=1);

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$slides = [
    [
        'eyebrow' => 'Perawatan personal',
        'title' => 'Kulit sehat, bersinar alami',
        'description' => 'Temukan perawatan yang tepat untuk kebutuhan kulit Anda bersama tenaga profesional kami.',
        'image' => 'image/hero_woman.jpg',
        'image_alt' => 'Perawatan kecantikan untuk kulit sehat',
        'badge' => 'Konsultasi tersedia',
        'action' => 'Lihat layanan',
        'target' => '#services',
    ],
    [
        'eyebrow' => 'Ditangani tenaga ahli',
        'title' => 'Rawat diri dengan percaya diri',
        'description' => 'Konsultasikan tujuan perawatan Anda dan dapatkan rekomendasi dari dokter klinik.',
        'image' => 'image/doctor.jpg',
        'image_alt' => 'Dokter klinik kecantikan',
        'badge' => 'Dokter berpengalaman',
        'action' => 'Kenali dokter',
        'target' => '#doctors',
    ],
    [
        'eyebrow' => 'Teknologi dan kenyamanan',
        'title' => 'Waktunya memberi perhatian pada kulit',
        'description' => 'Pilih dari rangkaian layanan kulit yang dirancang untuk menemani perjalanan perawatan Anda.',
        'image' => 'src/treatment.jpg',
        'image_alt' => 'Perawatan kulit di klinik',
        'badge' => 'Layanan pilihan',
        'action' => 'Jelajahi perawatan',
        'target' => '#services',
    ],
];

$doctors = [
    [
        'name' => 'Dr. Cevin',
        'specialty' => 'Spesialis Kulit',
        'patients' => '1.5k+ pasien',
        'status' => 'available',
        'image' => 'image/D1.jpg',
    ],
    [
        'name' => 'Dr. Diandra Pratama',
        'specialty' => 'Sp. Kecantikan',
        'patients' => '1.2k+ pasien',
        'status' => 'available',
        'image' => 'src/doctor.jpg',
    ],
    [
        'name' => 'Dr. Candra Wijaya',
        'specialty' => 'Sp. Estetika',
        'patients' => '1.8k+ pasien',
        'status' => 'unavailable',
        'image' => 'image/D3.jpg',
    ],
    [
        'name' => 'Dr. Mavendra',
        'specialty' => 'Sp. Dermatologi',
        'patients' => '1.5k+ pasien',
        'status' => 'available',
        'image' => 'image/D2.jpg',
    ],
];

$services = [
    [
        'name' => 'Facial Treatment',
        'description' => 'Membersihkan, melembapkan, dan merawat kulit wajah dengan tahapan yang disesuaikan oleh tenaga ahli.',
        'status' => 'available',
    ],
    [
        'name' => 'Skin Brightening',
        'description' => 'Membantu meratakan tampilan warna kulit dan menjaga kilau alami dengan perawatan yang terarah.',
        'status' => 'available',
    ],
    [
        'name' => 'Anti-Aging',
        'description' => 'Perawatan untuk membantu menjaga elastisitas kulit dan menyamarkan tampilan garis halus.',
        'status' => 'limited',
    ],
    [
        'name' => 'Laser Therapy',
        'description' => 'Perawatan dengan teknologi laser untuk membantu menangani berbagai kebutuhan kulit tertentu.',
        'status' => 'unavailable',
    ],
];
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Klinik kecantikan dengan dokter terpercaya dan layanan perawatan kulit berkualitas.">
    <title>Klinik Kecantikan — Perawatan Terbaik untuk Anda</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="src/clinic.css">
    <style>
        .server-hero {
            display: block;
            min-height: 0;
            padding: 3rem;
        }
        .server-slide {
            display: none;
            max-width: 1200px;
            min-height: 430px;
            margin: 0 auto;
            grid-template-columns: minmax(0, 1fr) minmax(220px, 340px);
            align-items: center;
            gap: 3rem;
        }
        .server-slide.is-active { display: grid; }
        .server-slide-copy { max-width: 620px; }
        .server-slide-copy .hero-title { margin: 1rem 0; }
        .server-slide-description {
            max-width: 540px;
            margin-bottom: 1.5rem;
            color: var(--teal-dark);
        }
        .server-slide-image {
            width: 100%;
            height: 360px;
            object-fit: cover;
            object-position: top center;
            border-radius: 120px 120px 18px 18px;
            box-shadow: 0 20px 60px rgba(13,92,78,0.22);
        }
        .hero-eyebrow {
            color: var(--teal-dark);
            font-size: .8rem;
            font-weight: 700;
            letter-spacing: .12em;
            text-transform: uppercase;
        }
        .hero-controls {
            display: flex;
            align-items: center;
            gap: .6rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        .hero-dot {
            width: 10px;
            height: 10px;
            border: 0;
            border-radius: 50%;
            background: rgba(26,107,94,.3);
            cursor: pointer;
            transition: width .2s, border-radius .2s, background .2s;
        }
        .hero-dot.is-active {
            width: 24px;
            border-radius: 5px;
            background: var(--teal-dark);
        }
        .status-badge {
            display: inline-flex;
            align-items: center;
            width: fit-content;
            padding: .25rem .65rem;
            border-radius: 999px;
            font-size: .72rem;
            font-weight: 700;
        }
        .status-available { color: #17664f; background: #dff5eb; }
        .status-limited { color: #8a5a00; background: #fff0c2; }
        .status-unavailable { color: #9b3543; background: #fde3e6; }
        .doctor-card { position: relative; }
        .doctor-number {
            position: absolute;
            top: .7rem;
            left: .7rem;
            z-index: 1;
            display: grid;
            width: 2rem;
            height: 2rem;
            place-items: center;
            border-radius: 50%;
            color: #fff;
            background: var(--teal-dark);
            font-size: .8rem;
            font-weight: 700;
        }
        .doctor-status { margin-top: .6rem; }
        .services-layout { grid-template-columns: minmax(190px, 260px) 1fr; }
        .service-btn { display: flex; align-items: center; justify-content: space-between; gap: .5rem; }
        .service-btn:disabled { cursor: not-allowed; opacity: .55; }
        .service-number { color: var(--orange); font-weight: 700; margin-right: .5rem; }
        .service-content { min-height: 240px; justify-content: center; }
        .service-desc-card { min-height: 150px; }
        .service-desc-card h3 { color: #fff; margin-bottom: .6rem; }
        @media (max-width: 760px) {
            .server-hero { padding: 2rem 1.25rem; }
            .server-slide,
            .server-slide.is-active { grid-template-columns: 1fr; gap: 1.5rem; }
            .server-slide-image { height: 240px; max-width: 300px; }
            .hero-controls { margin-top: 1.5rem; }
            .services-layout { grid-template-columns: 1fr; }
            .services-sidebar { flex-direction: row; flex-wrap: wrap; }
            .service-btn { flex: 1 1 180px; }
        }
    </style>
</head>
<body>
    <header id="header">
        <a href="#hero" class="logo" aria-label="Klinik, kembali ke beranda">
            <span class="logo-icon" aria-hidden="true">♥</span>
            <span class="logo-text">Klinik</span>
        </a>
        <nav aria-label="Navigasi utama">
            <a href="#hero" class="nav-link active">Beranda</a>
            <a href="#doctors" class="nav-link">Dokter</a>
            <a href="#services" class="nav-link">Layanan</a>
            <a href="#review" class="nav-link">Tentang</a>
        </nav>
        <a class="btn-login" href="#services">Buat janji</a>
    </header>

    <main>
        <section class="hero server-hero" id="hero" aria-label="Informasi klinik">
            <?php foreach ($slides as $index => $slide): ?>
                <article class="server-slide<?= $index === 0 ? ' is-active' : '' ?>"
                         data-slide="<?= $index ?>"
                         aria-hidden="<?= $index === 0 ? 'false' : 'true' ?>">
                    <div class="server-slide-copy">
                        <span class="hero-eyebrow"><?= e($slide['eyebrow']) ?></span>
                        <h1 class="hero-title"><?= e($slide['title']) ?></h1>
                        <p class="server-slide-description"><?= e($slide['description']) ?></p>
                        <p><a class="btn-daftar" href="<?= e($slide['target']) ?>"><?= e($slide['action']) ?> &rarr;</a></p>
                    </div>
                    <img class="server-slide-image"
                         src="<?= e($slide['image']) ?>"
                         alt="<?= e($slide['image_alt']) ?>">
                </article>
            <?php endforeach; ?>
            <div class="hero-controls" id="hero-controls" aria-label="Pilih slide">
                <?php foreach ($slides as $index => $slide): ?>
                    <button class="hero-dot<?= $index === 0 ? ' is-active' : '' ?>"
                            type="button"
                            data-slide-to="<?= $index ?>"
                            aria-label="Tampilkan slide <?= $index + 1 ?>"
                            aria-pressed="<?= $index === 0 ? 'true' : 'false' ?>"></button>
                <?php endforeach; ?>
            </div>
        </section>

        <section class="section doctors-section" id="doctors">
            <div class="section-header">
                <h2 class="section-title">Dokter Kami</h2>
                <div class="section-underline"></div>
            </div>
            <div class="doctors-grid">
                <?php foreach ($doctors as $index => $doctor): ?>
                    <?php
                    $isAvailable = $doctor['status'] === 'available';
                    $statusLabel = $isAvailable ? 'Tersedia' : 'Tidak tersedia';
                    $statusClass = $isAvailable ? 'status-available' : 'status-unavailable';
                    ?>
                    <article class="doctor-card" id="doctor-<?= $index + 1 ?>">
                        <span class="doctor-number" aria-label="Dokter nomor <?= $index + 1 ?>"><?= $index + 1 ?></span>
                        <div class="doctor-img-wrap">
                            <img src="<?= e($doctor['image']) ?>"
                                 alt="<?= e($doctor['name']) ?>"
                                 class="doctor-img"
                                 loading="lazy">
                        </div>
                        <div class="doctor-info">
                            <p class="doctor-name"><?= e($doctor['name']) ?></p>
                            <p class="doctor-spec"><?= e($doctor['specialty']) ?></p>
                            <p class="doctor-stats"><?= e($doctor['patients']) ?></p>
                            <span class="status-badge <?= $statusClass ?> doctor-status"><?= e($statusLabel) ?></span>
                        </div>
                    </article>
                <?php endforeach; ?>
            </div>
        </section>

        <section class="section services-section" id="services">
            <div class="section-header">
                <h2 class="section-title">Layanan Kami</h2>
                <div class="section-underline"></div>
            </div>
            <div class="services-layout">
                <aside class="services-sidebar" aria-label="Pilih layanan">
                    <?php foreach ($services as $index => $service): ?>
                        <?php
                        $serviceAvailable = $service['status'] !== 'unavailable';
                        $serviceStatusClass = $service['status'] === 'limited'
                            ? 'status-limited'
                            : ($serviceAvailable ? 'status-available' : 'status-unavailable');
                        $serviceStatusLabel = $service['status'] === 'limited'
                            ? 'Terbatas'
                            : ($serviceAvailable ? 'Tersedia' : 'Tidak tersedia');
                        ?>
                        <button class="service-btn<?= $index === 0 ? ' active' : '' ?>"
                                type="button"
                                data-service="<?= $index ?>"
                                data-description="<?= e($service['description']) ?>"
                                data-status="<?= e($serviceStatusLabel) ?>"
                                data-status-class="<?= $serviceStatusClass ?>"
                                <?= $serviceAvailable ? '' : 'disabled' ?>>
                            <span><span class="service-number"><?= $index + 1 ?>.</span><?= e($service['name']) ?></span>
                            <span class="status-badge <?= $serviceStatusClass ?>"><?= e($serviceStatusLabel) ?></span>
                        </button>
                    <?php endforeach; ?>
                </aside>
                <div class="service-content" id="service-content" aria-live="polite">
                    <div class="service-img-wrap">
                        <img src="src/treatment.jpg" alt="Perawatan kulit di klinik" class="service-img">
                    </div>
                    <div class="service-desc-card">
                        <h3 id="service-title"><?= e($services[0]['name']) ?></h3>
                        <p class="service-desc" id="service-desc"><?= e($services[0]['description']) ?></p>
                    </div>
                </div>
            </div>
        </section>

        <section class="section review-section" id="review">
            <div class="review-bg">
                <div class="review-card">
                    <p class="quote-icon" aria-hidden="true">"</p>
                    <p class="review-text">Perawatan yang nyaman, penjelasan dokter mudah dipahami, dan stafnya sangat ramah.</p>
                    <div class="reviewer">
                        <div class="reviewer-avatar" aria-hidden="true">F</div>
                        <div class="reviewer-info">
                            <p class="reviewer-name">Fatima Al-Said</p>
                            <div class="stars" aria-label="5 dari 5 bintang">★★★★★</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer id="footer">
        <div class="footer-inner">
            <div class="footer-logo"><span class="logo-text">Klinik</span></div>
            <div class="footer-links">
                <div class="footer-col">
                    <a href="#doctors" class="footer-link">Dokter kami</a>
                    <a href="#services" class="footer-link">Layanan kami</a>
                </div>
                <div class="footer-col">
                    <p class="footer-contact-title">Hubungi kami</p>
                    <a href="mailto:info@klinik.com" class="footer-link">info@klinik.com</a>
                    <a href="tel:+6212345678" class="footer-link">+62 123-456-78</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom"><p>&copy; <?= date('Y') ?> Klinik Kecantikan.</p></div>
    </footer>

    <script>
        const slides = [...document.querySelectorAll('.server-slide')];
        const slideButtons = [...document.querySelectorAll('.hero-dot')];
        let activeSlide = 0;
        let slideTimer;

        function showSlide(index) {
            activeSlide = (index + slides.length) % slides.length;
            slides.forEach((slide, slideIndex) => {
                const isActive = slideIndex === activeSlide;
                slide.classList.toggle('is-active', isActive);
                slide.setAttribute('aria-hidden', String(!isActive));
                slideButtons[slideIndex].classList.toggle('is-active', isActive);
                slideButtons[slideIndex].setAttribute('aria-pressed', String(isActive));
            });
        }

        function startSlideTimer() {
            clearInterval(slideTimer);
            slideTimer = setInterval(() => showSlide(activeSlide + 1), 5000);
        }

        slideButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                showSlide(index);
                startSlideTimer();
            });
        });

        if (slides.length > 1) startSlideTimer();

        const serviceTitle = document.getElementById('service-title');
        const serviceDescription = document.getElementById('service-desc');
        document.querySelectorAll('.service-btn:not(:disabled)').forEach((button) => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.service-btn').forEach((item) => item.classList.remove('active'));
                button.classList.add('active');
                serviceTitle.textContent = button.querySelector('span').textContent.replace(/^\d+\.\s*/, '');
                serviceDescription.textContent = button.dataset.description;
            });
        });
    </script>
</body>
</html>
