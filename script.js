// Section Management System
let currentSection = 'home';
let isTransitioning = false;

// Initialize sections on page load
document.addEventListener('DOMContentLoaded', () => {
    // Hide all sections except home
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (section.id !== 'home') {
            section.classList.remove('active');
        } else {
            section.classList.add('active');
        }
    });
    
    // Set initial navigation state
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector('[href="#home"]').classList.add('active');
    
    // Initialize animations and other features
    initializeAnimations();
    initializeSkillBars();
    initializeTypingAnimation();
    createParticles();
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .achievement-card, .nav-link');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Section Navigation System
function showSection(targetSectionId) {
    if (isTransitioning || currentSection === targetSectionId) return;
    
    isTransitioning = true;
    
    const currentSectionElement = document.getElementById(currentSection);
    const targetSectionElement = document.getElementById(targetSectionId);
    
    // Update navigation active states
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const targetNavLink = document.querySelector(`[href="#${targetSectionId}"]`);
    if (targetNavLink) {
        targetNavLink.classList.add('active');
    }
    
    // Start transition
    if (currentSectionElement) {
        currentSectionElement.style.opacity = '0';
        currentSectionElement.style.transform = 'translateY(-30px)';
    }
    
    setTimeout(() => {
        // Hide current section
        if (currentSectionElement) {
            currentSectionElement.classList.remove('active');
        }
        
        // Show target section
        if (targetSectionElement) {
            targetSectionElement.classList.add('active');
            targetSectionElement.style.opacity = '0';
            targetSectionElement.style.transform = 'translateY(30px)';
            
            // Animate in
            setTimeout(() => {
                targetSectionElement.style.opacity = '1';
                targetSectionElement.style.transform = 'translateY(0)';
                
                // Trigger section-specific animations
                triggerSectionAnimations(targetSectionId);
            }, 50);
        }
        
        currentSection = targetSectionId;
        isTransitioning = false;
    }, 300);
    
    // Close mobile menu if open
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// Trigger section-specific animations
function triggerSectionAnimations(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    switch(sectionId) {
        case 'about':
            animateStats();
            animateInfoItems();
            break;
        case 'skills':
            animateSkillBars();
            break;
        case 'projects':
            animateProjectCards();
            break;
        case 'achievements':
            animateAchievements();
            break;
        case 'contact':
            animateContactItems();
            break;
    }
}

// Navigation click handlers
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        showSection(targetId);
    });
});

// Hero button navigation (works for both <a> and <button>)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            // If <a href="#...">
            let targetId = null;
            const href = button.getAttribute('href');
            if (href && href.startsWith('#')) {
                targetId = href.substring(1);
            }

            // If <button data-target="...">
            if (!targetId && button.dataset.target) {
                targetId = button.dataset.target;
            }

            if (targetId) {
                showSection(targetId);
            }
        });
    });
});



// Initialize skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }, index * 200);
    });
}

// Animate stats counters
function animateStats() {
    const stats = document.querySelectorAll('.stat h4');
    stats.forEach(stat => {
        const target = stat.textContent;
        const isNumber = !isNaN(parseFloat(target));
        
        if (isNumber) {
            const finalValue = parseFloat(target);
            let current = 0;
            const increment = finalValue / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= finalValue) {
                    current = finalValue;
                    clearInterval(timer);
                }
                
                if (target.includes('.')) {
                    stat.textContent = current.toFixed(2);
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 30);
        }
    });
}

// Animate info items
function animateInfoItems() {
    const items = document.querySelectorAll('.info-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Animate project cards
function animateProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Animate achievements
function animateAchievements() {
    const achievements = document.querySelectorAll('.achievement-card');
    achievements.forEach((achievement, index) => {
        setTimeout(() => {
            achievement.style.opacity = '1';
            achievement.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Animate contact items
function animateContactItems() {
    const items = document.querySelectorAll('.contact-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Initialize animations
function initializeAnimations() {
    // Reset all animated elements
    const animatedElements = document.querySelectorAll('.info-item, .project-card, .achievement-card, .contact-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
    });
}

// Typing animation
function initializeTypingAnimation() {
    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        
        let index = 0;
        const timer = setInterval(() => {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(timer);
                // Remove typing cursor after animation
                setTimeout(() => {
                    typingElement.classList.remove('typing');
                }, 1000);
            }
        }, 100);
    }
}

// Scroll indicator click
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        showSection('about');
    });
}

// Create particles effect
function createParticles() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    heroSection.appendChild(particlesContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, 0.7)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = '-10px';
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 20000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 1000);
}

// Ripple effect for buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-submit, .btn-view').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Theme toggle functionality
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    
    if (document.body.classList.contains('dark-theme')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.querySelector('i').className = 'fas fa-sun';
}

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    showSection('home');
});

// Show/hide scroll to top button
function toggleScrollToTop() {
    if (currentSection !== 'home') {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
}

// Update scroll to top button visibility when sections change
const observer = new MutationObserver(() => {
    toggleScrollToTop();
});

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section, { attributes: true, attributeFilter: ['class'] });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Project card click handlers
document.querySelectorAll('.btn-view').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectCard = button.closest('.project-card');
        const projectTitle = projectCard.querySelector('h3').textContent;
        alert(`More details about ${projectTitle} will be available soon!`);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (isTransitioning) return;
    
    const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'contact'];
    const currentIndex = sections.indexOf(currentSection);
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % sections.length;
        showSection(sections[nextIndex]);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
        showSection(sections[prevIndex]);
    } else if (e.key === 'Home') {
        e.preventDefault();
        showSection('home');
    }
});

// Smooth scrolling for sections with overflow
document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('wheel', (e) => {
        // Allow natural scrolling within sections
        e.stopPropagation();
    });
});

// Initialize everything when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // DOM is ready
        console.log('Portfolio loaded successfully!');
    });
} else {
    // DOM is already ready
    console.log('Portfolio loaded successfully!');
}