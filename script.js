/* =========================================================
   1. SMOOTH SCROLL
========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        closeMobileMenu();
    });
});

/* =========================================================
   2. HEADER — shadow + active nav on scroll
========================================================= */
const header   = document.getElementById('header');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow-lg', window.scrollY > 10);

    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 90) current = s.id;
    });
    navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === '#' + current;
        link.classList.toggle('nav-active', isActive);
        link.classList.toggle('text-gray-500', !isActive);
    });
}, { passive: true });

/* =========================================================
   3. MOBILE HAMBURGER MENU
========================================================= */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const hb1 = document.getElementById('hb1');
const hb2 = document.getElementById('hb2');
const hb3 = document.getElementById('hb3');
let menuOpen = false;

function closeMobileMenu() {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    hb1.style.transform = '';
    hb2.style.opacity   = '1';
    hb3.style.transform = '';
}

hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    if (menuOpen) {
        hb1.style.transform = 'translateY(8px) rotate(45deg)';
        hb2.style.opacity   = '0';
        hb3.style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
        closeMobileMenu();
    }
});

document.querySelectorAll('.mobile-nav').forEach(l => l.addEventListener('click', closeMobileMenu));

/* =========================================================
   4. HERO DOTS — auto-cycle carousel (3 s)
========================================================= */
const dots      = document.querySelectorAll('#hero-dots .dot');
const heroTitle = document.getElementById('hero-title');
let activeDot   = 0;

const slides = [
    'Lorem Ipsum<br>sit dolor amet',
    'Kulit Sehat<br>Bersinar Alami',
    'Cantik Percaya<br>Diri Setiap Hari',
];

function setDot(idx) {
    dots.forEach((d, i) => {
        if (i === idx) {
            d.classList.add('dot-pill');
            d.style.background = '#0d5c4e';
        } else {
            d.classList.remove('dot-pill');
            d.style.width      = '';
            d.style.background = '';
            d.style.borderRadius = '';
        }
    });
    // Animate title
    heroTitle.style.opacity   = '0';
    heroTitle.style.transform = 'translateY(10px)';
    setTimeout(() => {
        heroTitle.innerHTML       = slides[idx];
        heroTitle.style.opacity   = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 260);
    activeDot = idx;
}

dots.forEach((d, i) => {
    d.addEventListener('click', () => {
        clearInterval(dotTimer);
        setDot(i);
        dotTimer = setInterval(() => setDot((activeDot + 1) % dots.length), 3000);
    });
});

let dotTimer = setInterval(() => setDot((activeDot + 1) % dots.length), 3000);

/* =========================================================
   5. SERVICE SIDEBAR TAB SWITCHING
========================================================= */
const svcBtns  = document.querySelectorAll('.service-btn');
const svcPanel = document.getElementById('service-panel');
const svcDesc  = document.getElementById('service-desc');

const serviceData = {
    '1': 'Facial Treatment memberikan perawatan mendalam untuk membersihkan, melembapkan, dan meremajakan kulit wajah Anda. Dilakukan oleh tenaga ahli bersertifikat dengan teknologi terkini untuk hasil optimal.',
    '2': 'Skin Brightening treatment dirancang untuk mencerahkan kulit, meratakan warna kulit, dan memberikan kilau alami. Formula eksklusif kami bekerja dari dalam untuk kulit bercahaya.',
    '3': 'Anti-Aging therapy kami menggunakan teknologi mutakhir untuk mereduksi tanda-tanda penuaan, mengencangkan kulit, dan memperhalus kerutan demi tampilan yang lebih muda dan segar.',
    '4': 'Laser Therapy presisi tinggi kami efektif mengatasi berbagai masalah kulit termasuk pigmentasi, bekas jerawat, dan pengencangan kulit dengan hasil yang terlihat hanya dalam beberapa sesi.',
};

svcBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        svcBtns.forEach(b => b.classList.remove('svc-active'));
        btn.classList.add('svc-active');

        svcPanel.style.opacity = '0';
        setTimeout(() => {
            svcDesc.textContent    = serviceData[btn.dataset.svc] || '';
            svcPanel.style.opacity = '1';
        }, 350);
    });
});

/* =========================================================
   6. SCROLL-REVEAL — IntersectionObserver
========================================================= */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => {
    // Hero elements fire immediately (already in viewport)
    if (el.closest('#hero')) {
        el.classList.add('visible');
    } else {
        revealObserver.observe(el);
    }
});

/* =========================================================
   7. RIPPLE EFFECT on buttons
========================================================= */
function addRipple(btn) {
    if (!btn) return;
    btn.style.position = 'relative';
    btn.style.overflow  = 'hidden';
    btn.addEventListener('click', function(e) {
        const rect   = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position:absolute; border-radius:50%;
            background:rgba(255,255,255,0.35);
            width:10px; height:10px;
            left:${e.clientX - rect.left - 5}px;
            top:${e.clientY - rect.top - 5}px;
            transform:scale(0); pointer-events:none;
            animation: rippleAnim 0.55s ease-out forwards;
        `;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
}

['btn-daftar', 'btn-daftar-cta', 'btn-masuk'].forEach(id => addRipple(document.getElementById(id)));

/* =========================================================
   8. DOCTOR CARDS — z-index lift on hover
========================================================= */
document.querySelectorAll('.doctor-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.zIndex = '10');
    card.addEventListener('mouseleave', () => card.style.zIndex = '');
});

/* =========================================================
   9. WIKIPEDIA EDUCATIONAL FETCH
========================================================= */
const topics = [
    "Chemical_peel",
    "Microneedling",
    "Hyaluronic_acid",
    "Retinol",
    "Sunscreen",
    "Acne",
    "Hyperpigmentation",
    "Laser_hair_removal",
    "Botulinum_toxin",
    "Dermal_filler",
];

const wikiImgWrap      = document.getElementById('wiki-img-wrap');
const wikiImgSkeleton  = document.getElementById('wiki-img-skeleton');
const wikiImg          = document.getElementById('wiki-img');
const wikiImgFallback  = document.getElementById('wiki-img-fallback');
const wikiTextSkeleton = document.getElementById('wiki-text-skeleton');
const wikiContent      = document.getElementById('wiki-content');
const wikiError        = document.getElementById('wiki-error');
const wikiTitle        = document.getElementById('wiki-title');
const wikiSummary      = document.getElementById('wiki-summary');
const wikiLink         = document.getElementById('wiki-link');
const wikiBadge        = document.getElementById('wiki-topic-badge');
const wikiRefresh      = document.getElementById('wiki-refresh');
const wikiRetry        = document.getElementById('wiki-retry');
const wikiRefreshIcon  = document.getElementById('wiki-refresh-icon');

let lastTopicIdx = -1;

function pickRandomTopic() {
    let idx;
    do { idx = Math.floor(Math.random() * topics.length); }
    while (idx === lastTopicIdx && topics.length > 1);
    lastTopicIdx = idx;
    return topics[idx];
}

function setWikiLoading() {
    wikiContent.classList.add('hidden');
    wikiError.classList.add('hidden');
    wikiTextSkeleton.classList.remove('hidden');
    // Reset image pane
    wikiImg.classList.add('hidden');
    wikiImgFallback.classList.add('hidden');
    wikiImgSkeleton.classList.remove('hidden');
    // Spin refresh icon
    wikiRefreshIcon.style.transition = 'transform 0.6s ease';
    wikiRefreshIcon.style.transform  = 'rotate(360deg)';
}

function setWikiError() {
    wikiTextSkeleton.classList.add('hidden');
    wikiContent.classList.add('hidden');
    wikiError.classList.remove('hidden');
    wikiImgSkeleton.classList.add('hidden');
    wikiImgFallback.classList.remove('hidden');
}

async function fetchWikiTopic() {
    setWikiLoading();
    const topic = pickRandomTopic();
    const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`;

    try {
        const res = await fetch(apiUrl, { headers: { 'Accept': 'application/json' } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // Populate text
        wikiTitle.textContent   = data.title || topic.replace(/_/g, ' ');
        wikiSummary.textContent = data.extract || 'No description available.';
        wikiBadge.textContent   = topic.replace(/_/g, ' ');
        wikiLink.href = data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${topic}`;

        // Populate image
        if (data.thumbnail?.source) {
            wikiImg.src = data.thumbnail.source;
            wikiImg.alt = data.title;
            wikiImg.onload = () => {
                wikiImgSkeleton.classList.add('hidden');
                wikiImg.classList.remove('hidden');
            };
            wikiImg.onerror = () => {
                wikiImgSkeleton.classList.add('hidden');
                wikiImgFallback.classList.remove('hidden');
            };
        } else {
            wikiImgSkeleton.classList.add('hidden');
            wikiImgFallback.classList.remove('hidden');
        }

        // Show content
        wikiTextSkeleton.classList.add('hidden');
        wikiContent.classList.remove('hidden');

    } catch (err) {
        console.error('Wikipedia fetch error:', err);
        setWikiError();
    } finally {
        // Reset refresh icon
        setTimeout(() => {
            wikiRefreshIcon.style.transform = '';
        }, 600);
    }
}

// Initial load
fetchWikiTopic();

// Refresh button
wikiRefresh.addEventListener('click', fetchWikiTopic);

// Retry button
wikiRetry.addEventListener('click', fetchWikiTopic);

// Add shimmer keyframe dynamically
const shimmerStyle = document.createElement('style');
shimmerStyle.textContent = `
    @keyframes shimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }
`;
document.head.appendChild(shimmerStyle);
