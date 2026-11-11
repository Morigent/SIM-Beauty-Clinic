<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Klinik kecantikan dengan dokter terpercaya dan layanan perawatan kulit berkualitas.">
    <title>Week 9 — Klinik Kecantikan (Laravel Eloquent, Migrations & Blade)</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --teal: #1a6b5e;
            --teal-dark: #0f453c;
            --orange: #e06c3a;
            --bg-light: #f7faf9;
            --text-dark: #1f2937;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-light);
            color: var(--text-dark);
            line-height: 1.6;
        }

        /* Header */
        header {
            position: sticky;
            top: 0;
            z-index: 50;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.2rem 3rem;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(8px);
            border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
            color: var(--teal-dark);
        }

        .logo-icon {
            font-size: 1.4rem;
            color: var(--orange);
        }

        .logo-text {
            font-family: 'Playfair Display', serif;
            font-size: 1.6rem;
            font-weight: 700;
        }

        nav {
            display: flex;
            gap: 1.8rem;
        }

        .nav-link {
            text-decoration: none;
            color: #4b5563;
            font-weight: 500;
            font-size: 0.95rem;
            transition: color 0.2s;
        }

        .nav-link:hover, .nav-link.active {
            color: var(--teal-dark);
            font-weight: 600;
        }

        .btn-janji {
            background: var(--teal);
            color: #fff;
            padding: 0.65rem 1.4rem;
            border-radius: 999px;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 600;
            transition: background 0.2s, transform 0.1s;
        }

        .btn-janji:hover {
            background: var(--teal-dark);
            transform: translateY(-1px);
        }

        /* Hero Carousel Section */
        .server-hero {
            position: relative;
            padding: 4rem 3rem;
            background: linear-gradient(160deg, #e8f6f3 0%, #b2ddd5 40%, #6dbdad 80%, var(--teal) 100%);
            overflow: hidden;
        }

        .server-slide {
            display: none;
            max-width: 1200px;
            min-height: 430px;
            margin: 0 auto;
            grid-template-columns: minmax(0, 1.2fr) minmax(240px, 340px);
            align-items: center;
            gap: 3rem;
        }

        .server-slide.is-active {
            display: grid;
        }

        .server-slide-copy {
            max-width: 620px;
        }

        .hero-eyebrow {
            color: var(--teal-dark);
            font-size: 0.85rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
        }

        .hero-title {
            font-family: 'Playfair Display', serif;
            margin: 1rem 0;
            font-size: 3rem;
            line-height: 1.2;
            color: #111827;
        }

        .server-slide-description {
            max-width: 540px;
            margin-bottom: 2rem;
            color: var(--teal-dark);
            font-size: 1.05rem;
            line-height: 1.6;
        }

        .btn-action {
            display: inline-block;
            background: var(--teal-dark);
            color: #fff;
            padding: 0.8rem 1.8rem;
            border-radius: 999px;
            text-decoration: none;
            font-weight: 600;
            transition: transform 0.2s, background 0.2s;
        }

        .btn-action:hover {
            background: #092c26;
            transform: translateY(-2px);
        }

        .server-slide-image {
            width: 100%;
            height: 380px;
            object-fit: cover;
            object-position: top center;
            border-radius: 130px 130px 18px 18px;
            box-shadow: 0 20px 60px rgba(13, 92, 78, 0.25);
        }

        .hero-controls {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.6rem;
            max-width: 1200px;
            margin: 2rem auto 0;
        }

        .hero-dot {
            width: 10px;
            height: 10px;
            border: 0;
            border-radius: 50%;
            background: rgba(26, 107, 94, 0.3);
            cursor: pointer;
            transition: width 0.2s, border-radius 0.2s, background 0.2s;
        }

        .hero-dot.is-active {
            width: 28px;
            border-radius: 6px;
            background: var(--teal-dark);
        }

        /* Generic Section Header */
        .section {
            padding: 5rem 3rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .section-header {
            text-align: center;
            margin-bottom: 3.5rem;
        }

        .section-title {
            font-family: 'Playfair Display', serif;
            font-size: 2.3rem;
            color: var(--teal-dark);
            margin-bottom: 0.8rem;
        }

        .section-underline {
            width: 60px;
            height: 3px;
            background: var(--orange);
            margin: 0 auto;
            border-radius: 2px;
        }

        /* Doctors Grid */
        .doctors-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 2rem;
        }

        .doctor-card {
            position: relative;
            background: #fff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .doctor-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .doctor-number {
            position: absolute;
            top: 0.85rem;
            left: 0.85rem;
            z-index: 2;
            display: grid;
            width: 2.2rem;
            height: 2.2rem;
            place-items: center;
            border-radius: 50%;
            color: #fff;
            background: var(--teal-dark);
            font-size: 0.85rem;
            font-weight: 700;
        }

        .doctor-img-wrap {
            width: 100%;
            height: 260px;
            overflow: hidden;
        }

        .doctor-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s;
        }

        .doctor-card:hover .doctor-img {
            transform: scale(1.03);
        }

        .doctor-info {
            padding: 1.5rem;
            text-align: left;
        }

        .doctor-name {
            font-size: 1.15rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 0.2rem;
        }

        .doctor-spec {
            color: #6b7280;
            font-size: 0.9rem;
            margin-bottom: 0.4rem;
        }

        .doctor-stats {
            color: var(--teal);
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 0.8rem;
        }

        /* Badges */
        .status-badge {
            display: inline-flex;
            align-items: center;
            width: fit-content;
            padding: 0.3rem 0.8rem;
            border-radius: 999px;
            font-size: 0.75rem;
            font-weight: 700;
        }

        .status-available { color: #17664f; background: #dff5eb; }
        .status-limited { color: #8a5a00; background: #fff0c2; }
        .status-unavailable { color: #9b3543; background: #fde3e6; }

        /* Services Layout */
        .services-layout {
            display: grid;
            grid-template-columns: minmax(240px, 320px) 1fr;
            gap: 2.5rem;
            background: #fff;
            padding: 2.5rem;
            border-radius: 20px;
            box-shadow: 0 4px 25px rgba(0, 0, 0, 0.05);
        }

        .services-sidebar {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
        }

        .service-btn {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            padding: 1rem 1.2rem;
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            cursor: pointer;
            text-align: left;
            font-size: 0.95rem;
            font-weight: 600;
            color: #374151;
            transition: all 0.2s;
        }

        .service-btn:hover:not(:disabled) {
            background: #eef8f5;
            border-color: var(--teal);
        }

        .service-btn.active {
            background: var(--teal);
            color: #fff;
            border-color: var(--teal);
        }

        .service-btn.active .service-number {
            color: #fff;
        }

        .service-btn:disabled {
            cursor: not-allowed;
            opacity: 0.5;
            background: #f3f4f6;
        }

        .service-number {
            color: var(--orange);
            font-weight: 700;
            margin-right: 0.4rem;
        }

        .service-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: #fdfefe;
            border-radius: 16px;
            padding: 1.5rem;
            border: 1px solid #f0fdf9;
        }

        .service-img-wrap {
            width: 100%;
            height: 280px;
            border-radius: 14px;
            overflow: hidden;
            margin-bottom: 1.5rem;
        }

        .service-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .service-desc-card h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.6rem;
            color: var(--teal-dark);
            margin-bottom: 0.6rem;
        }

        .service-desc-card p {
            color: #4b5563;
            font-size: 1rem;
            line-height: 1.7;
        }

        /* Review Section */
        .review-section {
            background: linear-gradient(135deg, #0d5c4e 0%, var(--teal-dark) 100%);
            border-radius: 24px;
            padding: 3.5rem;
            color: #fff;
            text-align: center;
            margin: 2rem auto 5rem;
            max-width: 1200px;
        }

        .quote-icon {
            font-size: 3rem;
            color: var(--orange);
            line-height: 1;
            margin-bottom: 1rem;
        }

        .review-text {
            font-family: 'Playfair Display', serif;
            font-size: 1.4rem;
            font-style: italic;
            max-width: 750px;
            margin: 0 auto 2rem;
            line-height: 1.6;
        }

        .reviewer {
            display: inline-flex;
            align-items: center;
            gap: 1rem;
        }

        .reviewer-avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: #fff;
            color: var(--teal-dark);
            display: grid;
            place-items: center;
            font-weight: 700;
            font-size: 1.2rem;
        }

        .reviewer-info {
            text-align: left;
        }

        .reviewer-name {
            font-weight: 700;
            font-size: 1rem;
        }

        .stars {
            color: #fbbf24;
            font-size: 0.9rem;
        }

        /* Footer */
        footer {
            background: #fff;
            border-top: 1px solid #e5e7eb;
            padding: 3rem;
            text-align: center;
            color: #6b7280;
            font-size: 0.9rem;
        }

        .footer-inner {
            max-width: 1200px;
            margin: 0 auto 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1.5rem;
        }

        .footer-links a {
            color: #4b5563;
            text-decoration: none;
            margin-left: 1.5rem;
            font-weight: 500;
        }

        .footer-links a:hover {
            color: var(--teal);
        }

        @media (max-width: 820px) {
            header { padding: 1rem 1.5rem; }
            .server-hero { padding: 2.5rem 1.5rem; }
            .server-slide, .server-slide.is-active { grid-template-columns: 1fr; text-align: center; }
            .server-slide-image { height: 260px; max-width: 280px; margin: 0 auto; }
            .section { padding: 3rem 1.5rem; }
            .services-layout { grid-template-columns: 1fr; padding: 1.5rem; }
            .footer-inner { flex-direction: column; text-align: center; }
            .footer-links a { margin: 0 0.8rem; }
        }
    </style>
</head>
<body>

    <!-- Header Navigation -->
    <header id="header">
        <a href="#hero" class="logo">
            <span class="logo-icon">&#9829;</span>
            <span class="logo-text">Klinik</span>
        </a>
        <nav>
            <a href="#hero" class="nav-link active">Beranda</a>
            <a href="#doctors" class="nav-link">Dokter</a>
            <a href="#services" class="nav-link">Layanan</a>
            <a href="#review" class="nav-link">Ulasan</a>
        </nav>
        <a class="btn-janji" href="#services">Buat Janji</a>
    </header>

    <main>
        <!-- Hero Section dari Model Slide (Database) -->
        <section class="hero server-hero" id="hero">
            @foreach ($slides as $index => $slide)
                <article class="server-slide {{ $index === 0 ? 'is-active' : '' }}" data-slide="{{ $index }}">
                    <div class="server-slide-copy">
                        <span class="hero-eyebrow">{{ $slide->eyebrow }}</span>
                        <h1 class="hero-title">{{ $slide->title }}</h1>
                        <p class="server-slide-description">{{ $slide->description }}</p>
                        <p><a class="btn-action" href="{{ $slide->target }}">{{ $slide->action }} &rarr;</a></p>
                    </div>
                    <img class="server-slide-image"
                         src="{{ asset(ltrim($slide->image, '/')) }}"
                         alt="{{ $slide->image_alt ?? $slide->title }}"
                         onerror="this.src='../../assets/images/{{ basename($slide->image) }}';">
                </article>
            @endforeach

            <div class="hero-controls" id="hero-controls">
                @foreach ($slides as $index => $slide)
                    <button class="hero-dot {{ $index === 0 ? 'is-active' : '' }}"
                            type="button"
                            data-slide-to="{{ $index }}"
                            aria-label="Tampilkan slide {{ $index + 1 }}"></button>
                @endforeach
            </div>
        </section>

        <!-- Doctors Section dari Model Doctor (Database) -->
        <section class="section doctors-section" id="doctors">
            <div class="section-header">
                <h2 class="section-title">Dokter Kami</h2>
                <div class="section-underline"></div>
            </div>
            <div class="doctors-grid">
                @foreach ($doctors as $index => $doctor)
                    <article class="doctor-card" id="doctor-{{ $doctor->id }}">
                        <span class="doctor-number">{{ $index + 1 }}</span>
                        <div class="doctor-img-wrap">
                            <img src="{{ asset(ltrim($doctor->image, '/')) }}"
                                 alt="{{ $doctor->name }}"
                                 class="doctor-img"
                                 loading="lazy"
                                 onerror="this.src='../../assets/images/{{ basename($doctor->image) }}';">
                        </div>
                        <div class="doctor-info">
                            <p class="doctor-name">{{ $doctor->name }}</p>
                            <p class="doctor-spec">{{ $doctor->specialty }}</p>
                            <p class="doctor-stats">{{ $doctor->patients }}</p>
                            <span class="status-badge {{ $doctor->getStatusBadgeClass() }}">
                                {{ $doctor->getStatusLabel() }}
                            </span>
                        </div>
                    </article>
                @endforeach
            </div>
        </section>

        <!-- Services Section dari Model Service (Database) -->
        <section class="section services-section" id="services">
            <div class="section-header">
                <h2 class="section-title">Layanan Kami</h2>
                <div class="section-underline"></div>
            </div>
            <div class="services-layout">
                <aside class="services-sidebar">
                    @foreach ($services as $index => $service)
                        <button class="service-btn {{ $index === 0 ? 'active' : '' }}"
                                type="button"
                                data-service="{{ $index }}"
                                data-title="{{ $service->name }}"
                                data-description="{{ $service->description }}"
                                data-image="{{ asset(ltrim($service->image, '/')) }}"
                                data-fallback-image="../../assets/images/{{ basename($service->image) }}"
                                {{ $service->isAvailable() ? '' : 'disabled' }}>
                            <span><span class="service-number">{{ $index + 1 }}.</span>{{ $service->name }}</span>
                            <span class="status-badge {{ $service->getStatusBadgeClass() }}">{{ $service->getStatusLabel() }}</span>
                        </button>
                    @endforeach
                </aside>

                @if($services->count() > 0)
                    @php $firstService = $services->first(); @endphp
                    <div class="service-content" id="service-content">
                        <div class="service-img-wrap">
                            <img id="service-content-img"
                                 src="{{ asset(ltrim($firstService->image, '/')) }}"
                                 alt="{{ $firstService->name }}"
                                 class="service-img"
                                 onerror="this.src='../../assets/images/{{ basename($firstService->image) }}';">
                        </div>
                        <div class="service-desc-card">
                            <h3 id="service-title">{{ $firstService->name }}</h3>
                            <p class="service-desc" id="service-desc">{{ $firstService->description }}</p>
                        </div>
                    </div>
                @endif
            </div>
        </section>

        <!-- Review Section -->
        <section class="review-section" id="review">
            <p class="quote-icon">&ldquo;</p>
            <p class="review-text">Perawatan yang sangat nyaman, dokter komunikatif, dan fasilitas klinik medis modern yang menenangkan.</p>
            <div class="reviewer">
                <div class="reviewer-avatar">F</div>
                <div class="reviewer-info">
                    <p class="reviewer-name">Fatima Al-Said</p>
                    <div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer id="footer">
        <div class="footer-inner">
            <div class="logo">
                <span class="logo-icon">&#9829;</span>
                <span class="logo-text">Klinik</span>
            </div>
            <div class="footer-links">
                <a href="#hero">Beranda</a>
                <a href="#doctors">Dokter</a>
                <a href="#services">Layanan</a>
                <a href="mailto:info@klinik.com">info@klinik.com</a>
            </div>
        </div>
        <p>&copy; {{ date('Y') }} Klinik Kecantikan. (Tugas Praktikum Week 9 — Laravel Eloquent, Migrations & Blade)</p>
    </footer>

    <!-- Interactive Client Script (Slider & Service Tab) -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // 1. Hero Slider
            const slides = document.querySelectorAll('.server-slide');
            const dots = document.querySelectorAll('.hero-dot');
            let currentIndex = 0;
            let slideInterval;

            function goToSlide(index) {
                if (!slides.length) return;
                slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
                dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
                currentIndex = index;
            }

            function nextSlide() {
                goToSlide((currentIndex + 1) % slides.length);
            }

            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    goToSlide(index);
                    resetTimer();
                });
            });

            function resetTimer() {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 4500);
            }

            if (slides.length > 1) {
                resetTimer();
            }

            // 2. Service Tab Selection
            const serviceBtns = document.querySelectorAll('.service-btn:not(:disabled)');
            const serviceTitle = document.getElementById('service-title');
            const serviceDesc = document.getElementById('service-desc');
            const serviceImg = document.getElementById('service-content-img');

            serviceBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.service-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    if (serviceTitle) serviceTitle.textContent = btn.dataset.title;
                    if (serviceDesc) serviceDesc.textContent = btn.dataset.description;
                    if (serviceImg && btn.dataset.image) {
                        serviceImg.src = btn.dataset.image;
                        serviceImg.onerror = function() {
                            if (btn.dataset.fallbackImage) {
                                serviceImg.src = btn.dataset.fallbackImage;
                            }
                        };
                    }
                });
            });
        });
    </script>
</body>
</html>

