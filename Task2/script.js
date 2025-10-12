AOS.init({
    duration: 800,
    offset: 100,
    once: true,
    easing: 'ease-in-out'
});

const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

const filterBtns = document.querySelectorAll('.filter-btn');
const classCards = document.querySelectorAll('.class-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        classCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

const billingToggle = document.getElementById('billingToggle');
const priceAmounts = document.querySelectorAll('.amount');

billingToggle.addEventListener('change', () => {
    priceAmounts.forEach(amount => {
        if (billingToggle.checked) {
            amount.textContent = amount.getAttribute('data-annual');
        } else {
            amount.textContent = amount.getAttribute('data-monthly');
        }
    });
});

let currentSlide = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

function showSlide(n) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (n >= testimonialCards.length) {
        currentSlide = 0;
    }
    if (n < 0) {
        currentSlide = testimonialCards.length - 1;
    }

    testimonialCards[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    currentSlide--;
    showSlide(currentSlide);
});

nextBtn.addEventListener('click', () => {
    currentSlide++;
    showSlide(currentSlide);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

setInterval(() => {
    currentSlide++;
    showSlide(currentSlide);
}, 5000);

const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-btn.prev');
const lightboxNext = document.querySelector('.lightbox-btn.next');

let currentImageIndex = 0;
const galleryImages = Array.from(galleryItems).map(item => item.querySelector('img').src);

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    lightbox.classList.add('active');
    lightboxImg.src = galleryImages[currentImageIndex];
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

lightboxPrev.addEventListener('click', () => {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    lightboxImg.src = galleryImages[currentImageIndex];
});

lightboxNext.addEventListener('click', () => {
    currentImageIndex++;
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    lightboxImg.src = galleryImages[currentImageIndex];
});

document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            lightboxPrev.click();
        } else if (e.key === 'ArrowRight') {
            lightboxNext.click();
        }
    }
});

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btnText = contactForm.querySelector('.btn-text');
    const btnLoading = contactForm.querySelector('.btn-loading');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    submitBtn.disabled = true;

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Thank you for your message! We will get back to you within 24 hours.';
        contactForm.reset();
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    } catch (error) {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Oops! Something went wrong. Please try again or call us directly.';
    } finally {
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
});

const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    alert(`Thank you for subscribing with ${email}! You'll receive our latest updates.`);
    newsletterForm.reset();
});

document.querySelectorAll('.nav-cta, .pricing-card .btn, .mobile-cta-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (!btn.getAttribute('href')) {
            e.preventDefault();
            const pricingSection = document.getElementById('pricing');
            window.scrollTo({
                top: pricingSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});