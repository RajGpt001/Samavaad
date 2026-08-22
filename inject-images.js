const fs = require('fs');
let content = fs.readFileSync('hardware.html', 'utf-8');

const renderHTML = `
        <!-- Smart Glove Render -->
        <section class="section container" style="padding-top: 0;">
            <div class="animate-on-scroll" style="text-align: center; margin-bottom: 3rem;">
                <img src="images/smart_glove_render.jpg" alt="3D Render of SamaVaad Smart Glove" style="width: 100%; max-width: 800px; height: auto; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.05);">
            </div>
        </section>
`;

const archHTML = `
        <!-- System Architecture Image -->
        <section class="section container">
            <div class="card animate-on-scroll" style="padding: 1rem; margin-bottom: 2rem;">
                <img src="images/system_architecture.png" alt="SamaVaad Glove Architecture Diagram" style="width: 100%; height: auto; border-radius: 8px;">
                <p class="text-body" style="color: var(--text-muted); margin-top: 1.5rem; text-align: center; font-size: 0.95rem;">
                    This diagram illustrates the complete hardware ecosystem. The wearable glove acts as the primary input device, utilizing <strong>flex sensors</strong> and an <strong>IMU</strong> to capture the precise shape and motion of Indian Sign Language. This raw data is processed locally by the <strong>ESP32 microcontroller</strong> and transmitted via ultra-low-latency Bluetooth (BLE) to the companion tablet. The tablet then leverages its onboard NPU and storage to decode the signs, rendering an animated avatar on-screen and outputting spoken audio, while simultaneously listening for spoken replies through its built-in microphone.
                </p>
            </div>
        </section>
`;

content = content.replace('<!-- Why a Glove, Not a Camera -->', renderHTML + '\n        <!-- Why a Glove, Not a Camera -->');
content = content.replace('<!-- Glove Component Architecture -->', archHTML + '\n        <!-- Glove Component Architecture -->');

fs.writeFileSync('hardware.html', content, 'utf-8');
