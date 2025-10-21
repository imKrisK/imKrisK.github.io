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
        this.init();
    }

    async init() {
        await this.loadProjects();
    }

    async loadProjects() {
        try {
            const response = await fetch(`https://api.github.com/users/${this.githubUsername}/repos?sort=updated&per_page=6`);
            const repos = await response.json();
            
            const featuredProjects = repos
                .filter(repo => !repo.fork && repo.description)
                .slice(0, 6);
            
            this.renderProjects(featuredProjects);
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
        const commonLanguages = ['JavaScript', 'TypeScript', 'React', 'Vue', 'Node.js', 'Python', 'PHP', 'HTML', 'CSS'];
        const repoName = project.name.toLowerCase();
        const description = (project.description || '').toLowerCase();
        
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
        
        // Remove duplicates and limit to 3 tags
        return [...new Set(detectedLanguages)].slice(0, 3);
    }

    renderFallbackProjects() {
        const fallbackProjects = [
            {
                name: 'Portfolio Website',
                description: 'A responsive portfolio website built with modern web technologies.',
                languages: ['HTML', 'CSS', 'JavaScript'],
                demoUrl: '#',
                githubUrl: `https://github.com/${this.githubUsername}`
            },
            {
                name: 'Web Application',
                description: 'A full-stack web application with user authentication and real-time features.',
                languages: ['React', 'Node.js', 'MongoDB'],
                demoUrl: '#',
                githubUrl: `https://github.com/${this.githubUsername}`
            },
            {
                name: 'API Service',
                description: 'RESTful API service with comprehensive documentation and testing.',
                languages: ['Node.js', 'Express', 'PostgreSQL'],
                demoUrl: '#',
                githubUrl: `https://github.com/${this.githubUsername}`
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
    new PerformanceOptimizer();

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

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        NavigationManager,
        ProjectsManager,
        ContactFormHandler
    };
}