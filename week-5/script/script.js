/**
 * WEEK 5: SCRIPT/SCRIPT.JS
 * Client-side Controller untuk Slider & Tab di PHP Project
 * Struktur: page/, script/, style/
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Slider Auto-Cycle & Dots Control
    const slides = [...document.querySelectorAll('.server-slide')];
    const slideButtons = [...document.querySelectorAll('.hero-dot')];
    let activeSlide = 0;
    let slideTimer;

    function showSlide(index) {
        if (!slides.length) return;
        activeSlide = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === activeSlide;
            slide.classList.toggle('is-active', isActive);
            slide.setAttribute('aria-hidden', String(!isActive));
            if (slideButtons[slideIndex]) {
                slideButtons[slideIndex].classList.toggle('is-active', isActive);
                slideButtons[slideIndex].setAttribute('aria-pressed', String(isActive));
            }
        });
    }

    function startSlideTimer() {
        clearInterval(slideTimer);
        slideTimer = setInterval(() => showSlide(activeSlide + 1), 4500);
    }

    slideButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            showSlide(index);
            startSlideTimer();
        });
    });

    if (slides.length > 1) startSlideTimer();

    // 2. Tab Service Selection Control
    const serviceTitle = document.getElementById('service-title');
    const serviceDescription = document.getElementById('service-desc');
    const serviceContentImg = document.getElementById('service-content-img');

    document.querySelectorAll('.service-btn:not(:disabled)').forEach((button) => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.service-btn').forEach((item) => item.classList.remove('active'));
            button.classList.add('active');
            if (serviceTitle) {
                serviceTitle.textContent = button.querySelector('span').textContent.replace(/^\d+\.\s*/, '');
            }
            if (serviceDescription) {
                serviceDescription.textContent = button.dataset.description;
            }
            if (button.dataset.image && serviceContentImg) {
                serviceContentImg.src = button.dataset.image;
            }
        });
    });

});
