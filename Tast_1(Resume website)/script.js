if (typeof emailjs !== 'undefined') {
    emailjs.init('YOUR_PUBLIC_KEY');
}

const typingTexts = [
    'Web Developer',
    'Designer',
    'React Learner',
    'Frontend Developer'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeEffect() {
    const typingElement = document.querySelector('.typing-text');
    const currentText = typingTexts[textIndex];
    
    if (!isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, pauseTime);
            return;
        }
    } else {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
        }
    }
    
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeEffect, speed);
}

document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
    
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    function setActiveLink() {
        const sections = document.querySelectorAll('section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skill-progress')) {
                    const progress = entry.target.getAttribute('data-progress');
                    entry.target.style.setProperty('--progress', progress + '%');
                    entry.target.classList.add('animate');
                } else if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('fade-in');
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.skill-progress').forEach(skill => {
        observer.observe(skill);
    });
    
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.animation = 'fadeInUp 0.6s ease';
                    }, 100);
                } else {
                    const categories = card.getAttribute('data-category');
                    if (categories && categories.includes(filter)) {
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.style.animation = 'fadeInUp 0.6s ease';
                        }, 100);
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });
    
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        formStatus.className = 'form-status';
        formStatus.textContent = 'Sending message...';
        formStatus.style.display = 'block';
        
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
            to_name: 'Your Name'
        };
        
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(() => {
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
                contactForm.reset();
                
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Message received! (Demo mode - EmailJS not configured)';
                contactForm.reset();
                
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            });
    });
    
    const downloadButtons = document.querySelectorAll('#downloadCV, #downloadCV2');
    
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const resumeContent = `
FRONTEND DEVELOPER - RESUME
====================================

PERSONAL INFORMATION
Name: Your Name
Role: Frontend Developer
Email: your.email@gmail.com
Phone: +92 XXX XXXXXXX
Location: Faisalabad, Pakistan

PROFESSIONAL SUMMARY
Passionate and creative Frontend Developer dedicated to building beautiful, functional, 
and user-friendly web applications. With expertise in modern web technologies, I transform 
ideas into engaging digital experiences.

SKILLS
Frontend: HTML5, CSS3, JavaScript, React, Bootstrap
Backend: Node.js, Express.js, MongoDB, REST APIs
Tools: Git & GitHub, VS Code, Figma, Responsive Design

EDUCATION
Bachelor of Science in Information Technology
Government College University Faisalabad
2020 - 2024

CERTIFICATIONS
- Web Development Certification (2023)
- JavaScript Advanced Concepts (2022)

PROJECTS
1. Portfolio Website - Modern responsive portfolio with dark mode
2. E-Commerce Platform - Full-featured online shopping platform
3. AI Chatbot - Intelligent chatbot with NLP
4. To-Do List Application - Task management with local storage
5. UI/UX Design Portfolio - Modern UI design collection

CONTACT
GitHub: github.com/yourusername
LinkedIn: linkedin.com/in/yourprofile
Email: your.email@gmail.com
            `;
            
            const blob = new Blob([resumeContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Frontend_Developer_Resume.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = 'var(--shadow)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
});
