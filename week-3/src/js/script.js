/**
 * WEEK 3: SRC/JS/SCRIPT.JS
 * JavaScript Interaktivitas & DOM Manipulation
 * Struktur: src/{html,css,js,dist}
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       1. HAMBURGER MENU (MOBILE)
       ========================================================= */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    /* =========================================================
       2. HERO SLIDER & AUTO-CAROUSEL
       ========================================================= */
    const heroSlides = [
        {
            eyebrow: "Perawatan Personal",
            title: "Kulit Sehat,<br>Bersinar Alami",
            desc: "Temukan perawatan yang tepat untuk kebutuhan kulit Anda bersama tenaga profesional dan dokter berpengalaman kami.",
            image: "../../../assets/images/hero_woman.jpg",
            alt: "Wanita kulit sehat dan berseri"
        },
        {
            eyebrow: "Ditangani Tenaga Ahli",
            title: "Rawat Diri dengan<br>Percaya Diri",
            desc: "Konsultasikan tujuan perawatan kulit Anda dan dapatkan rekomendasi terbaik langsung dari dokter spesialis klinik.",
            image: "../../../assets/images/doctor.jpg",
            alt: "Dokter klinik kecantikan"
        },
        {
            eyebrow: "Teknologi Medis Terkini",
            title: "Waktunya Merawat<br>Kesehatan Kulit",
            desc: "Pilih dari rangkaian layanan kecantikan kulit berstandar medis untuk menemani perjalanan perawatan Anda.",
            image: "../../../assets/images/treatment.jpg",
            alt: "Perawatan laser klinik"
        }
    ];

    let currentSlide = 0;
    let slideInterval;
    const heroTitle = document.getElementById('hero-title');
    const heroEyebrow = document.getElementById('hero-eyebrow');
    const heroDesc = document.getElementById('hero-desc');
    const heroImg = document.getElementById('hero-img');
    const dots = document.querySelectorAll('.hero-dot');

    function updateSlide(index) {
        currentSlide = (index + heroSlides.length) % heroSlides.length;
        const slide = heroSlides[currentSlide];

        if (heroTitle && heroImg) {
            heroTitle.style.opacity = '0';
            heroImg.style.opacity = '0';

            setTimeout(() => {
                heroEyebrow.textContent = slide.eyebrow;
                heroTitle.innerHTML = slide.title;
                heroDesc.textContent = slide.desc;
                heroImg.src = slide.image;
                heroImg.alt = slide.alt;

                heroTitle.style.opacity = '1';
                heroImg.style.opacity = '1';
            }, 200);
        }

        dots.forEach((dot, idx) => {
            if (idx === currentSlide) {
                dot.classList.add('bg-teal-dark', 'w-6');
                dot.classList.remove('bg-teal/30', 'w-2.5');
            } else {
                dot.classList.remove('bg-teal-dark', 'w-6');
                dot.classList.add('bg-teal/30', 'w-2.5');
            }
        });
    }

    function startAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            updateSlide(currentSlide + 1);
        }, 4500);
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            updateSlide(idx);
            startAutoSlide();
        });
    });

    if (heroTitle) {
        heroTitle.style.transition = 'opacity 0.25s ease';
        heroImg.style.transition = 'opacity 0.25s ease';
        startAutoSlide();
    }

    /* =========================================================
       3. INTERACTIVE SERVICE TABS
       ========================================================= */
    const serviceButtons = document.querySelectorAll('.service-tab-btn');
    const serviceTitle = document.getElementById('service-title');
    const serviceDesc = document.getElementById('service-desc');
    const serviceImg = document.getElementById('service-img');

    const serviceData = {
        'facial': {
            title: 'Facial Treatment',
            desc: 'Membersihkan pori-pori secara mendalam, mengeksfoliasi sel kulit mati, melembapkan, serta merawat kulit wajah dengan tahapan teruji klinis yang disesuaikan oleh dokter ahli kami.',
            image: '../../../assets/images/fas.png'
        },
        'brightening': {
            title: 'Skin Brightening',
            desc: 'Perawatan komprehensif untuk meratakan warna kulit wajah, menyamarkan noda hitam bekas jerawat, serta memberikan efek mencerahkan alami seketika tanpa iritasi.',
            image: '../../../assets/images/hero_woman.jpg'
        },
        'antiaging': {
            title: 'Anti-Aging Therapy',
            desc: 'Terapi peremajaan kulit untuk merangsang produksi kolagen alami, meningkatkan elastisitas kulit, serta mengurangi tampilan garis halus dan kerutan secara bertahap.',
            image: '../../../assets/images/treatment.jpg'
        },
        'laser': {
            title: 'Laser Therapy',
            desc: 'Teknologi laser presisi tinggi untuk menangani masalah hiperpigmentasi, bopeng jerawat, dan meremajakan tekstur kulit dengan pengawasan ketat dokter spesialis.',
            image: '../../../assets/images/treatment.jpg'
        }
    };

    serviceButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.serviceKey;
            if (!serviceData[key]) return;

            serviceButtons.forEach(b => {
                b.classList.remove('bg-teal', 'text-white', 'shadow-md');
                b.classList.add('bg-white', 'text-gray-600', 'border', 'border-teal-pale');
            });
            btn.classList.remove('bg-white', 'text-gray-600', 'border', 'border-teal-pale');
            btn.classList.add('bg-teal', 'text-white', 'shadow-md');

            if (serviceTitle && serviceDesc && serviceImg) {
                serviceTitle.textContent = serviceData[key].title;
                serviceDesc.textContent = serviceData[key].desc;
                serviceImg.src = serviceData[key].image;
                serviceImg.alt = serviceData[key].title;
            }
        });
    });

});
