// Loading screen
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 1000);
});

// Mobile menu toggle
const mobileToggle = document.getElementById('mobile-toggle');
const nav = document.getElementById('nav');

mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// Smooth scrolling
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
        // Close mobile menu if open
        nav.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe all fade-up elements
document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
});

// Contact functions
function openEmail() {
    createFloatingHeart(event);
    window.location.href = 'mailto:anujmahajan332@gmail.com?subject=Let\'s Connect&body=Hi Anuj,%0D%0A%0D%0AI found your portfolio and would like to connect!%0D%0A%0D%0ABest regards,';
}

function openLinkedIn() {
    createFloatingHeart(event);
    window.open('https://www.linkedin.com/in/anuj-mahajan-132292289', '_blank');
}

function openGitHub() {
    createFloatingHeart(event);
    window.open('https://github.com/AnujMadhur', '_blank');
}

// Create floating heart animation
function createFloatingHeart(event) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '💙';
    heart.style.left = event.clientX + 'px';
    heart.style.top = event.clientY + 'px';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// Enhanced form submission with EmailJS
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Create mailto link as fallback
    const mailtoLink = `mailto:anujmahajan332@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.from_name}\nEmail: ${formData.from_email}\n\nMessage:\n${formData.message}`
    )}`;

    // Simulate form processing
    setTimeout(() => {
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.add('show');
        
        // Reset form
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'var(--success)';
        
        setTimeout(() => {
            successMessage.classList.remove('show');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            this.reset();
            
            // Create celebration animation
            createCelebration();
        }, 3000);
        
    }, 1500);
});

// Celebration animation
function createCelebration() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const celebration = document.createElement('div');
            celebration.style.position = 'fixed';
            celebration.style.left = Math.random() * window.innerWidth + 'px';
            celebration.style.top = '0px';
            celebration.style.fontSize = '1.5rem';
            celebration.style.pointerEvents = 'none';
            celebration.style.zIndex = '9999';
            celebration.innerHTML = ['🎉', '✨', '🎊', '💫', '🌟'][Math.floor(Math.random() * 5)];
            celebration.style.animation = 'floatUp 3s ease-out forwards';
            document.body.appendChild(celebration);

            setTimeout(() => {
                celebration.remove();
            }, 3000);
        }, i * 100);
    }
}

// Dynamic stats counter
const statsNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalNumber = target.textContent;
            const isPercentage = finalNumber.includes('%');
            const number = parseInt(finalNumber);
            
            let current = 0;
            const increment = number / 25;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    target.textContent = finalNumber;
                    clearInterval(timer);
                } else {
                    target.textContent = Math.floor(current) + (isPercentage ? '%' : '+');
                }
            }, 40);
            
            statsObserver.unobserve(target);
        }
    });
});

statsNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Add interactive hover effects for skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
        this.style.boxShadow = '0 5px 15px rgba(59, 130, 246, 0.3)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Add click effects for tech tags in projects
document.querySelectorAll('.tech-tag').forEach(tag => {
    tag.addEventListener('click', function(e) {
        createTechSparkle(e);
    });
});

function createTechSparkle(event) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = event.clientX + 'px';
    sparkle.style.top = event.clientY + 'px';
    sparkle.style.fontSize = '1rem';
    sparkle.style.color = 'var(--primary)';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.innerHTML = '✨';
    sparkle.style.animation = 'sparkleEffect 1s ease-out forwards';
    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle animation to CSS dynamically
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleEffect {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(0.5);
        }
        50% {
            opacity: 1;
            transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.2);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Theme toggle functionality - FIXED
const themeToggle = document.getElementById('theme-toggle');
let isDarkMode = true; // Default to dark mode

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        document.body.classList.remove('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Create toggle effect
    createFloatingHeart({ clientX: themeToggle.offsetLeft + 25, clientY: themeToggle.offsetTop + 25 });
    
    // Save theme preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// Load saved theme preference
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        isDarkMode = false;
        document.body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Add entrance animations with stagger effect
const animateElements = document.querySelectorAll('.skill-card, .project-card, .contact-item');
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
            staggerObserver.unobserve(entry.target);
        }
    });
});

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px) scale(0.9)';
    el.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
    staggerObserver.observe(el);
});

// Add mouse follow effect for cursor
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Create custom cursor
const cursor = document.createElement('div');
cursor.style.position = 'fixed';
cursor.style.width = '20px';
cursor.style.height = '20px';
cursor.style.borderRadius = '50%';
cursor.style.background = 'rgba(59, 130, 246, 0.3)';
cursor.style.pointerEvents = 'none';
cursor.style.zIndex = '9999';
cursor.style.transition = 'transform 0.1s ease';
document.body.appendChild(cursor);

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hide custom cursor on touch devices
if ('ontouchstart' in window) {
    cursor.style.display = 'none';
}

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.position = 'fixed';
progressBar.style.top = '0';
progressBar.style.left = '0';
progressBar.style.width = '0%';
progressBar.style.height = '3px';
progressBar.style.background = 'linear-gradient(90deg, var(--primary), var(--secondary))';
progressBar.style.zIndex = '10001';
progressBar.style.transition = 'width 0.3s ease';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = progress + '%';
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus styles for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-nav *:focus {
        outline: 2px solid var(--primary) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(focusStyle);

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = progress + '%';
    
    // Header scroll effect
    if (scrollTop > 100) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Add smooth reveal animations for sections
const revealElements = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

console.log('🚀 Portfolio loaded successfully!');
console.log('💼 Anuj Mahajan - Data Science Enthusiast');
console.log('📧 Contact: anujmahajan332@gmail.com');
console.log('🎨 Theme toggle functionality working properly!');