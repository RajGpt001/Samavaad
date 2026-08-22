const fs = require('fs');

const navTemplate = `    <nav class="navbar">
        <div class="nav-container">
            <a href="index.html" class="nav-logo serif">Sama<span class="vaad">Vaad</span></a>
            <button class="menu-toggle" aria-label="Toggle menu" onclick="this.classList.toggle('open'); document.getElementById('navMenu').classList.toggle('open');">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div id="navMenu" class="nav-links">
                <a href="index.html" class="">Home</a>
                <a href="about.html" class="">About</a>
                <a href="how-it-works.html" class="">How It Works</a>
                <a href="hardware.html" class="active">Hardware</a>
            </div>
        </div>
    </nav>`;

const footerTemplate = `    <footer class="site-footer">
        <div class="container footer-container">
            <div class="footer-logo serif">Sama<span class="vaad">Vaad</span></div>
            <div class="footer-text">&middot; Offline-first architecture, simulated here for browser demo purposes</div>
        </div>
    </footer>`;

const content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hardware - SamaVaad</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
</head>
<body>
${navTemplate}

    <main>
        <!-- Hero Area -->
        <header class="section" style="text-align: center; padding: 6rem 1.5rem 4rem;">
            <div class="container">
                <span class="pill pill-gold" style="margin-bottom: 1.5rem;">Hardware Roadmap</span>
                <h1 class="text-hero">The Hardware &mdash; Coming Next</h1>
                <p class="subtitle" style="margin-inline: auto;">The AI brain you just tried is already live. This is the wearable it's built for.</p>
            </div>
        </header>

        <!-- Why a Glove, Not a Camera -->
        <section class="section container" style="padding-top: 0;">
            <div class="card" style="border-left: 4px solid var(--gold-500); background: linear-gradient(90deg, rgba(245, 158, 11, 0.08) 0%, rgba(30, 41, 59, 0) 100%);">
                <h3 class="text-h3" style="margin-bottom: 0.5rem;">Why a Glove, Not a Camera?</h3>
                <p class="text-body" style="color: var(--text-muted); margin: 0;">Wearable sensors completely bypass the severe lighting dependencies, background clutter issues, and privacy concerns inherent to camera-based sign language recognition. By directly measuring joint angles and motion trajectories, the glove works reliably in any environment, including low-light rural settings where traditional cameras fail.</p>
            </div>
        </section>

        <!-- Glove Component Architecture -->
        <section class="section container">
            <div style="text-align: center; margin-bottom: 3rem;">
                <h2 class="text-h2 heading-accent">Glove Component Architecture</h2>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                
                <div class="card">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">📏</div>
                    <h4 class="text-h3" style="font-size: 1.15rem; margin-bottom: 0.5rem;">5x Flex Sensors</h4>
                    <p class="text-body" style="color: var(--text-muted); font-size: 0.95rem; margin: 0;">Detects precise finger bend angles to capture the exact hand shape for each ISL sign (per hand).</p>
                </div>
                
                <div class="card">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">🧭</div>
                    <h4 class="text-h3" style="font-size: 1.15rem; margin-bottom: 0.5rem;">MPU6050 IMU</h4>
                    <p class="text-body" style="color: var(--text-muted); font-size: 0.95rem; margin: 0;">An integrated accelerometer and gyroscope that captures real-time hand orientation and motion trajectory for dynamic signs.</p>
                </div>
                
                <div class="card">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">🧠</div>
                    <h4 class="text-h3" style="font-size: 1.15rem; margin-bottom: 0.5rem;">ESP32-S3 Microcontroller</h4>
                    <p class="text-body" style="color: var(--text-muted); font-size: 0.95rem; margin: 0;">Runs on-device AI gesture-recognition inference locally and handles all high-speed Bluetooth communication.</p>
                </div>
                
                <div class="card">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">🔌</div>
                    <h4 class="text-h3" style="font-size: 1.15rem; margin-bottom: 0.5rem;">Custom Glove PCB</h4>
                    <p class="text-body" style="color: var(--text-muted); font-size: 0.95rem; margin: 0;">A miniaturized board that seamlessly integrates all sensors, compute, and wiring directly into the glove fabric.</p>
                </div>
                
                <div class="card">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">📡</div>
                    <h4 class="text-h3" style="font-size: 1.15rem; margin-bottom: 0.5rem;">BLE Module</h4>
                    <p class="text-body" style="color: var(--text-muted); font-size: 0.95rem; margin: 0;">Bluetooth Low Energy provides a persistent, ultra-low-latency wireless link between the glove and the companion device.</p>
                </div>
                
                <div class="card">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">🔋</div>
                    <h4 class="text-h3" style="font-size: 1.15rem; margin-bottom: 0.5rem;">LiPo Battery + TP4056</h4>
                    <p class="text-body" style="color: var(--text-muted); font-size: 0.95rem; margin: 0;">A 3.7V lithium-polymer battery coupled with a safe charging module guarantees portable, all-day power.</p>
                </div>

            </div>
        </section>

        <!-- Companion Device Section -->
        <section class="section container">
            <div class="card" style="display: flex; flex-direction: column; gap: 1rem;">
                <h3 class="text-h3">The Companion Device</h3>
                <p class="text-body" style="color: var(--text-muted); margin: 0;">The hardware ecosystem is completed by a paired Samsung tablet or smartphone. It acts as the local computing hub, utilizing its display for the animated ISL avatar, its microphone for speech input, and its speaker for audio output. It houses the secure on-device storage for offline AI translation models and cached voice packs, ensuring SamaVaad works perfectly without an internet connection.</p>
            </div>
        </section>

        <!-- Flow Diagram -->
        <section class="section container">
            <div style="text-align: center; margin-bottom: 3rem;">
                <h2 class="text-h2 heading-accent">From Glove to Conversation</h2>
            </div>
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem; width: 100%; margin: 0 auto;">
                
                <div class="card" style="flex: 1; min-width: 130px; text-align: center; padding: 2rem 1rem;">
                    <div style="font-size: 2.5rem; margin-bottom: 1rem;">🧤</div>
                    <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary);">Senses Motion</div>
                </div>
                
                <div style="display: flex; align-items: center; justify-content: center; color: var(--gold-500); font-size: 2rem; font-weight: 700; opacity: 0.5;">&rarr;</div>
                
                <div class="card" style="flex: 1; min-width: 130px; text-align: center; padding: 2rem 1rem;">
                    <div style="font-size: 2.5rem; margin-bottom: 1rem;">📡</div>
                    <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary);">Bluetooth Link</div>
                </div>
                
                <div style="display: flex; align-items: center; justify-content: center; color: var(--gold-500); font-size: 2rem; font-weight: 700; opacity: 0.5;">&rarr;</div>
                
                <div class="card" style="flex: 1; min-width: 130px; text-align: center; padding: 2rem 1rem;">
                    <div style="font-size: 2.5rem; margin-bottom: 1rem;">🧠</div>
                    <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary);">On-Device AI</div>
                </div>
                
                <div style="display: flex; align-items: center; justify-content: center; color: var(--gold-500); font-size: 2rem; font-weight: 700; opacity: 0.5;">&rarr;</div>
                
                <div class="card" style="flex: 1; min-width: 130px; text-align: center; padding: 2rem 1rem; border-color: rgba(244, 63, 94, 0.4); background: rgba(244, 63, 94, 0.08);">
                    <div style="font-size: 2.5rem; margin-bottom: 1rem;">🗣️</div>
                    <div style="font-size: 0.95rem; font-weight: 600; color: var(--coral-500);">Speech / Avatar</div>
                </div>
                
            </div>
        </section>

        <!-- Development Status Callout -->
        <section class="section container" style="padding-bottom: 8rem;">
            <div class="card" style="border-left: 4px solid var(--text-muted); background: rgba(255, 255, 255, 0.02);">
                <h3 class="text-h3" style="margin-bottom: 0.5rem; color: var(--text-primary);">Current Development Phase</h3>
                <p class="text-body" style="color: var(--text-muted); margin: 0; line-height: 1.7;">SamaVaad is being built from the software out. The AI translation, grammar bridge, and avatar layers&mdash;the core intelligence you can try on our live demo&mdash;are functional today. The physical sensor glove outlined here represents the next critical build phase. By perfecting the complex linguistic translation engine first, we ensure the hardware will have a robust, fluent brain waiting for it on day one.</p>
            </div>
        </section>
    </main>

${footerTemplate}
</body>
</html>`;

fs.writeFileSync('hardware.html', content, 'utf-8');
