document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Add active class to corresponding panel
            const targetId = btn.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // --- SIGN TO SPEECH FEATURE ---
    const SIGNS = [
        { id: 'hello', label: 'HELLO', hi: 'namaste', en: 'hello' },
        { id: 'thankyou', label: 'THANK YOU', hi: 'dhanyawad', en: 'thank you' },
        { id: 'water', label: 'WATER', hi: 'paani', en: 'water' },
        { id: 'want', label: 'WANT', hi: 'chahiye', en: 'need / want' },
        { id: 'food', label: 'FOOD', hi: 'bhookh', en: 'food / hungry' },
        { id: 'help', label: 'HELP', hi: 'madad', en: 'help' },
        { id: 'hurt', label: 'HURT', hi: 'dard', en: 'pain / hurt' },
        { id: 'mother', label: 'MOTHER', hi: 'maa', en: 'mother' },
        { id: 'father', label: 'FATHER', hi: 'pita', en: 'father' },
        { id: 'yes', label: 'YES', hi: 'haan', en: 'yes' },
        { id: 'no', label: 'NO', hi: 'nahi', en: 'no' }
    ];

    const SENTENCE_MAP = {
        'water,want': { out: 'Mujhe paani chahiye.', sub: 'ISL syntax: WATER + NEED -> Hindi: Mujhe paani chahiye (I want water)' },
        'hurt,help': { out: 'Mujhe dard ho raha hai, mujhe madad chahiye.', sub: 'ISL syntax: HURT + HELP -> Hindi: Mujhe dard ho raha hai, mujhe madad chahiye' },
        'mother,help': { out: 'Maa, mujhe tumhari madad chahiye.', sub: 'Pitch Opening Story: Connects directly to the emotional core of SamaVaad.' },
        'food,want': { out: 'Mujhe bhookh lagi hai.', sub: 'ISL syntax: FOOD + WANT -> Hindi: Mujhe bhookh lagi hai (I am hungry)' },
        'hello,mother': { out: 'Namaste maa.', sub: 'ISL syntax: HELLO + MOTHER -> Hindi: Namaste maa' }
    };

    let selectedSequence = [];
    
    const signGrid = document.getElementById('signGrid');
    const seqRow = document.getElementById('seqRow');
    const hindiOut = document.getElementById('hindiOut');
    const hindiSub = document.getElementById('hindiSub');
    const speakBtn = document.getElementById('speakBtn');
    const clearBtn = document.getElementById('clearBtn');

    // Initialize voices (Speech Synthesis API can be slow to load voices)
    let hindiVoice = null;
    if (window.speechSynthesis) {
        speechSynthesis.onvoiceschanged = () => {
            const voices = speechSynthesis.getVoices();
            hindiVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('hi-IN'));
        };
    }

    function renderGrid() {
        signGrid.innerHTML = '';
        SIGNS.forEach(sign => {
            const btn = document.createElement('button');
            btn.className = `sign-btn ${selectedSequence.includes(sign.id) ? 'selected' : ''}`;
            btn.innerHTML = `
                <span class="sign-label">${sign.label}</span>
                <span class="sign-sub">${sign.hi}</span>
            `;
            btn.onclick = () => handleSignClick(sign.id);
            signGrid.appendChild(btn);
        });
    }

    function handleSignClick(id) {
        if (selectedSequence.length >= 3) {
            selectedSequence = []; // Reset after 3rd tap
        }
        selectedSequence.push(id);
        updateUI();
    }

    function buildFallback(seq) {
        if (seq.length === 0) return { out: '', sub: '' };
        const words = seq.map(id => SIGNS.find(s => s.id === id).hi);
        const enWords = seq.map(id => SIGNS.find(s => s.id === id).label);
        return {
            out: words.join(' ') + '.',
            sub: `Literal mapping: ${enWords.join(' + ')}`
        };
    }

    function updateUI() {
        renderGrid();
        
        // Update Chips
        seqRow.innerHTML = '';
        selectedSequence.forEach(id => {
            const sign = SIGNS.find(s => s.id === id);
            const chip = document.createElement('div');
            chip.className = 'chip';
            chip.textContent = sign.label;
            seqRow.appendChild(chip);
        });

        // Generate Translation
        const seqKey = selectedSequence.join(',');
        const translation = SENTENCE_MAP[seqKey] || buildFallback(selectedSequence);
        
        hindiOut.textContent = translation.out;
        hindiSub.textContent = translation.sub;
        
        speakBtn.disabled = selectedSequence.length === 0;
    }

    clearBtn.onclick = () => {
        selectedSequence = [];
        updateUI();
    };

    speakBtn.onclick = () => {
        const text = hindiOut.textContent;
        if (!text || !window.speechSynthesis) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'hi-IN';
        if (hindiVoice) utterance.voice = hindiVoice;
        speechSynthesis.speak(utterance);
    };

    renderGrid();

    // --- SPEECH TO SIGN FEATURE ---
    const micBtn = document.getElementById('micBtn');
    const micHint = document.getElementById('micHint');
    const transcriptDiv = document.getElementById('transcript');
    const islSeqRow = document.getElementById('islSeqRow');
    const avatarStage = document.getElementById('avatarStage');

    let recognition = null;
    let isListening = false;
    
    // Stop words to remove for ISL simplification
    const STOPWORDS = new Set(['a', 'an', 'the', 'is', 'are', 'am', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'to', 'of', 'in', 'on', 'at', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'from', 'up', 'down', 'out', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'only', 'own', 'same', 'so', 'than', 'too', 'very']);

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-IN';

        recognition.onstart = () => {
            isListening = true;
            micBtn.classList.add('listening');
            micHint.textContent = 'Listening... Speak now.';
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            transcriptDiv.textContent = `"${transcript}"`;
            processSpeechToISL(transcript);
        };

        recognition.onerror = (event) => {
            micHint.textContent = `Error: ${event.error}`;
            stopListening();
        };

        recognition.onend = () => {
            stopListening();
        };
    } else {
        micHint.textContent = 'Speech Recognition API not supported in this browser.';
        micBtn.disabled = true;
    }

    micBtn.onclick = () => {
        if (!recognition) return;
        if (isListening) {
            recognition.stop();
        } else {
            transcriptDiv.textContent = '';
            islSeqRow.innerHTML = '';
            avatarStage.innerHTML = '';
            recognition.start();
        }
    };

    function stopListening() {
        isListening = false;
        micBtn.classList.remove('listening');
        if (micHint.textContent.includes('Listening')) {
            micHint.textContent = 'Click to start listening...';
        }
    }

    function processSpeechToISL(text) {
        // Strip punctuation and split
        const cleanText = text.replace(/[.,?/#!$%^&*;:{}=\-_`~()]/g, "").trim().toLowerCase();
        const words = cleanText.split(/\s+/);
        
        // Remove stopwords and capitalize
        const islGloss = words
            .filter(w => w.length > 0 && !STOPWORDS.has(w))
            .map(w => w.toUpperCase());
            
        renderISLOutput(islGloss);
    }

    // 3 distinct pose variants cycled by word index
    const POSES = [
        // Pose 0: Arms down
        `<svg viewBox="0 0 96 120" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" fill="none">
            <circle cx="48" cy="30" r="12" fill="none"/>
            <line x1="48" y1="42" x2="48" y2="80"/>
            <line x1="48" y1="50" x2="30" y2="70"/>
            <line x1="48" y1="50" x2="66" y2="70"/>
            <line x1="48" y1="80" x2="35" y2="110"/>
            <line x1="48" y1="80" x2="61" y2="110"/>
        </svg>`,
        // Pose 1: Arms up
        `<svg viewBox="0 0 96 120" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" fill="none">
            <circle cx="48" cy="30" r="12" fill="none"/>
            <line x1="48" y1="42" x2="48" y2="80"/>
            <line x1="48" y1="50" x2="25" y2="35"/>
            <line x1="48" y1="50" x2="71" y2="35"/>
            <line x1="48" y1="80" x2="35" y2="110"/>
            <line x1="48" y1="80" x2="61" y2="110"/>
        </svg>`,
        // Pose 2: One arm pointing
        `<svg viewBox="0 0 96 120" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" fill="none">
            <circle cx="48" cy="30" r="12" fill="none"/>
            <line x1="48" y1="42" x2="48" y2="80"/>
            <line x1="48" y1="50" x2="25" y2="40"/>
            <line x1="48" y1="50" x2="75" y2="50"/>
            <line x1="48" y1="80" x2="35" y2="110"/>
            <line x1="48" y1="80" x2="61" y2="110"/>
        </svg>`
    ];

    function renderISLOutput(glossWords) {
        islSeqRow.innerHTML = '';
        avatarStage.innerHTML = '';
        
        if (glossWords.length === 0) {
            transcriptDiv.textContent += ' (No valid ISL signs identified)';
            return;
        }

        glossWords.forEach((word, index) => {
            // Chip
            const chip = document.createElement('div');
            chip.className = 'chip';
            chip.textContent = word;
            islSeqRow.appendChild(chip);

            // Avatar
            const poseIndex = index % POSES.length;
            const avatarBox = document.createElement('div');
            avatarBox.className = 'stick-avatar';
            avatarBox.innerHTML = `
                ${POSES[poseIndex]}
                <span class="avatar-label">${word}</span>
            `;
            avatarStage.appendChild(avatarBox);
        });
    }

    // --- CAMERA SIGN CAPTURE FEATURE (Real-time Continuous AI) ---
    const video = document.getElementById('video');
    const camOverlay = document.getElementById('camOverlay');
    const camStartBtn = document.getElementById('camStartBtn');
    const camStopBtn = document.getElementById('camStopBtn');
    const clearCamBtn = document.getElementById('clearCamBtn');
    const continuousResult = document.getElementById('continuousResult');
    const canvasElement = document.getElementById('output_canvas');
    const canvasCtx = canvasElement.getContext('2d');

    let camera = null;
    let lastDetectedSign = null;
    let framesHeld = 0;
    const HOLD_FRAMES_REQUIRED = 5; // Lowered to make it much more responsive on mobile
    
    let cameraSequence = []; // Store the detected words to form a sentence

    // Initialize voices for camera speech
    let camVoice = null;
    if (window.speechSynthesis) {
        speechSynthesis.onvoiceschanged = () => {
            const voices = speechSynthesis.getVoices();
            camVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('en'));
        };
    }

    // Step 1: Initialize MediaPipe Hands Model
    const hands = new Hands({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }});

    hands.setOptions({
        maxNumHands: 2, // Track up to 2 hands for ISL
        modelComplexity: 0,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6
    });

    // Helper function to calculate distance between two landmarks
    function getDist(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

    // Custom heuristic to classify ISL Alphabets based on 1 or 2 hands
    function classifyISLAlphabet(multiHandLandmarks) {
        if (!multiHandLandmarks || multiHandLandmarks.length === 0) return null;

        // --- TWO HANDED SIGNS ---
        if (multiHandLandmarks.length === 2) {
            const h1 = multiHandLandmarks[0];
            const h2 = multiHandLandmarks[1];
            
            // Check if both hands are generally upright
            const isH1Upright = h1[0].y > h1[9].y;
            const isH2Upright = h2[0].y > h2[9].y;
            
            // 'X' - Wrists crossed
            const wristDist = getDist(h1[0], h2[0]);
            if (wristDist < 0.15 && isH1Upright && isH2Upright) {
                return "X";
            }

            // 'A' - Fingertips touching at top (pyramid)
            const indexTipDist = getDist(h1[8], h2[8]);
            const middleTipDist = getDist(h1[12], h2[12]);
            if (indexTipDist < 0.1 && middleTipDist < 0.1 && isH1Upright && isH2Upright) {
                return "A";
            }
            
            // 'B' - Sides of hands touching, palms facing
            // We approximate this by checking if pinky bases (17) or index bases (5) are close
            const baseDist1 = getDist(h1[17], h2[17]);
            const baseDist2 = getDist(h1[5], h2[5]);
            if (baseDist1 < 0.15 || baseDist2 < 0.15) {
                return "B";
            }

            return null; // Don't fall back to 1-handed if 2 hands are visible but no match
        }

        // --- ONE HANDED SIGNS ---
        if (multiHandLandmarks.length === 1) {
            const landmarks = multiHandLandmarks[0];
            
            const isUpright = landmarks[0].y > landmarks[9].y;
            if (!isUpright) return null;

            let isIndexOpen = landmarks[8].y < landmarks[5].y;
            let isMiddleOpen = landmarks[12].y < landmarks[9].y;
            let isRingOpen = landmarks[16].y < landmarks[13].y;
            let isPinkyOpen = landmarks[20].y < landmarks[17].y;
            
            let thumbDist = Math.abs(landmarks[4].x - landmarks[9].x);
            let isThumbOut = thumbDist > 0.1;
            
            const openFingersCount = (isIndexOpen?1:0) + (isMiddleOpen?1:0) + (isRingOpen?1:0) + (isPinkyOpen?1:0);

            // 'O' - fingertips touching thumb
            const thumbToIndex = getDist(landmarks[4], landmarks[8]);
            const thumbToMiddle = getDist(landmarks[4], landmarks[12]);
            if (openFingersCount === 0 && thumbToIndex < 0.08 && thumbToMiddle < 0.08) {
                return "O";
            }

            // 'C' - curved shape (fingers somewhat open, thumb out, distance between thumb and index is moderate)
            if (isIndexOpen && isThumbOut && thumbToIndex > 0.1 && thumbToIndex < 0.3) {
                return "C";
            }

            // 'S' - Closed fist, thumb wrapped across front
            if (openFingersCount === 0 && !isThumbOut) {
                return "S";
            }
            
            // 'D' or 'L' (1 finger open)
            if (openFingersCount === 1 && isIndexOpen) {
                if (isThumbOut) {
                    return "L";
                } else {
                    return "D";
                }
            }
            
            // 'V' or 'U' (2 fingers open)
            if (openFingersCount === 2 && isIndexOpen && isMiddleOpen) {
                const distIndexMiddle = getDist(landmarks[8], landmarks[12]);
                if (distIndexMiddle > 0.05) {
                    return "V";
                } else {
                    return "U";
                }
            }
        }

        return null;
    }

    function speakText(text) {
        if (!window.speechSynthesis) return;
        const utterance = new SpeechSynthesisUtterance(text);
        if (camVoice) utterance.voice = camVoice;
        utterance.rate = 1.0;
        speechSynthesis.speak(utterance);
    }

    function handleCameraSign(letter) {
        continuousResult.innerHTML += letter;
        speakText(letter);
    }

    // Step 2: Handle the results and draw Skeleton
    hands.onResults((results) => {
        canvasElement.width = video.videoWidth;
        canvasElement.height = video.videoHeight;
        
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            
            // Draw skeleton for all detected hands
            for (const landmarks of results.multiHandLandmarks) {
                drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {color: '#E3A02C', lineWidth: 3});
                drawLandmarks(canvasCtx, landmarks, {color: '#D9614F', lineWidth: 2, radius: 3});
            }

            // Classify ISL Alphabet
            const currentSign = classifyISLAlphabet(results.multiHandLandmarks);
            
            if (currentSign) {
                if (currentSign === lastDetectedSign) {
                    framesHeld++;
                    if (framesHeld === HOLD_FRAMES_REQUIRED) {
                        handleCameraSign(currentSign);
                    }
                } else {
                    lastDetectedSign = currentSign;
                    framesHeld = 0;
                }
            } else {
                lastDetectedSign = null;
                framesHeld = 0;
            }

        } else {
            lastDetectedSign = null;
            framesHeld = 0;
        }
        canvasCtx.restore();
    });

    // Step 3: Start Camera
    camStartBtn.onclick = () => {
        camOverlay.textContent = 'Loading AI Model...';
        camStartBtn.disabled = true;

        camera = new Camera(video, {
            onFrame: async () => {
                await hands.send({image: video});
            },
            width: 640,
            height: 480
        });
        
        camera.start().then(() => {
            camOverlay.style.display = 'none';
            camStartBtn.style.display = 'none';
            camStopBtn.style.display = 'block';
        }).catch(err => {
            console.error("Camera error:", err);
            camOverlay.textContent = 'Error accessing camera';
            camOverlay.style.color = 'var(--coral)';
            camStartBtn.disabled = false;
        });
    };

    camStopBtn.onclick = () => {
        if (camera) {
            camera.stop();
            camOverlay.style.display = 'flex';
            camOverlay.textContent = 'camera off';
            camOverlay.style.color = 'var(--ink)';
            camStopBtn.style.display = 'none';
            camStartBtn.style.display = 'block';
            camStartBtn.disabled = false;
            
            // Clear canvas
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        }
    };

    clearCamBtn.onclick = () => {
        cameraSequence = [];
        continuousResult.innerHTML = '';
    };
});
