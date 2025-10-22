# imKrisK.github.io

[![Live Site](https://img.shields.io/badge/Live-Site-blue?style=for-the-badge)](https://imkrisk.github.io)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20with-GitHub%20Pages-brightgreen?style=for-the-badge&logo=github)](https://pages.github.com/)

> **Personal Portfolio Website** - A modern, responsive portfolio showcasing my development skills and projects.

## 🌟 Features

- **Responsive Design** - Optimized for all devices and screen sizes
- **Dark/Light Theme** - Toggle between themes with persistent storage
- **Dynamic Projects** - Automatically fetches and displays GitHub repositories
- **Interactive Animations** - Smooth scrolling and scroll-triggered animations
- **Contact Form** - Functional contact form with validation
- **SEO Optimized** - Meta tags, Open Graph, and structured data
- **Performance Focused** - Lazy loading, optimized images, and efficient code

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Custom properties, Flexbox, Grid, animations
- **JavaScript (ES6+)** - Modern JavaScript with classes and modules
- **Font Awesome** - Icon library for consistent iconography
- **Google Fonts** - Inter font family for clean typography

### Tools & Services
- **GitHub Pages** - Free hosting and deployment
- **GitHub API** - Dynamic project loading
- **Intersection Observer** - Efficient scroll animations
- **Local Storage** - Theme preference persistence

## 🚀 Quick Start

### View Live Site
Visit [imkrisk.github.io](https://imkrisk.github.io) to see the portfolio in action.

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/imKrisK/imKrisK.github.io.git
   cd imKrisK.github.io
   ```

2. **Open in browser**
   ```bash
   # Using Python (if installed)
   python -m http.server 8000
   
   # Using Node.js (if installed)
   npx serve .
   
   # Or simply open index.html in your browser
   open index.html
   ```

3. **Start developing**
   - Edit `index.html` for content changes
   - Modify `styles.css` for styling updates
   - Update `script.js` for functionality enhancements

## 📁 Project Structure

```
imKrisK.github.io/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and themes
├── script.js           # JavaScript functionality
├── README.md           # Project documentation
└── assets/            # Future: Images and media files
    ├── images/
    └── icons/
```

## 🎨 Customization

### Updating Personal Information

1. **Hero Section** - Edit the hero content in `index.html`:
   ```html
   <h1 class="hero-title">Hi, I'm <span class="highlight">YourName</span></h1>
   <p class="hero-description">Your bio and description...</p>
   ```

2. **About Section** - Update your story and stats in `index.html`

3. **Skills** - Modify the skills grid to reflect your technologies

4. **Contact Information** - Update contact details and social links

### Theming

The site uses CSS custom properties for easy theming:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #64748b;
    --accent-color: #f59e0b;
    /* ... more variables */
}
```

### GitHub Integration

Update the GitHub username in `script.js`:

```javascript
class ProjectsManager {
    constructor() {
        this.githubUsername = 'YourGitHubUsername'; // Change this
        this.init();
    }
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## ⚡ Performance Features

- **Lazy Loading** - Images load only when needed
- **Optimized Animations** - GPU-accelerated CSS transforms
- **Efficient JavaScript** - Event delegation and throttling
- **Minimal Dependencies** - Lightweight external resources

## 🔍 SEO Features

- Semantic HTML structure
- Meta descriptions and keywords
- Open Graph tags for social sharing
- Twitter Card support
- Structured data markup
- Fast loading times

## 📊 Analytics & Monitoring

To add analytics, include your tracking code before the closing `</head>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚀 Deployment

The site is automatically deployed via GitHub Pages. Any push to the `main` branch triggers a new deployment.

### Manual Deployment to Other Platforms

**Netlify:**
1. Connect your GitHub repository
2. Set build command: (none needed)
3. Set publish directory: `/`

**Vercel:**
1. Import your GitHub repository
2. No build configuration needed
3. Deploy automatically

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

- **Email**: [imKrisK@icloud.com](mailto:imKrisK@icloud.com)
- **GitHub**: [@imKrisK](https://github.com/imKrisK/README)
- **LinkedIn**: [imkrisk](https://linkedin.com/in/kristofferkelly)
- **Location**: Las Vegas, Nevada

---

**Built with ❤️ by imKrisK** | **Powered by GitHub Pages**