const fs = require('fs');
let content = fs.readFileSync('how-it-works.html', 'utf-8');

const newMain = `    <main>
        <!-- Hero Area -->
        <header class="section" style="text-align: center; padding: 6rem 1.5rem 4rem;">
            <div class="container">
                <h1 class="text-hero">The SamaVaad Infinity Loop</h1>
                <p class="subtitle" style="margin-inline: auto;">Closing the conversational gap through continuous hardware and AI integration.</p>
            </div>
        </header>

        <!-- Two-Direction Overview -->
        <section class="section container" style="padding-top: 0;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
                
                <!-- Direction 1 -->
                <div class="card">
                    <div style="font-size: 2.5rem; margin-bottom: 1rem;">🧤</div>
                    <h3 class="text-h3" style="margin-bottom: 1rem;">Direction 1: Deaf &rarr; Hearing</h3>
                    <p class="text-body" style="color: var(--text-muted); margin-bottom: 2rem;">The glove captures ISL signs, an on-device AI model converts them into a grammatically correct sentence in the hearing person's regional language, and it's spoken aloud.</p>
                    
                    <div style="background: rgba(255,255,255,0.05); border-left: 3px solid var(--gold-500); padding: 1rem; border-radius: 0 0.5rem 0.5rem 0;">
                        <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: var(--gold-500); margin-bottom: 0.5rem; font-weight: 700;">Example Translation</div>
                        <div style="font-family: 'Space Grotesk', sans-serif; font-weight: 700;">"WATER + WANT"</div>
                        <div style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.25rem;">&rarr; hears "Mujhe paani chahiye" (Hindi)</div>
                    </div>
                </div>

                <!-- Direction 2 -->
                <div class="card">
                    <div style="font-size: 2.5rem; margin-bottom: 1rem;">💬</div>
                    <h3 class="text-h3" style="margin-bottom: 1rem;">Direction 2: Hearing &rarr; Deaf</h3>
                    <p class="text-body" style="color: var(--text-muted); margin-bottom: 2rem;">The hearing person speaks naturally, the AI transcribes and restructures it into ISL grammar, and an animated avatar signs the response back.</p>
                    
                    <div style="background: rgba(255,255,255,0.05); border-left: 3px solid var(--coral-500); padding: 1rem; border-radius: 0 0.5rem 0.5rem 0;">
                        <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: var(--coral-500); margin-bottom: 0.5rem; font-weight: 700;">Example Translation</div>
                        <div style="font-family: 'Space Grotesk', sans-serif; font-weight: 700;">"Priya, have you eaten lunch?"</div>
                        <div style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.25rem;">&rarr; avatar signs "PRIYA EAT LUNCH FINISH YOU"</div>
                    </div>
                </div>

            </div>
        </section>

        <!-- Stepper Workflow -->
        <section class="section container">
            <div style="text-align: center; margin-bottom: 3rem;">
                <h2 class="text-h2 heading-accent">Step-by-Step Workflow</h2>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 3rem;">
                
                <!-- Steps Dir 1 -->
                <div>
                    <h4 class="text-h3" style="color: var(--gold-500); margin-bottom: 1.5rem;">Deaf &rarr; Hearing</h4>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <div style="display: flex; gap: 1rem; align-items: flex-start;">
                            <span class="pill pill-gold" style="flex-shrink: 0; width: 28px; height: 28px; padding: 0; border-radius: 50%;">1</span>
                            <span style="color: var(--text-muted); padding-top: 2px;">Sign in ISL</span>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: flex-start;">
                            <span class="pill pill-gold" style="flex-shrink: 0; width: 28px; height: 28px; padding: 0; border-radius: 50%;">2</span>
                            <span style="color: var(--text-muted); padding-top: 2px;">Flex sensors + IMU capture motion</span>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: flex-start;">
                            <span class="pill pill-gold" style="flex-shrink: 0; width: 28px; height: 28px; padding: 0; border-radius: 50%;">3</span>
                            <span style="color: var(--text-muted); padding-top: 2px;">On-device gesture recognition classifies the sign</span>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: flex-start;">
                            <span class="pill pill-gold" style="flex-shrink: 0; width: 28px; height: 28px; padding: 0; border-radius: 50%;">4</span>
                            <span style="color: var(--text-muted); padding-top: 2px;">Grammar bridge reconstructs a regional-language sentence</span>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: flex-start;">
                            <span class="pill pill-gold" style="flex-shrink: 0; width: 28px; height: 28px; padding: 0; border-radius: 50%;">5</span>
                            <span style="color: var(--text-primary); font-weight: 600; padding-top: 2px;">Text-to-speech plays the audio</span>
                        </div>
                    </div>
                </div>

                <!-- Steps Dir 2 -->
                <div>
                    <h4 class="text-h3" style="color: var(--coral-500); margin-bottom: 1.5rem;">Hearing &rarr; Deaf</h4>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <div style="display: flex; gap: 1rem; align-items: flex-start;">
                            <span class="pill pill-coral" style="flex-shrink: 0; width: 28px; height: 28px; padding: 0; border-radius: 50%;">1</span>
                            <span style="color: var(--text-muted); padding-top: 2px;">Speak naturally</span>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: flex-start;">
                            <span class="pill pill-coral" style="flex-shrink: 0; width: 28px; height: 28px; padding: 0; border-radius: 50%;">2</span>
                            <span style="color: var(--text-muted); padding-top: 2px;">Speech recognized and transcribed</span>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: flex-start;">
                            <span class="pill pill-coral" style="flex-shrink: 0; width: 28px; height: 28px; padding: 0; border-radius: 50%;">3</span>
                            <span style="color: var(--text-muted); padding-top: 2px;">NLP simplifies it into ISL grammar</span>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: flex-start;">
                            <span class="pill pill-coral" style="flex-shrink: 0; width: 28px; height: 28px; padding: 0; border-radius: 50%;">4</span>
                            <span style="color: var(--text-muted); padding-top: 2px;">Sign sequence is mapped</span>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: flex-start;">
                            <span class="pill pill-coral" style="flex-shrink: 0; width: 28px; height: 28px; padding: 0; border-radius: 50%;">5</span>
                            <span style="color: var(--text-primary); font-weight: 600; padding-top: 2px;">Avatar animates the signs</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Six Layers Grid -->
        <section class="section container">
            <div style="text-align: center; margin-bottom: 4rem;">
                <h2 class="text-h2 heading-accent">The Six AI Layers</h2>
                <p class="subtitle" style="margin-inline: auto;">The proprietary architecture powering true bidirectional fluency.</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2.5rem 2rem;">
                
                <!-- L1 -->
                <div class="card" style="position: relative;">
                    <span class="pill pill-gold" style="position: absolute; top: -12px; left: 2rem;">Layer 1</span>
                    <h4 class="text-h3" style="font-size: 1.25rem; margin-top: 0.5rem; margin-bottom: 1rem;">ISL Gesture Recognition</h4>
                    <p class="text-body" style="color: var(--text-muted); font-size: 0.95rem; margin: 0;">A temporal CNN/LSTM model on-device classifies flex-sensor and motion data into ISL signs in real time, adapting to each signer's style.</p>
                </div>

                <!-- L2 -->
                <div class="card" style="position: relative; border-color: rgba(244, 63, 94, 0.3); background: linear-gradient(180deg, var(--navy-800) 0%, rgba(244, 63, 94, 0.05) 100%);">
                    <span class="pill pill-coral" style="position: absolute; top: -12px; left: 2rem;">Layer 2</span>
                    <span class="pill pill-gold" style="position: absolute; top: -12px; right: 2rem; font-size: 0.7rem; padding: 0.1rem 0.6rem;">Core Innovation</span>
                    <h4 class="text-h3" style="font-size: 1.25rem; margin-top: 0.5rem; margin-bottom: 1rem;">Cross-Linguistic Grammar Bridge</h4>
                    <p class="text-body" style="color: var(--text-muted); font-size: 0.95rem; margin: 0;">True bidirectional fluency requires a Cross-Linguistic Grammar Bridge, not mere word-swapping. Indian Sign Language has a fundamentally different grammar from spoken languages (lacks articles, tense markers, uses strict topic-comment order). Our <strong>Seq2Seq Transformer AI Engine</strong> strips tense markers and restructures syntax rules in real-time to ensure total fluency in both directions.</p>
                </div>

                <!-- L3 -->
                <div class="card" style="position: relative;">
                    <span class="pill pill-gold" style="position: absolute; top: -12px; left: 2rem;">Layer 3</span>
                    <h4 class="text-h3" style="font-size: 1.25rem; margin-top: 0.5rem; margin-bottom: 1rem;">Regional Language Text-to-Speech</h4>
                    <p class="text-body" style="color: var(--text-muted); font-size: 0.95rem; margin: 0;">Converts the reconstructed sentence into natural speech in the target Indian language, with voice models cached on-device for offline use.</p>
                </div>

                <!-- L4 -->
                <div class="card" style="position: relative;">
                    <span class="pill pill-gold" style="position: absolute; top: -12px; left: 2rem;">Layer 4</span>
                    <h4 class="text-h3" style="font-size: 1.25rem; margin-top: 0.5rem; margin-bottom: 1rem;">Speech Recognition + NLP Simplification</h4>
                    <p class="text-body" style="color: var(--text-muted); font-size: 0.95rem; margin: 0;">Transcribes the hearing person's speech and restructures it into clean ISL-compatible grammar, removing articles and tense markers.</p>
                </div>

                <!-- L5 -->
                <div class="card" style="position: relative;">
                    <span class="pill pill-gold" style="position: absolute; top: -12px; left: 2rem;">Layer 5</span>
                    <h4 class="text-h3" style="font-size: 1.25rem; margin-top: 0.5rem; margin-bottom: 1rem;">ISL Avatar Animation Engine</h4>
                    <p class="text-body" style="color: var(--text-muted); font-size: 0.95rem; margin: 0;">Renders the sign sequence as a smooth animated avatar using motion interpolation between signs, rather than robotic pre-recorded clips.</p>
                </div>

                <!-- L6 -->
                <div class="card" style="position: relative;">
                    <span class="pill pill-gold" style="position: absolute; top: -12px; left: 2rem;">Layer 6</span>
                    <h4 class="text-h3" style="font-size: 1.25rem; margin-top: 0.5rem; margin-bottom: 1rem;">Federated Personalization &amp; Context</h4>
                    <p class="text-body" style="color: var(--text-muted); font-size: 0.95rem; margin: 0;">The model fine-tunes to each user's signing style on-device (federated learning, no personal data leaves) and uses recent conversation context to resolve ambiguous signs.</p>
                </div>

            </div>
        </section>

        <!-- CTA -->
        <section class="section container" style="padding-bottom: 8rem; text-align: center;">
            <div class="card" style="background: linear-gradient(135deg, rgba(244, 63, 94, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4rem 2rem;">
                <h3 class="text-h2" style="margin-bottom: 1.5rem;">Curious what the physical glove looks like?</h3>
                <a href="hardware.html" class="btn btn-primary" style="font-size: 1.1rem; padding: 1rem 2.5rem;">Explore the Hardware &rarr;</a>
            </div>
        </section>
    </main>`;

content = content.replace(/<main>[\s\S]*?<\/main>/, newMain);
fs.writeFileSync('how-it-works.html', content, 'utf-8');
