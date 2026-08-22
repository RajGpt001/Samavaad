const fs = require('fs');

const files = [
    { name: 'index.html', title: 'SamaVaad &mdash; Home | A Bidirectional AI Communication Bridge' },
    { name: 'about.html', title: 'SamaVaad &mdash; About | The Communication Chasm' },
    { name: 'how-it-works.html', title: 'SamaVaad &mdash; How It Works | The Infinity Loop' },
    { name: 'hardware.html', title: 'SamaVaad &mdash; Hardware | The Wearable Device' }
];

const description = "SamaVaad is an offline-first AI communication bridge seamlessly translating between Indian Sign Language and regional spoken languages in real time.";
const favicon = `<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤟</text></svg>">`;

files.forEach(file => {
    if (!fs.existsSync(file.name)) return;
    let content = fs.readFileSync(file.name, 'utf-8');
    
    // 1. Update Title, Meta Description, Favicon
    content = content.replace(/<title>.*?<\/title>/g, '');
    content = content.replace(/<meta name="description".*?>/g, '');
    content = content.replace(/<link rel="icon".*?>/g, '');
    
    const headInjection = `
    <title>${file.title}</title>
    <meta name="description" content="${description}">
    ${favicon}
</head>`;
    content = content.replace('</head>', headInjection);
    
    // 2. Fix Grid columns to prevent 375px mobile overflow
    content = content.replace(/minmax\(\s*\d+px/g, "minmax(min(100%, 280px)");
    content = content.replace(/minmax\(min\(100%, 280px\), 1fr\)/g, "minmax(min(100%, 280px), 1fr)"); // Deduplicate if ran multiple times
    
    // 3. Add animate-on-scroll classes safely
    // Exclude index.html panel cards to not break the live demo's tab switching
    let lines = content.split('\n');
    lines = lines.map(line => {
        // If it's a card and NOT a panel
        if (line.includes('class="') && !line.includes('panel')) {
            line = line.replace(/class="([^"]*\bcard\b[^"]*)"/g, 'class="$1 animate-on-scroll"');
            line = line.replace(/class="([^"]*\btext-h2\b[^"]*)"/g, 'class="$1 animate-on-scroll"');
            line = line.replace(/class="([^"]*\btext-hero\b[^"]*)"/g, 'class="$1 animate-on-scroll"');
        }
        return line;
    });
    content = lines.join('\n');
    
    // Deduplicate animate-on-scroll just in case
    content = content.replace(/animate-on-scroll animate-on-scroll/g, "animate-on-scroll");

    // 4. Add global.js at the end before </body>
    if (!content.includes('<script src="global.js"></script>')) {
        content = content.replace('</body>', '    <script src="global.js"></script>\n</body>');
    }

    fs.writeFileSync(file.name, content, 'utf-8');
});

// Create global.js
const globalJS = `document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animating in once
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});
`;
fs.writeFileSync('global.js', globalJS, 'utf-8');

// Add CSS updates to style.css
let css = fs.readFileSync('style.css', 'utf-8');
if (!css.includes('.animate-on-scroll')) {
    css += `\n
/* Global Layout Fixes */
html, body {
  overflow-x: hidden;
  width: 100%;
}

/* Scroll Animations */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}
.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}
`;
    fs.writeFileSync('style.css', css, 'utf-8');
}
