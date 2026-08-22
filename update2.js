const fs = require('fs');
let content = fs.readFileSync('about.html', 'utf-8');

const newMain = `    <main>
        <!-- Hero Area -->
        <header class="section" style="position: relative; overflow: hidden; text-align: center; padding: 6rem 1.5rem 4rem;">
            <!-- Abstract background graphic (inline SVG) -->
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.05; pointer-events: none; display: flex; align-items: center; justify-content: center; z-index: 0;">
                <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Speech bubble silhouette (Coral) -->
                    <path d="M100 50C44.77 50 0 85.82 0 130C0 156.41 15.65 180 40 195.42V250L92.2 216.73C94.77 216.9 97.37 217 100 217C155.23 217 200 181.18 200 137C200 85.82 155.23 50 100 50Z" fill="var(--coral-500)"/>
                    <!-- Hand/Sign abstract (Gold) -->
                    <rect x="160" y="100" width="120" height="150" rx="40" fill="var(--gold-500)" style="mix-blend-mode: screen; transform: rotate(15deg); transform-origin: center;"/>
                    <circle cx="220" cy="80" r="50" fill="var(--gold-500)" style="mix-blend-mode: screen;"/>
                </svg>
            </div>
            
            <div class="container" style="position: relative; z-index: 1;">
                <h1 class="text-hero">The Communication Chasm</h1>
                <p class="subtitle" style="margin-inline: auto;">A profound communication breakdown isolates 7.2 million deaf Indians inside their own homes.</p>
            </div>
        </header>

        <!-- The Contrast Section -->
        <section class="section container" style="padding-top: 2rem;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap; margin-bottom: 3rem;">
                
                <!-- Card 1 -->
                <div class="card" style="flex: 1; min-width: 280px; text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1.5rem;">🤟</div>
                    <h3 class="text-h3" style="margin-bottom: 1rem;">The Deaf Child</h3>
                    <p class="text-body" style="color: var(--text-muted); margin: 0;">Expresses needs, emotions, and questions fluently in Indian Sign Language (ISL), but cannot receive spoken responses in a format they understand.</p>
                </div>

                <!-- Connecting Visual -->
                <div style="color: var(--coral-500); flex-shrink: 0; display: flex; flex-direction: column; align-items: center; padding: 1rem;">
                    <div style="font-size: 2.5rem; font-weight: 700; line-height: 1; opacity: 0.8;">✕</div>
                    <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; margin-top: 0.5rem; color: var(--text-muted); font-weight: 600;">Broken Link</div>
                </div>

                <!-- Card 2 -->
                <div class="card" style="flex: 1; min-width: 280px; text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1.5rem;">🗣️</div>
                    <h3 class="text-h3" style="margin-bottom: 1rem;">The Hearing Parents</h3>
                    <p class="text-body" style="color: var(--text-muted); margin: 0;">Speak fluently in regional Indian languages, but cannot interpret the child's distinct ISL signs.</p>
                </div>
            </div>

            <!-- The Result -->
            <div class="card" style="border-left: 4px solid var(--coral-500); background: linear-gradient(90deg, rgba(244, 63, 94, 0.08) 0%, rgba(30, 41, 59, 0) 100%); padding: 2rem 2.5rem;">
                <p class="text-body" style="margin: 0;">
                    <strong style="color: var(--text-primary); font-size: 1.25rem; display: block; margin-bottom: 0.5rem; font-family: 'Space Grotesk', sans-serif;">The Result:</strong> 
                    <span style="color: var(--text-primary); opacity: 0.9;">Fragmented communication reliant on guesswork and pointing, leading to severe impacts on emotional wellbeing, education, and basic healthcare access.</span>
                </p>
            </div>
        </section>

        <!-- Problem with Existing Tech Section -->
        <section class="section container" style="padding-bottom: 6rem;">
            <div style="text-align: center; margin-bottom: 4rem;">
                <h2 class="text-h2 heading-accent">The Problem with Existing Tech</h2>
                <p class="subtitle" style="margin-inline: auto;">Existing assistive technologies provide one-way streets, not true conversations.</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
                <div class="card">
                    <div style="font-size: 2.5rem; margin-bottom: 1.5rem; display: inline-block; padding: 1rem; background: rgba(245, 158, 11, 0.1); border-radius: 1rem;">🧤</div>
                    <h4 class="text-h3" style="font-size: 1.25rem; margin-bottom: 1rem;">Wearable ASL Gloves</h4>
                    <p class="text-body" style="color: var(--text-muted); font-size: 1rem; margin: 0;">Built entirely for American Sign Language (ASL). They output in English and completely ignore the distinct grammar and handshapes of ISL.</p>
                </div>
                
                <div class="card">
                    <div style="font-size: 2.5rem; margin-bottom: 1.5rem; display: inline-block; padding: 1rem; background: rgba(245, 158, 11, 0.1); border-radius: 1rem;">💬</div>
                    <h4 class="text-h3" style="font-size: 1.25rem; margin-bottom: 1rem;">Speech-to-Text Apps</h4>
                    <p class="text-body" style="color: var(--text-muted); font-size: 1rem; margin: 0;">Tools like Live Transcribe require active internet and offer no return path for the deaf person to respond in sign.</p>
                </div>
                
                <div class="card">
                    <div style="font-size: 2.5rem; margin-bottom: 1.5rem; display: inline-block; padding: 1rem; background: rgba(245, 158, 11, 0.1); border-radius: 1rem;">📷</div>
                    <h4 class="text-h3" style="font-size: 1.25rem; margin-bottom: 1rem;">Camera-based AI</h4>
                    <p class="text-body" style="color: var(--text-muted); font-size: 1rem; margin: 0;">Suffer from severe lighting dependencies, background clutter issues, and significant privacy concerns.</p>
                </div>
            </div>
        </section>
    </main>`;

content = content.replace(/<main>[\s\S]*?<\/main>/, newMain);
fs.writeFileSync('about.html', content, 'utf-8');
