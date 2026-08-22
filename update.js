const fs = require('fs');

const files = ['index.html', 'about.html', 'how-it-works.html'];

const navTemplate = `    <nav class="navbar">
        <div class="nav-container">
            <a href="index.html" class="nav-logo serif">Sama<span class="vaad">Vaad</span></a>
            <button class="menu-toggle" aria-label="Toggle menu" onclick="this.classList.toggle('open'); document.getElementById('navMenu').classList.toggle('open');">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div id="navMenu" class="nav-links">
                <a href="index.html" class="{active_home}">Home</a>
                <a href="about.html" class="{active_about}">About</a>
                <a href="how-it-works.html" class="{active_how}">How It Works</a>
                <a href="hardware.html" class="{active_hard}">Hardware</a>
            </div>
        </div>
    </nav>`;

const footerTemplate = `    <footer class="site-footer">
        <div class="container footer-container">
            <div class="footer-logo serif">Sama<span class="vaad">Vaad</span></div>
            <div class="footer-text">&middot; Offline-first architecture, simulated here for browser demo purposes</div>
        </div>
    </footer>`;

for (const filename of files) {
    if (!fs.existsSync(filename)) continue;
    let content = fs.readFileSync(filename, 'utf-8');
    
    // Replace Navbar
    content = content.replace(/<nav class="navbar">[\s\S]*?<\/nav>/, 
        navTemplate
            .replace('{active_home}', filename === 'index.html' ? 'active' : '')
            .replace('{active_about}', filename === 'about.html' ? 'active' : '')
            .replace('{active_how}', filename === 'how-it-works.html' ? 'active' : '')
            .replace('{active_hard}', '')
    );
    
    // Replace Footer
    content = content.replace(/<footer>[\s\S]*?<\/footer>/, footerTemplate);
    
    // Add Google fonts if missing
    if (!content.includes('fonts.googleapis.com')) {
        content = content.replace('</head>', 
            '    <link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">\n</head>');
    }

    fs.writeFileSync(filename, content, 'utf-8');
}

// Update style.css
let css = fs.readFileSync('style.css', 'utf-8');

css = css.replace('backdrop-filter: blur(12px);', 'backdrop-filter: blur(12px);\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);');
css = css.replace(/footer \{[\s\S]*?\}/g, '');

const newCss = `

/* Nav Link Active & Underline */
.nav-links a {
  position: relative;
  padding-bottom: 2px;
}
.nav-links a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0;
  height: 2px;
  background: var(--gold-500);
  transition: width 0.3s ease;
  border-radius: 2px;
}
.nav-links a.active {
  color: var(--coral-500);
}
.nav-links a.active::after, .nav-links a:hover::after {
  width: 100%;
}

/* Mobile Menu Toggle */
.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}
.menu-toggle span {
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  transition: 0.3s;
  border-radius: 2px;
}

/* Footer Restyling */
.site-footer {
  background-color: var(--navy-950);
  border-top: 1px solid rgba(255,255,255,0.05);
  padding: 3rem 0;
  margin-top: auto;
}
.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.footer-logo {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--text-primary);
}
.footer-logo .vaad { color: var(--coral-500); }
.footer-text {
  color: var(--text-muted);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .menu-toggle { display: flex; }
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(11, 17, 32, 0.98);
    flex-direction: column;
    padding: 2rem 0;
    gap: 2rem;
    transform: translateY(-150%);
    opacity: 0;
    transition: all 0.4s ease;
    z-index: -1;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    box-shadow: 0 10px 20px rgba(0,0,0,0.5);
  }
  .nav-links.open {
    transform: translateY(0);
    opacity: 1;
    z-index: 99;
  }
  .nav-links a::after { display: none; }
  
  .footer-container {
    flex-direction: column;
    text-align: center;
    justify-content: center;
  }
}
`;

fs.writeFileSync('style.css', css + newCss, 'utf-8');
