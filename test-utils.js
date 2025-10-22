// Portfolio Test Functions
// Simple test utilities for manual testing

class PortfolioTestSuite {
    constructor() {
        this.tests = [];
        this.results = { passed: 0, failed: 0, warnings: 0 };
    }

    // Test if all navigation links are working
    testNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        let passed = true;
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href === '#') {
                console.warn(`Navigation link "${link.textContent}" has no valid href`);
                this.results.warnings++;
                passed = false;
            }
        });
        
        this.logTest('Navigation Links', passed);
        return passed;
    }

    // Test if all social media links are external and valid
    testSocialLinks() {
        const socialLinks = document.querySelectorAll('.hero-social a, .footer-social a');
        let passed = true;
        
        socialLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href || (!href.includes('github.com') && !href.includes('linkedin.com') && !href.includes('mailto:'))) {
                console.warn(`Social link has invalid href: ${href}`);
                this.results.warnings++;
                passed = false;
            }
        });
        
        this.logTest('Social Media Links', passed);
        return passed;
    }

    // Test if skill icons are loading
    testSkillIcons() {
        const skillIcons = document.querySelectorAll('.skill-icon img');
        let passed = true;
        
        skillIcons.forEach(icon => {
            if (!icon.src || icon.naturalWidth === 0) {
                console.warn(`Skill icon failed to load: ${icon.alt}`);
                this.results.warnings++;
                passed = false;
            }
        });
        
        this.logTest('Skill Icons Loading', passed);
        return passed;
    }

    // Test contact form validation
    testContactForm() {
        const form = document.getElementById('contact-form');
        const requiredFields = form.querySelectorAll('[required]');
        let passed = true;
        
        requiredFields.forEach(field => {
            if (!field.checkValidity()) {
                // This is expected for empty required fields
            }
        });
        
        // Check if form has proper validation
        if (form && form.checkValidity) {
            this.logTest('Contact Form Validation', true);
        } else {
            this.logTest('Contact Form Validation', false);
            passed = false;
        }
        
        return passed;
    }

    // Test visitor counter functionality
    testVisitorCounter() {
        const counter = document.getElementById('visitor-count');
        const heroCounter = document.getElementById('visitor-count-hero');
        let passed = true;
        
        if (!counter || counter.textContent === 'Loading...') {
            console.warn('Main visitor counter not updating');
            this.results.warnings++;
            passed = false;
        }
        
        if (!heroCounter || heroCounter.textContent === '--') {
            console.warn('Hero visitor counter not updating');
            this.results.warnings++;
            passed = false;
        }
        
        this.logTest('Visitor Counter', passed);
        return passed;
    }

    // Test responsive design
    testResponsiveDesign() {
        const viewport = window.innerWidth;
        const mobileBreakpoint = 768;
        let passed = true;
        
        if (viewport < mobileBreakpoint) {
            // Check if mobile menu is working
            const hamburger = document.getElementById('hamburger');
            if (!hamburger) {
                console.warn('Mobile menu hamburger not found');
                this.results.warnings++;
                passed = false;
            }
        }
        
        this.logTest('Responsive Design', passed);
        return passed;
    }

    // Test for console errors
    testConsoleErrors() {
        // This would need to be run manually or with a testing framework
        console.log('Check browser console for any JavaScript errors');
        this.logTest('Console Error Check', true);
        return true;
    }

    // Test brand consistency
    testBrandConsistency() {
        const brandElements = [
            document.querySelector('.nav-logo a'),
            document.querySelector('.footer-text p')
        ];
        
        let passed = true;
        const expectedBrand = 'Kristoffer Kelly';
        
        brandElements.forEach((element, index) => {
            if (element && element.textContent.includes('imacKris')) {
                console.warn(`Inconsistent branding found in element ${index}: ${element.textContent}`);
                this.results.warnings++;
                passed = false;
            }
        });
        
        this.logTest('Brand Consistency', passed);
        return passed;
    }

    // Utility function to log test results
    logTest(testName, passed) {
        const symbol = passed ? '✅' : '❌';
        console.log(`${symbol} ${testName}: ${passed ? 'PASSED' : 'FAILED'}`);
        
        if (passed) {
            this.results.passed++;
        } else {
            this.results.failed++;
        }
    }

    // Run all tests
    runAllTests() {
        console.log('🧪 Running Portfolio Test Suite...\n');
        
        this.testNavigation();
        this.testSocialLinks();
        this.testSkillIcons();
        this.testContactForm();
        this.testVisitorCounter();
        this.testResponsiveDesign();
        this.testConsoleErrors();
        this.testBrandConsistency();
        
        console.log('\n📊 Test Results:');
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        console.log(`⚠️  Warnings: ${this.results.warnings}`);
        
        const overallPassed = this.results.failed === 0;
        console.log(`\n🎯 Overall Status: ${overallPassed ? 'PASSING' : 'NEEDS ATTENTION'}`);
        
        return overallPassed;
    }
}

// Export for use in console
window.PortfolioTestSuite = PortfolioTestSuite;

// Auto-run tests on page load (comment out for production)
// document.addEventListener('DOMContentLoaded', () => {
//     setTimeout(() => {
//         const tester = new PortfolioTestSuite();
//         tester.runAllTests();
//     }, 2000); // Wait 2 seconds for everything to load
// });

// Usage: Open browser console and run:
// const tester = new PortfolioTestSuite();
// tester.runAllTests();