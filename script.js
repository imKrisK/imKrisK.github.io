// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const contactForm = document.getElementById('contact-form');
const projectsGrid = document.getElementById('projects-grid');

// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.theme);
        themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.theme = theme;
        
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        // Mobile menu toggle
        hamburger.addEventListener('click', () => this.toggleMobileMenu());
        
        // Close mobile menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => this.handleScroll());

        // Active link highlighting
        this.highlightActiveSection();
        window.addEventListener('scroll', () => this.highlightActiveSection());
    }

    toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
    }

    observeElements() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, options);

        // Add scroll-animate class to elements that should animate
        const animateElements = document.querySelectorAll(`
            .section-title,
            .section-subtitle,
            .about-content,
            .skill-category,
            .project-card,
            .contact-item,
            .contact-form
        `);

        animateElements.forEach(el => {
            el.classList.add('scroll-animate');
            observer.observe(el);
        });
    }
}

// Projects Manager
class ProjectsManager {
    constructor() {
        this.githubUsername = 'imKrisK';
        // Project categories and mapping for better organization
        this.projectCategories = {
            'Web Applications & UI/UX': ['From-Concept-to-Completion', 'book-writing-platform', 'slider', 'TYPINGTESTPROJECT'],
            'Backend and API Development': ['mobilerestaurantAPI'],
            'Business & E-commerce': ['m7-localfoodtruck'],
            'Desktop & System Applications': ['FlouriteOS', 'playrec'],
            'Interactive Tools': ['whatnotwheel', 'KK0100']
        };
        this.init();
    }

    async init() {
        await this.loadProjects();
    }

    async loadProjects() {
        try {
            const response = await fetch(`https://api.github.com/users/${this.githubUsername}/repos?sort=updated&per_page=20`);
            const repos = await response.json();
            
            // Featured project names in order of importance (updated with latest projects)
            const featuredProjectNames = [
                'From-Concept-to-Completion',
                'book-writing-platform',
                'playrec',
                'FlouriteOS',
                'mobilerestaurantAPI',
                'm7-localfoodtruck',
                'slider',
                'TYPINGTESTPROJECT'
            ];
            
            // First, get the featured projects in the specified order
            const featuredProjects = featuredProjectNames
                .map(name => repos.find(repo => repo.name === name))
                .filter(repo => repo && !repo.fork)
                .slice(0, 6);
            
            // If we don't have enough featured projects, fill with other repos
            if (featuredProjects.length < 6) {
                const otherRepos = repos
                    .filter(repo => !repo.fork && 
                           !featuredProjectNames.includes(repo.name) && 
                           repo.description)
                    .slice(0, 6 - featuredProjects.length);
                featuredProjects.push(...otherRepos);
            }
            
            this.renderProjects(featuredProjects.slice(0, 6));
        } catch (error) {
            console.error('Error loading projects:', error);
            this.renderFallbackProjects();
        }
    }

    renderProjects(projects) {
        projectsGrid.innerHTML = projects.map(project => this.createProjectCard(project)).join('');
    }

    createProjectCard(project) {
        const languages = this.getProjectLanguages(project);
        const demoUrl = project.homepage || `https://github.com/${this.githubUsername}/${project.name}`;
        
        return `
            <div class="project-card fade-in-up">
                <div class="project-image">
                    <img src="https://opengraph.githubassets.com/1/${this.githubUsername}/${project.name}" 
                         alt="${project.name}" 
                         onerror="this.src='https://via.placeholder.com/400x200?text=${encodeURIComponent(project.name)}'">
                    <div class="project-overlay">
                        <a href="${demoUrl}" class="project-link" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                        <a href="${project.html_url}" class="project-github" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                </div>
                <div class="project-content">
                    <h3>${project.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
                    <p>${project.description || 'A project showcasing modern web development practices.'}</p>
                    <div class="project-tech">
                        ${languages.map(lang => `<span class="tech-tag">${lang}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    getProjectLanguages(project) {
        const repoName = project.name.toLowerCase();
        const description = (project.description || '').toLowerCase();
        
        // Enhanced technology detection for specific projects
        const projectTechMap = {
            'from-concept-to-completion': ['TypeScript', 'React', 'Next.js'],
            'book-writing-platform': ['TypeScript', 'Next.js', 'Tailwind CSS'],
            'playrec': ['Makefile', 'System Tools', 'Game Capture'],
            'flouriteos': ['Python', 'Tkinter', 'Desktop App'],
            'mobilerestaurantapi': ['Node.js', 'Express.js', 'JWT'],
            'm7-localfoodtruck': ['JavaScript', 'Stripe API', 'Vercel'],
            'slider': ['JavaScript', 'CSS3', 'HTML5'],
            'typingtestproject': ['HTML5', 'CSS3', 'JavaScript'],
            'whatnotwheel': ['JavaScript', 'Web App', 'Interactive'],
            'kk0100': ['JavaScript', 'Web Development', 'Frontend']
        };
        
        // Check if we have specific tech stack for this project
        if (projectTechMap[repoName]) {
            return projectTechMap[repoName];
        }
        
        const detectedLanguages = [];
        
        if (project.language) {
            detectedLanguages.push(project.language);
        }
        
        // Detect common frameworks/libraries from name and description
        if (repoName.includes('react') || description.includes('react')) {
            detectedLanguages.push('React');
        }
        if (repoName.includes('vue') || description.includes('vue')) {
            detectedLanguages.push('Vue.js');
        }
        if (repoName.includes('node') || description.includes('node')) {
            detectedLanguages.push('Node.js');
        }
        if (repoName.includes('typescript') || description.includes('typescript')) {
            detectedLanguages.push('TypeScript');
        }
        if (repoName.includes('next') || description.includes('next')) {
            detectedLanguages.push('Next.js');
        }
        if (repoName.includes('api') || description.includes('api')) {
            detectedLanguages.push('REST API');
        }
        
        // Remove duplicates and limit to 3 tags
        return [...new Set(detectedLanguages)].slice(0, 3);
    }

    renderFallbackProjects() {
        const fallbackProjects = [
            {
                name: 'From Concept to Completion',
                description: 'Modern, interactive web application with focus on responsive design, accessibility, and advanced user experience. Built with TypeScript and modern development practices.',
                languages: ['TypeScript', 'React', 'Next.js'],
                demoUrl: 'https://github.com/imKrisK/From-Concept-to-Completion',
                githubUrl: 'https://github.com/imKrisK/From-Concept-to-Completion'
            },
            {
                name: 'Book Writing Platform',
                description: 'Collaborative writing platform built with Next.js 15, TypeScript, and Tailwind CSS. Features distraction-free writing environment and modern UI components.',
                languages: ['TypeScript', 'Next.js', 'Tailwind CSS'],
                demoUrl: 'https://github.com/imKrisK/book-writing-platform',
                githubUrl: 'https://github.com/imKrisK/book-writing-platform'
            },
            {
                name: 'PlayRec',
                description: 'Practical tool for content creators, developers, and professionals who need reliable game capture capabilities. System-level development with Makefile configuration.',
                languages: ['Makefile', 'System Tools', 'Game Capture'],
                demoUrl: 'https://github.com/imKrisK/playrec',
                githubUrl: 'https://github.com/imKrisK/playrec'
            },
            {
                name: 'FlouriteOS',
                description: 'Cross-platform desktop application developed with Python and Tkinter. Features modern desktop UI design and comprehensive technical documentation.',
                languages: ['Python', 'Tkinter', 'Desktop App'],
                demoUrl: 'https://github.com/imKrisK/FlouriteOS',
                githubUrl: 'https://github.com/imKrisK/FlouriteOS'
            },
            {
                name: 'Mobile Restaurant API',
                description: 'Secure, scalable REST API for restaurant applications. Features JWT authentication, bcrypt security, and comprehensive API testing with Postman.',
                languages: ['Node.js', 'Express.js', 'JavaScript'],
                demoUrl: 'https://github.com/imKrisK/mobilerestaurantAPI',
                githubUrl: 'https://github.com/imKrisK/mobilerestaurantAPI'
            },
            {
                name: 'Local Food Truck Platform',
                description: 'Business-focused web solution with integrated Stripe payment processing, automated testing, and CI/CD deployment pipelines on Vercel.',
                languages: ['JavaScript', 'Stripe API', 'Testing Library'],
                demoUrl: 'https://github.com/imKrisK/m7-localfoodtruck',
                githubUrl: 'https://github.com/imKrisK/m7-localfoodtruck'
            },
            {
                name: 'Interactive Slider Component',
                description: 'Responsive, interactive slider component with smooth animations and touch support. Demonstrates advanced CSS and JavaScript techniques.',
                languages: ['JavaScript', 'CSS3', 'HTML5'],
                demoUrl: 'https://github.com/imKrisK/slider',
                githubUrl: 'https://github.com/imKrisK/slider'
            },
            {
                name: 'Typing Test Project',
                description: 'Interactive typing test application built with pure HTML, CSS, and JavaScript. Features real-time WPM calculation and accuracy tracking.',
                languages: ['HTML5', 'CSS3', 'JavaScript'],
                demoUrl: 'https://github.com/imKrisK/TYPINGTESTPROJECT',
                githubUrl: 'https://github.com/imKrisK/TYPINGTESTPROJECT'
            }
        ];

        projectsGrid.innerHTML = fallbackProjects.map(project => `
            <div class="project-card fade-in-up">
                <div class="project-image">
                    <img src="https://via.placeholder.com/400x200?text=${encodeURIComponent(project.name)}" alt="${project.name}">
                    <div class="project-overlay">
                        <a href="${project.demoUrl}" class="project-link" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                        <a href="${project.githubUrl}" class="project-github" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                </div>
                <div class="project-content">
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${project.languages.map(lang => `<span class="tech-tag">${lang}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Contact Form Handler
class ContactFormHandler {
    constructor() {
        this.init();
    }

    init() {
        contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            // Simulate form submission (replace with actual endpoint)
            await this.simulateFormSubmission(data);
            
            // Show success message
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Failed to send message. Please try again or contact me directly.', 'error');
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    async simulateFormSubmission(data) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In a real implementation, you would send the data to your backend
        console.log('Form data:', data);
        
        // For now, we'll just log it and simulate success
        return { success: true };
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add styles for notification
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 10000;
                background: var(--background-color);
                border: 1px solid var(--border-color);
                border-radius: 0.5rem;
                box-shadow: var(--shadow-large);
                max-width: 400px;
                animation: slideInRight 0.3s ease;
            }
            .notification-success {
                border-left: 4px solid #10b981;
            }
            .notification-error {
                border-left: 4px solid #ef4444;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 1rem;
            }
            .notification-content i:first-child {
                color: var(--primary-color);
            }
            .notification-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                margin-left: auto;
            }
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// Typing Animation for Hero
class TypingAnimation {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500; // Pause before typing next text
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Dynamic Background Effects
class BackgroundEffects {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.techSymbols = ['</', '/>', '{}', '()', '[]', '=>', '!=', '++', '--', '&&', '||', 'fn', 'var', 'let', 'const'];
        this.colors = ['rgba(59, 130, 246, 0.6)', 'rgba(34, 197, 94, 0.5)', 'rgba(147, 51, 234, 0.4)', 'rgba(245, 158, 11, 0.5)'];
        this.init();
    }

    init() {
        this.createCanvas();
        this.createParticles();
        this.animate();
        window.addEventListener('resize', () => this.handleResize());
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.7';
        
        this.ctx = this.canvas.getContext('2d');
        this.handleResize();
        
        document.body.appendChild(this.canvas);
    }

    createParticles() {
        this.particles = [];
        const particleCount = Math.min(50, Math.floor(window.innerWidth / 25));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                symbol: this.techSymbols[Math.floor(Math.random() * this.techSymbols.length)],
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                size: Math.random() * 12 + 8,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.rotation += particle.rotationSpeed;
            
            // Wrap around edges
            if (particle.x < -50) particle.x = this.canvas.width + 50;
            if (particle.x > this.canvas.width + 50) particle.x = -50;
            if (particle.y < -50) particle.y = this.canvas.height + 50;
            if (particle.y > this.canvas.height + 50) particle.y = -50;
            
            // Draw particle
            this.ctx.save();
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.rotation);
            this.ctx.font = `${particle.size}px 'Fira Code', monospace`;
            this.ctx.fillStyle = particle.color;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(particle.symbol, 0, 0);
            this.ctx.restore();
        });
        
        requestAnimationFrame(() => this.animate());
    }

    handleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createParticles();
    }
}

// Visitor Counter
class VisitorCounter {
    constructor() {
        this.counterElement = document.getElementById('visitor-count');
        this.heroCounterElement = document.getElementById('visitor-count-hero');
        this.storageKey = 'imkrisk-visitor-count';
        this.init();
    }

    init() {
        this.updateVisitorCount();
        this.fetchExternalCount();
    }

    updateVisitorCount() {
        // Get or initialize local visit count
        let visitCount = localStorage.getItem(this.storageKey);
        const lastVisit = localStorage.getItem(this.storageKey + '-date');
        const today = new Date().toDateString();

        if (!visitCount) {
            visitCount = 1;
        } else if (lastVisit !== today) {
            // Count as new visit if it's a different day
            visitCount = parseInt(visitCount) + 1;
        }

        localStorage.setItem(this.storageKey, visitCount.toString());
        localStorage.setItem(this.storageKey + '-date', today);

        // Display the count
        this.displayCount(visitCount);
    }

    displayCount(count) {
        if (this.counterElement) {
            // Add some animation to the count
            this.counterElement.style.opacity = '0';
            setTimeout(() => {
                this.counterElement.textContent = this.formatNumber(count);
                this.counterElement.style.opacity = '1';
            }, 200);
        }
        if (this.heroCounterElement) {
            // Animate hero counter with typewriter effect
            this.animateCounter(this.heroCounterElement, count);
        }
    }

    animateCounter(element, targetCount) {
        const duration = 2000; // 2 seconds
        const stepTime = 50; // Update every 50ms
        const steps = duration / stepTime;
        let currentStep = 0;
        
        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const currentCount = Math.floor(targetCount * progress);
            
            element.textContent = this.formatNumber(currentCount);
            
            if (currentStep >= steps) {
                clearInterval(timer);
                element.textContent = this.formatNumber(targetCount);
            }
        }, stepTime);
    }

    formatNumber(num) {
        // Format number with commas for readability
        return parseInt(num).toLocaleString();
    }

    async fetchExternalCount() {
        try {
            // Try to get a more accurate count from a free counter API
            // Using CountAPI.xyz as a free option
            const response = await fetch('https://api.countapi.xyz/hit/imkrisk.github.io/visits', {
                method: 'GET',
                timeout: 3000 // 3 second timeout
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.value && data.value > 0) {
                    this.displayCount(data.value);
                    return;
                }
            }
        } catch (error) {
            console.log('External counter service unavailable, using fallback');
        }
        
        // Enhanced fallback: Use localStorage with session tracking
        this.useFallbackCounter();
    }
    
    useFallbackCounter() {
        // Check if this is a new session
        const sessionKey = 'visitor_session_' + new Date().toDateString();
        const hasVisitedToday = localStorage.getItem(sessionKey);
        
        if (!hasVisitedToday) {
            // New session for today, increment counter
            const currentCount = parseInt(localStorage.getItem('visitor_count') || '100');
            const newCount = currentCount + 1;
            localStorage.setItem('visitor_count', newCount.toString());
            localStorage.setItem(sessionKey, 'true');
            this.displayCount(newCount);
        } else {
            // Existing session, just display current count
            const currentCount = parseInt(localStorage.getItem('visitor_count') || '100');
            this.displayCount(currentCount);
        }
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.optimizeScrollEvents();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    optimizeScrollEvents() {
        let ticking = false;

        function updateOnScroll() {
            // Batch scroll-based updates here
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ThemeManager();
    new NavigationManager();
    new SmoothScroll();
    new ScrollAnimations();
    new ProjectsManager();
    new ContactFormHandler();
    new VisitorCounter();
    new BackgroundEffects();
    new PerformanceOptimizer();
    new SkillAnimations();

    // Initialize typing animation for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        new TypingAnimation(heroSubtitle, [
            'Full Stack Developer',
            'UI/UX Enthusiast',
            'Problem Solver',
            'Code Craftsman'
        ]);
    }

    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && heroImage) {
        setTimeout(() => {
            heroContent.classList.add('fade-in-up');
            heroImage.classList.add('fade-in-up');
        }, 100);
    }
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations and reduce activity when page is hidden
        document.body.classList.add('page-hidden');
    } else {
        // Resume when page becomes visible
        document.body.classList.remove('page-hidden');
    }
});

// Error handling for uncaught errors
window.addEventListener('error', (e) => {
    console.error('Uncaught error:', e.error);
    // You could send error reports to a logging service here
});

// Skill Animations Class
class SkillAnimations {
    constructor() {
        this.skillIcons = document.querySelectorAll('.skill-icon');
        this.init();
    }

    init() {
        this.observeSkills();
        this.addInteractivity();
    }

    observeSkills() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillLevels(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.skill-category').forEach(category => {
            observer.observe(category);
        });
    }

    animateSkillLevels(category) {
        const levelBars = category.querySelectorAll('.level-bar');
        levelBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.width = bar.style.getPropertyValue('--level') || '0%';
            }, index * 200);
        });
    }

    addInteractivity() {
        this.skillIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => this.showSkillTooltip(icon));
            icon.addEventListener('mouseleave', () => this.hideSkillTooltip(icon));
            icon.addEventListener('click', () => this.skillClickEffect(icon));
        });
    }

    showSkillTooltip(icon) {
        const skillName = icon.dataset.skill;
        if (!skillName) return;

        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        tooltip.textContent = `Click to learn more about ${skillName}`;
        
        tooltip.style.cssText = `
            position: absolute;
            background: var(--surface-color);
            color: var(--text-primary);
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-size: 0.8rem;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        icon.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 10);
    }

    hideSkillTooltip(icon) {
        const tooltip = icon.querySelector('.skill-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                tooltip.remove();
            }, 300);
        }
    }

    skillClickEffect(icon) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(59, 130, 246, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            margin-top: -50px;
            margin-left: -50px;
        `;

        icon.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        NavigationManager,
        ProjectsManager,
        ContactFormHandler,
        SkillAnimations
    };
}