const serviceDetails = {
    1: {
        title: 'Facial Treatment',
        description: 'Perawatan wajah untuk membantu membersihkan pori-pori, mengangkat sel kulit mati, dan menjaga kulit tetap bersih serta terawat. Konsultasikan kebutuhan kulit Anda sebelum memilih perawatan.',
        image: new URL('./pages/hero_woman.jpg', import.meta.url).href,
        imageAlt: 'Pasien beristirahat saat menjalani perawatan wajah',
    },
    2: {
        title: 'Skin Brightening',
        description: 'Perawatan yang ditujukan untuk membantu menyamarkan tampilan kulit kusam dan membuat warna kulit terlihat lebih merata. Jenis perawatan disesuaikan dengan kondisi dan kebutuhan kulit Anda.',
        image: new URL('./pages/treatment.jpg', import.meta.url).href,
        imageAlt: 'Perawatan wajah profesional di klinik yang bersih dan nyaman',
    },
    3: {
        title: 'Anti-Aging',
        description: 'Perawatan kulit untuk membantu menjaga kelembapan, elastisitas, dan tampilan kulit agar terlihat lebih terawat. Pilihan treatment disesuaikan dengan kondisi kulit dan hasil konsultasi.',
        image: new URL('./pages/doctor.jpg', import.meta.url).href,
        imageAlt: 'Dokter klinik siap berkonsultasi mengenai perawatan kulit',
    },
    4: {
        title: 'Laser Therapy',
        description: 'Perawatan berbasis teknologi laser yang dapat digunakan untuk kebutuhan kulit tertentu sesuai jenis perangkat dan indikasinya. Konsultasi terlebih dahulu untuk menentukan prosedur yang sesuai dengan kondisi kulit Anda.',
        image: new URL('./pages/treatment.jpg', import.meta.url).href,
        imageAlt: 'Pasien menjalani prosedur perawatan laser wajah dengan pelindung mata',
    },
};

const wikiTopics = ['Kulit', 'Jerawat', 'Perawatan kulit', 'Tabir surya'];
const heroSlides = [
    'Perawatan terbaik\nuntuk kulit sehat',
    'Kenali kebutuhan\nkulit Anda',
    'Rawat kulit bersama\ndokter tepercaya',
];

function setupHeroSlides() {
    const title = document.querySelector('#hero-title');
    const dots = document.querySelectorAll('#hero-dots [data-index]');
    if (!title || !dots.length) return;

    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const index = Number(dot.dataset.index);
            if (!Number.isInteger(index) || !heroSlides[index]) return;

            title.textContent = heroSlides[index];
            dots.forEach((slideDot, dotIndex) => {
                const isActive = dotIndex === index;
                slideDot.classList.toggle('dot-pill', isActive);
                slideDot.setAttribute('aria-current', String(isActive));
            });
        });
    });
}

function setupMobileMenu() {
    const toggle = document.querySelector('#hamburger');
    const menu = document.querySelector('#mobile-menu');

    if (!toggle || !menu) return;

    const closeMenu = () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
        if (window.matchMedia('(min-width: 768px)').matches) closeMenu();
    });
}

function setupScrollReveal() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    if (!('IntersectionObserver' in window)) {
        elements.forEach((element) => element.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    elements.forEach((element) => observer.observe(element));
}

function setupNavigation() {
    const header = document.querySelector('#header');
    const navLinks = [...document.querySelectorAll('#navbar .nav-link')];
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    const updateHeader = () => {
        header?.classList.toggle('shadow-md', window.scrollY > 8);
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    if (!('IntersectionObserver' in window) || !navLinks.length) return;

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((link) => {
                const isActive = link.hash === `#${entry.target.id}`;
                link.classList.toggle('nav-active', isActive);
                link.classList.toggle('text-gray-500', !isActive);
                link.setAttribute('aria-current', isActive ? 'location' : 'false');
            });
        });
    }, { rootMargin: '-25% 0px -65% 0px' });

    sections.forEach((section) => sectionObserver.observe(section));
}

function setupServiceTabs() {
    const description = document.querySelector('#service-desc');
    const title = document.querySelector('#service-title');
    const image = document.querySelector('#service-img');
    const panel = document.querySelector('#service-panel');
    const buttons = document.querySelectorAll('.service-btn');

    if (!description || !title || !image || !panel || !buttons.length) return;

    let switchTimeout;
    const pressTimeouts = new WeakMap();

    buttons.forEach((button) => {
        button.setAttribute('aria-pressed', String(button.classList.contains('svc-active')));
        button.addEventListener('click', () => {
            const selectedService = button.dataset.svc;
            const nextService = serviceDetails[selectedService];
            if (!nextService) return;

            window.clearTimeout(switchTimeout);
            window.clearTimeout(pressTimeouts.get(button));
            button.classList.remove('is-tapped');
            void button.offsetWidth;
            button.classList.add('is-tapped');
            pressTimeouts.set(button, window.setTimeout(() => {
                button.classList.remove('is-tapped');
            }, 500));

            buttons.forEach((serviceButton) => {
                const isActive = serviceButton === button;
                serviceButton.classList.toggle('svc-active', isActive);
                serviceButton.setAttribute('aria-pressed', String(isActive));
            });

            panel.classList.add('is-switching');
            switchTimeout = window.setTimeout(() => {
                title.textContent = nextService.title;
                description.textContent = nextService.description;
                image.src = nextService.image;
                image.alt = nextService.imageAlt;
                requestAnimationFrame(() => panel.classList.remove('is-switching'));
            }, 150);
        });
    });
}

function setupCallToAction() {
    const serviceSection = document.querySelector('#services');

    ['#btn-masuk', '#btn-daftar', '#btn-daftar-cta'].forEach((selector) => {
        const button = document.querySelector(selector);
        if (!button || !serviceSection) return;

        button.addEventListener('click', () => {
            serviceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function setupWikipediaCard() {
    const elements = {
        image: document.querySelector('#wiki-img'),
        imageFallback: document.querySelector('#wiki-img-fallback'),
        imageSkeleton: document.querySelector('#wiki-img-skeleton'),
        textSkeleton: document.querySelector('#wiki-text-skeleton'),
        content: document.querySelector('#wiki-content'),
        error: document.querySelector('#wiki-error'),
        topic: document.querySelector('#wiki-topic-badge'),
        title: document.querySelector('#wiki-title'),
        summary: document.querySelector('#wiki-summary'),
        link: document.querySelector('#wiki-link'),
        refresh: document.querySelector('#wiki-refresh'),
        retry: document.querySelector('#wiki-retry'),
    };

    if (Object.values(elements).some((element) => !element)) return;

    let lastTopic = '';
    let activeRequest;

    const setLoading = () => {
        elements.textSkeleton.classList.remove('hidden');
        elements.content.classList.add('hidden');
        elements.error.classList.add('hidden');
        elements.imageSkeleton.classList.remove('hidden');
        elements.imageFallback.classList.add('hidden');
        elements.image.classList.add('hidden');
    };

    const loadTopic = async () => {
        activeRequest?.abort();
        activeRequest = new AbortController();
        const request = activeRequest;
        const availableTopics = wikiTopics.filter((topic) => topic !== lastTopic);
        const topic = availableTopics[Math.floor(Math.random() * availableTopics.length)];
        lastTopic = topic;
        setLoading();

        try {
            const response = await fetch(
                `https://id.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`,
                { signal: request.signal },
            );
            if (!response.ok) throw new Error(`Wikipedia mengembalikan status ${response.status}.`);

            const article = await response.json();
            if (!article.title || !article.extract || !article.content_urls?.desktop?.page) {
                throw new Error('Ringkasan Wikipedia tidak memiliki data yang diperlukan.');
            }
            if (request !== activeRequest) return;

            elements.topic.textContent = topic;
            elements.title.textContent = article.title;
            elements.summary.textContent = article.extract;
            elements.link.href = article.content_urls.desktop.page;
            elements.textSkeleton.classList.add('hidden');
            elements.content.classList.remove('hidden');

            const imageUrl = article.thumbnail?.source;
            if (imageUrl) {
                elements.image.onload = () => {
                    if (request === activeRequest) {
                        elements.imageSkeleton.classList.add('hidden');
                        elements.image.classList.remove('hidden');
                    }
                };
                elements.image.onerror = () => {
                    if (request === activeRequest) {
                        elements.imageSkeleton.classList.add('hidden');
                        elements.imageFallback.classList.remove('hidden');
                    }
                };
                elements.image.src = imageUrl;
                elements.image.alt = `Ilustrasi: ${article.title}`;
            } else {
                elements.imageSkeleton.classList.add('hidden');
                elements.imageFallback.classList.remove('hidden');
            }
        } catch (error) {
            if (error.name === 'AbortError' || request !== activeRequest) return;
            elements.textSkeleton.classList.add('hidden');
            elements.imageSkeleton.classList.add('hidden');
            elements.error.classList.remove('hidden');
            console.error('Gagal memuat ringkasan Wikipedia:', error);
        }
    };

    elements.refresh.addEventListener('click', loadTopic);
    elements.retry.addEventListener('click', loadTopic);
    loadTopic();
}

document.addEventListener('DOMContentLoaded', () => {
    setupHeroSlides();
    setupMobileMenu();
    setupScrollReveal();
    setupNavigation();
    setupServiceTabs();
    setupCallToAction();
    setupWikipediaCard();
});
