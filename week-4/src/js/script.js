/**
 * WEEK 4: SRC/JS/SCRIPT.JS
 * JavaScript + Dynamic Array Data Rendering
 * Struktur: src/{html,css,js,dist}
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       1. DATA ARRAYS (Single Source of Truth di Client)
       ========================================================= */

    // Array Data Dokter
    const doctors = [
        {
            id: 1,
            name: "Dr. Cevin",
            specialty: "Spesialis Kulit",
            patients: "1.5k+ Pasien",
            status: "available",
            image: "../../../assets/images/D1.jpg"
        },
        {
            id: 2,
            name: "Dr. Diandra Pratama",
            specialty: "Sp. Kecantikan",
            patients: "1.2k+ Pasien",
            status: "available",
            image: "../../../assets/images/doctor.jpg"
        },
        {
            id: 3,
            name: "Dr. Candra Wijaya",
            specialty: "Sp. Estetika",
            patients: "1.8k+ Pasien",
            status: "unavailable",
            image: "../../../assets/images/D3.jpg"
        },
        {
            id: 4,
            name: "Dr. Mavendra",
            specialty: "Sp. Dermatologi",
            patients: "1.5k+ Pasien",
            status: "available",
            image: "../../../assets/images/D2.jpg"
        }
    ];

    // Array Data Layanan
    const services = [
        {
            id: "facial",
            number: "1.",
            name: "Facial Treatment",
            status: "available",
            statusLabel: "Tersedia",
            desc: "Membersihkan pori-pori secara mendalam, mengeksfoliasi sel kulit mati, melembapkan, serta merawat kulit wajah dengan tahapan teruji klinis yang disesuaikan oleh dokter ahli kami.",
            image: "../../../assets/images/fas.png"
        },
        {
            id: "brightening",
            number: "2.",
            name: "Skin Brightening",
            status: "available",
            statusLabel: "Tersedia",
            desc: "Perawatan komprehensif untuk meratakan warna kulit wajah, menyamarkan noda hitam bekas jerawat, serta memberikan efek mencerahkan alami seketika tanpa iritasi.",
            image: "../../../assets/images/hero_woman.jpg"
        },
        {
            id: "antiaging",
            number: "3.",
            name: "Anti-Aging Therapy",
            status: "limited",
            statusLabel: "Terbatas",
            desc: "Terapi peremajaan kulit untuk merangsang produksi kolagen alami, meningkatkan elastisitas kulit, serta mengurangi tampilan garis halus dan kerutan secara bertahap.",
            image: "../../../assets/images/treatment.jpg"
        },
        {
            id: "laser",
            number: "4.",
            name: "Laser Therapy",
            status: "unavailable",
            statusLabel: "Penuh",
            desc: "Teknologi laser presisi tinggi untuk menangani masalah hiperpigmentasi, bopeng jerawat, dan meremajakan tekstur kulit dengan pengawasan ketat dokter spesialis.",
            image: "../../../assets/images/treatment.jpg"
        }
    ];

    // Array Data Slide Hero
    const heroSlides = [
        {
            eyebrow: "Perawatan Personal",
            title: "Kulit Sehat,<br>Bersinar Alami",
            desc: "Temukan perawatan yang tepat untuk kebutuhan kulit Anda bersama tenaga profesional dan dokter berpengalaman kami.",
            image: "../../../assets/images/hero_woman.jpg"
        },
        {
            eyebrow: "Ditangani Tenaga Ahli",
            title: "Rawat Diri dengan<br>Percaya Diri",
            desc: "Konsultasikan tujuan perawatan kulit Anda dan dapatkan rekomendasi terbaik langsung dari dokter spesialis klinik.",
            image: "../../../assets/images/doctor.jpg"
        },
        {
            eyebrow: "Teknologi Medis Terkini",
            title: "Waktunya Merawat<br>Kesehatan Kulit",
            desc: "Pilih dari rangkaian layanan kecantikan kulit berstandar medis untuk menemani perjalanan perawatan Anda.",
            image: "../../../assets/images/treatment.jpg"
        }
    ];

    /* =========================================================
       2. RENDER DOKTER SECARA DINAMIS DARI ARRAY
       ========================================================= */
    const doctorsGrid = document.getElementById('doctors-grid');

    function renderDoctors() {
        if (!doctorsGrid) return;

        doctorsGrid.innerHTML = doctors.map(doc => {
            const isAvailable = doc.status === 'available';
            const badgeClass = isAvailable
                ? 'bg-[#dff5eb] text-[#17664f]'
                : 'bg-[#fde3e6] text-[#9b3543]';
            const badgeLabel = isAvailable ? 'Tersedia' : 'Tidak Tersedia';

            return `
                <article class="relative bg-white rounded-2xl overflow-hidden border border-teal-pale shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group">
                    <span class="absolute top-3 left-3 z-10 w-7 h-7 rounded-full bg-teal-dark text-white text-xs font-bold grid place-items-center">${doc.id}</span>
                    <div class="h-52 overflow-hidden bg-teal-bg/50">
                        <img src="${doc.image}" alt="${doc.name}" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300">
                    </div>
                    <div class="p-4 border-t-2 border-teal-pale bg-gradient-to-b from-teal-bg/20 to-white">
                        <h3 class="text-sm font-bold text-teal-dark">${doc.name}</h3>
                        <p class="text-xs text-gray-500 mt-0.5">${doc.specialty}</p>
                        <p class="text-xs text-orange font-semibold mt-1">${doc.patients}</p>
                        <span class="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${badgeClass}">${badgeLabel}</span>
                    </div>
                </article>
            `;
        }).join('');
    }

    /* =========================================================
       3. RENDER LAYANAN SECARA DINAMIS DARI ARRAY
       ========================================================= */
    const servicesSidebar = document.getElementById('services-sidebar');
    const serviceTitle = document.getElementById('service-title');
    const serviceDesc = document.getElementById('service-desc');
    const serviceImg = document.getElementById('service-img');
    let activeServiceIndex = 0;

    function renderServices() {
        if (!servicesSidebar) return;

        servicesSidebar.innerHTML = services.map((svc, idx) => {
            const isActive = idx === activeServiceIndex;
            const activeStyle = isActive
                ? 'bg-teal text-white shadow-md'
                : 'bg-white border border-teal-pale text-gray-600 hover:text-teal hover:border-teal';

            let badgeStyle = 'bg-teal-pale/50 text-teal-dark';
            if (isActive) badgeStyle = 'bg-white/20 text-white';
            else if (svc.status === 'limited') badgeStyle = 'bg-amber-100 text-amber-800';
            else if (svc.status === 'unavailable') badgeStyle = 'bg-red-100 text-red-700';

            return `
                <button type="button" data-index="${idx}"
                        class="service-tab-item ${activeStyle} p-3.5 rounded-xl text-sm font-semibold flex justify-between items-center transition-all text-left">
                    <span>${svc.number} ${svc.name}</span>
                    <span class="text-[11px] px-2 py-0.5 rounded-full font-bold ${badgeStyle}">${svc.statusLabel}</span>
                </button>
            `;
        }).join('');

        document.querySelectorAll('.service-tab-item').forEach(btn => {
            btn.addEventListener('click', () => {
                activeServiceIndex = parseInt(btn.dataset.index, 10);
                selectService(activeServiceIndex);
            });
        });
    }

    function selectService(index) {
        const svc = services[index];
        if (!svc) return;

        if (serviceTitle && serviceDesc && serviceImg) {
            serviceTitle.textContent = svc.name;
            serviceDesc.textContent = svc.desc;
            serviceImg.src = svc.image;
            serviceImg.alt = svc.name;
        }

        renderServices();
    }

    /* =========================================================
       4. HERO SLIDER CAROUSEL (DARI ARRAY)
       ========================================================= */
    let currentSlide = 0;
    let slideTimer;
    const heroTitle = document.getElementById('hero-title');
    const heroEyebrow = document.getElementById('hero-eyebrow');
    const heroDesc = document.getElementById('hero-desc');
    const heroImg = document.getElementById('hero-img');
    const dots = document.querySelectorAll('.hero-dot');

    function updateHeroSlide(index) {
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
        clearInterval(slideTimer);
        slideTimer = setInterval(() => {
            updateHeroSlide(currentSlide + 1);
        }, 4500);
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            updateHeroSlide(idx);
            startAutoSlide();
        });
    });

    /* =========================================================
       5. HAMBURGER MENU MOBILE
       ========================================================= */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        document.querySelectorAll('.mobile-nav-link').forEach(l => {
            l.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }

    /* Inisialisasi awal */
    renderDoctors();
    renderServices();
    selectService(0);
    if (heroTitle) {
        heroTitle.style.transition = 'opacity 0.25s ease';
        heroImg.style.transition = 'opacity 0.25s ease';
        startAutoSlide();
    }

});
