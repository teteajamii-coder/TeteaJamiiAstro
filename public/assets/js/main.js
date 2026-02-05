// ========================================
// TETEA JAMII - SHARED JAVASCRIPT
// ========================================

// ========================================
// LANGUAGE TOGGLE FUNCTIONALITY
// ========================================
const lang = {
    current: 'en',

    init() {
        // Load saved language preference
        const saved = localStorage.getItem('tetea_language');
        if (saved) {
            this.current = saved;
            this.apply();
        }

        // Set up toggle button
        const toggleBtn = document.getElementById('lang-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggle());
        }
    },

    toggle() {
        this.current = this.current === 'en' ? 'sw' : 'en';
        this.apply();
        localStorage.setItem('tetea_language', this.current);
    },

    apply() {
        document.documentElement.lang = this.current;

        // Toggle visibility of language-specific elements
        document.querySelectorAll('.lang-en').forEach(el => {
            el.classList.toggle('hidden', this.current === 'sw');
        });
        document.querySelectorAll('.lang-sw').forEach(el => {
            el.classList.toggle('hidden', this.current === 'en');
        });
    }
};

// ========================================
// MOBILE NAVIGATION
// ========================================
const navigation = {
    init() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (toggle && navLinks) {
            toggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                this.animateToggle(toggle);
            });

            // Close menu when clicking a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    this.animateToggle(toggle, false);
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('active');
                    this.animateToggle(toggle, false);
                }
            });
        }

        // Highlight active page in navigation
        this.setActivePage();
    },

    animateToggle(toggle, open = null) {
        const spans = toggle.querySelectorAll('span');
        const isOpen = open !== null ? open : toggle.parentElement.querySelector('.nav-links').classList.contains('active');

        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    },

    setActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-links a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
};

// ========================================
// SMOOTH SCROLLING
// ========================================
const smoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const offset = 80; // Account for sticky header
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

// ========================================
// FORM VALIDATION & SUBMISSION
// ========================================
const forms = {
    init() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e, form));
        });
    },

    handleSubmit(e, form) {
        e.preventDefault();

        // Basic validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                this.showError(field, 'This field is required');
            } else {
                field.classList.remove('error');
                this.removeError(field);
            }
        });

        if (isValid) {
            // Show success message (replace with actual form submission)
            this.showSuccess(form);
        }
    },

    showError(field, message) {
        let errorDiv = field.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('error-message')) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = 'var(--urgent-orange)';
            errorDiv.style.fontSize = '0.875rem';
            errorDiv.style.marginTop = '0.25rem';
            field.parentNode.insertBefore(errorDiv, field.nextSibling);
        }
        errorDiv.textContent = message;
    },

    removeError(field) {
        const errorDiv = field.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.remove();
        }
    },

    showSuccess(form) {
        const currentLang = document.documentElement.lang;
        const message = currentLang === 'sw'
            ? 'Asante! Tutawasiliana nawe ndani ya masaa 24. Kwa msaada wa haraka, piga simu +254 700 000 000'
            : 'Thank you! We will contact you within 24 hours. For immediate assistance, call +254 700 000 000';

        alert(message);
        form.reset();
    }
};

// ========================================
// SCROLL ANIMATIONS & COUNTERS (Optimized)
// ========================================
const scrollEffects = {
    init() {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('stat-number')) {
                        if (!entry.target.classList.contains('counted')) {
                            this.animateCounter(entry.target);
                            entry.target.classList.add('counted');
                        }
                    } else {
                        entry.target.classList.add('is-visible', 'animate-fadeInUp');
                    }
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Combined observation for cards, grid items, and counters
        document.querySelectorAll('.card, .grid > *, .hero-content > *, .stat-number, .animate-on-scroll').forEach(el => {
            animationObserver.observe(el);
        });
    },

    animateCounter(element) {
        const rawTarget = element.getAttribute('data-count') || element.getAttribute('data-target');
        if (!rawTarget) return;

        const target = parseInt(rawTarget.replace(/,/g, '').replace('+', '').replace('%', ''));
        const suffix = rawTarget.includes('%') ? '%' : (rawTarget.includes('+') ? '+' : '');

        const duration = 2000;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeProgress * target);

            element.textContent = current.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = rawTarget;
            }
        };

        requestAnimationFrame(updateCounter);
    }
};



// ========================================
// QUICK EXIT FUNCTIONALITY
// ========================================
const quickExit = {
    init() {
        const exitBtn = document.getElementById('quick-exit');
        if (exitBtn) {
            exitBtn.addEventListener('click', () => {
                // Replace current page in history and redirect
                window.location.replace('https://www.google.com/search?q=weather');
            });

            // Also support keyboard shortcut (Escape key pressed 3 times)
            let escapeCount = 0;
            let escapeTimer = null;

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    escapeCount++;

                    if (escapeTimer) clearTimeout(escapeTimer);

                    if (escapeCount >= 3) {
                        window.location.replace('https://www.google.com/search?q=weather');
                    }

                    escapeTimer = setTimeout(() => {
                        escapeCount = 0;
                    }, 1000);
                }
            });
        }
    }
};

// ========================================
// MODAL/DIALOG MANAGEMENT
// ========================================
const modals = {
    init() {
        // Close modal when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.close(modal);
                }
            });
        });

        // Close modal with close button
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                this.close(modal);
            });
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.active');
                if (openModal) this.close(openModal);
            }
        });
    },

    open(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },

    close(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// ========================================
// LAZY LOADING IMAGES
// ========================================
const lazyLoad = {
    init() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
};

// ========================================
// STICKY HEADER HANDLER
// ========================================
const stickyHeader = {
    init() {
        const emergencyBar = document.querySelector('.emergency-bar');
        const mainNav = document.querySelector('.main-nav');

        if (emergencyBar && mainNav) {
            let lastScroll = 0;

            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;

                // Hide/show based on scroll direction
                if (currentScroll > lastScroll && currentScroll > 100) {
                    mainNav.style.transform = 'translateY(-100%)';
                } else {
                    mainNav.style.transform = 'translateY(0)';
                }

                lastScroll = currentScroll;
            });
        }
    }
};

// ========================================
// INITIALIZE ALL FEATURES
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    lang.init();
    navigation.init();
    smoothScroll.init();
    forms.init();
    scrollEffects.init();
    quickExit.init();
    modals.init();
    lazyLoad.init();
    stickyHeader.init();

    console.log('Tetea Jamii website loaded successfully');
});

// Export for use in other scripts
window.TeteaJamii = {
    lang,
    navigation,
    forms,
    modals
};