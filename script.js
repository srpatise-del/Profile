// Typing animation for hero subtitle
const typingText = document.getElementById('typing-text');
const cursor = document.querySelector('.cursor');
const words = [
    'Full-Stack Developer',
    'UI/UX Enthusiast',
    'Problem Solver',
    'Creative Coder'
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    typingText.textContent = currentChar;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeWriter, 100);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeWriter, 50);
    } else {
        isDeleting = !isDeleting;
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeWriter, 1000);
    }
}

// Smooth scrolling for navigation buttons
document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations with Intersection Observer
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Add fade-in class to elements
function addFadeInClasses() {
    // Add fade-in to all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });

    // Add fade-in to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.classList.add('fade-in');
    });

    // Add fade-in to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.classList.add('fade-in');
    });

    // Add fade-in to info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.classList.add('fade-in');
    });

    // Add fade-in to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.classList.add('fade-in');
    });
}

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (name && email && message) {
                // In a real application, you would send this data to a server
                alert('Thank you for your message! I will get back to you soon.');

                // Clear form
                this.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
});

// Enhanced scroll effects
function handleScrollEffects() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    // Parallax effect for background elements
    const heroSection = document.querySelector('.fullscreen-section');
    if (heroSection) {
        heroSection.style.transform = `translateY(${rate * 0.1}px)`;
    }
}

// Mouse movement effects for interactive elements
function handleMouseMove(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    // Subtle movement for decorative elements
    const glowCircles = document.querySelectorAll('.glow-circle, .glow-line');
    glowCircles.forEach(element => {
        const speed = element.classList.contains('glow-circle') ? 20 : 10;
        element.style.transform = `translate(${mouseX * speed - speed/2}px, ${mouseY * speed - speed/2}px)`;
    });
}

// Particle effect for hero section
function createParticles() {
    const heroSection = document.querySelector('.fullscreen-section');
    if (!heroSection) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        heroSection.appendChild(particle);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start typing animation after a short delay
    setTimeout(typeWriter, 1500);

    // Add fade-in classes
    addFadeInClasses();

    // Initialize scroll animations
    animateOnScroll();

    // Create particles
    createParticles();

    // Add scroll effects
    window.addEventListener('scroll', handleScrollEffects);

    // Add mouse movement effects
    window.addEventListener('mousemove', handleMouseMove);

    // Add CSS animations for fade-in elements
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }

        .fade-in.animate {
            opacity: 1;
            transform: translateY(0);
        }

        .particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 212, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: float-particle linear infinite;
            top: 100vh;
            z-index: 1;
        }

        @keyframes float-particle {
            0% {
                transform: translateY(0) rotate(0deg) scale(1);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            90% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg) scale(0.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(handleScrollEffects, 16)); // ~60fps

// ฟอร์มติดต่อ: ส่งข้อมูลจริงผ่าน EmailJS
// ต้องสมัครฟรีที่ https://www.emailjs.com/ และนำ service_id, template_id, user_id มาใส่

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                // ส่งข้อมูลผ่าน EmailJS
                emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                    from_name: name,
                    from_email: email,
                    message: message
                }, 'YOUR_USER_ID')
                .then(function(response) {
                    alert('ส่งข้อความสำเร็จ! ขอบคุณที่ติดต่อมา');
                    contactForm.reset();
                }, function(error) {
                    alert('เกิดข้อผิดพลาดในการส่ง กรุณาลองใหม่อีกครั้ง');
                });
            } else {
                alert('กรุณากรอกข้อมูลให้ครบถ้วน');
            }
        });
    }
});

// โหลด EmailJS SDK
(function(){
    if (!window.emailjs) {
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
        script.onload = function() { emailjs.init('YOUR_USER_ID'); };
        document.body.appendChild(script);
    }
})();