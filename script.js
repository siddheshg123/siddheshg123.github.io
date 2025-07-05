// ===========================
// Smooth Scrolling & Navigation
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===========================
    // Header Scroll Effect
    // ===========================

    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add/remove background opacity based on scroll
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });

    // ===========================
    // Active Navigation Highlighting
    // ===========================

    const sections = document.querySelectorAll('.section');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to current section's nav link
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ===========================
    // Intersection Observer for Animations
    // ===========================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Animate skill bars when they come into view
                if (entry.target.classList.contains('skill-item')) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    if (progressBar) {
                        const width = progressBar.style.width;
                        progressBar.style.width = '0%';
                        setTimeout(() => {
                            progressBar.style.width = width;
                        }, 200);
                    }
                }

                // Animate stats when they come into view
                if (entry.target.classList.contains('stat')) {
                    const statNumber = entry.target.querySelector('.stat-number');
                    if (statNumber) {
                        animateCounter(statNumber);
                    }
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.timeline-item, .education-card, .project-card, .skill-item, .stat'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===========================
    // Counter Animation
    // ===========================

    function animateCounter(element) {
        const target = element.textContent;
        const isDecimal = target.includes('.');
        const finalValue = parseFloat(target);

        if (isNaN(finalValue)) return;

        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = finalValue / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;

            if (current >= finalValue) {
                current = finalValue;
                clearInterval(timer);
            }

            if (isDecimal) {
                element.textContent = current.toFixed(2);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, duration / steps);
    }

    // ===========================
    // Mobile Menu Toggle
    // ===========================

    const navBrand = document.querySelector('.nav-brand');
    const navLinksContainer = document.querySelector('.nav-links');

    // Create mobile menu toggle button
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.innerHTML = '☰';
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #1a202c;
        cursor: pointer;
        padding: 0.5rem;
    `;

    navBrand.appendChild(mobileMenuToggle);

    // Mobile menu functionality
    function handleMobileMenu() {
        if (window.innerWidth <= 768) {
            mobileMenuToggle.style.display = 'block';
            navLinksContainer.style.display = 'none';

            mobileMenuToggle.addEventListener('click', function() {
                if (navLinksContainer.style.display === 'none') {
                    navLinksContainer.style.display = 'flex';
                    navLinksContainer.style.flexDirection = 'column';
                    navLinksContainer.style.position = 'absolute';
                    navLinksContainer.style.top = '100%';
                    navLinksContainer.style.left = '0';
                    navLinksContainer.style.right = '0';
                    navLinksContainer.style.background = 'rgba(255, 255, 255, 0.98)';
                    navLinksContainer.style.padding = '1rem';
                    navLinksContainer.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    mobileMenuToggle.innerHTML = '✕';
                } else {
                    navLinksContainer.style.display = 'none';
                    mobileMenuToggle.innerHTML = '☰';
                }
            });

            // Close mobile menu when clicking on a link
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navLinksContainer.style.display = 'none';
                    mobileMenuToggle.innerHTML = '☰';
                });
            });
        } else {
            mobileMenuToggle.style.display = 'none';
            navLinksContainer.style.display = 'flex';
            navLinksContainer.style.position = 'static';
            navLinksContainer.style.flexDirection = 'row';
            navLinksContainer.style.background = 'none';
            navLinksContainer.style.padding = '0';
            navLinksContainer.style.boxShadow = 'none';
        }
    }

    handleMobileMenu();
    window.addEventListener('resize', handleMobileMenu);

    // ===========================
    // Typing Animation for Hero Title
    // ===========================

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';

        let index = 0;
        function typeWriter() {
            if (index < originalText.length) {
                heroTitle.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }

        // Start typing animation after a short delay
        setTimeout(typeWriter, 1000);
    }

    // ===========================
    // Parallax Effect for Hero Section
    // ===========================

    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;

        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // ===========================
    // Contact Form Enhancement (if added later)
    // ===========================

    const contactItems = document.querySelectorAll('.contact-item');

    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const link = this.querySelector('a');
            if (link && link.href) {
                window.open(link.href, link.target || '_self');
            }
        });
    });

    // ===========================
    // Performance Optimization
    // ===========================

    // Debounce scroll events
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Apply debouncing to scroll events
    window.addEventListener('scroll', debounce(updateActiveNav));

    // ===========================
    // Theme Toggle (Optional Enhancement)
    // ===========================

    function createThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '🌙';
        themeToggle.className = 'theme-toggle';
        themeToggle.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #3182ce;
            color: white;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            z-index: 1000;
        `;

        document.body.appendChild(themeToggle);

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            this.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        });
    }

    // Uncomment to enable theme toggle
    // createThemeToggle();

    console.log('Portfolio JavaScript loaded successfully! 🚀');
});

// ===========================
// Error Handling
// ===========================

window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// ===========================
// Performance Monitoring
// ===========================

window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});
