/* ==========================================================================
   AVA'S 19TH BIRTHDAY — 3D COSMIC APPLE TREE & VINTAGE BOTANICAL PORTAL (V6)
   Real Glowing 3D Apples · Zero CORS/Black Textures · Antique Parchment
   ========================================================================== */

// All 23 Pre-converted Memories (Full 4032x3024 / 3024x4032 Resolution)
const MEMORIES = [
    { id: 1,  url: 'photos/IMG_0476.jpg' },
    { id: 2,  url: 'photos/IMG_0592.jpg' },
    { id: 3,  url: 'photos/IMG_1043.jpg' },
    { id: 4,  url: 'photos/IMG_1594.jpg' },
    { id: 5,  url: 'photos/IMG_1738.jpg' },
    { id: 6,  url: 'photos/IMG_2516.jpg' },
    { id: 7,  url: 'photos/IMG_3126.jpg' },
    { id: 8,  url: 'photos/IMG_3848.jpg' },
    { id: 9,  url: 'photos/IMG_4260.jpg' },
    { id: 10, url: 'photos/IMG_4261.jpg' },
    { id: 11, url: 'photos/IMG_4474.jpg' },
    { id: 12, url: 'photos/IMG_5283.jpg' },
    { id: 13, url: 'photos/IMG_6006.jpg' },
    { id: 14, url: 'photos/IMG_7389.jpg' },
    { id: 15, url: 'photos/IMG_7418.jpg' },
    { id: 16, url: 'photos/IMG_7568.jpg' },
    { id: 17, url: 'photos/IMG_8126.jpg' },
    { id: 18, url: 'photos/IMG_8564.jpg' },
    { id: 19, url: 'photos/IMG_9122.jpg' },
    { id: 20, url: 'photos/IMG_9350.jpg' },
    { id: 21, url: 'photos/IMG_9569.jpg' },
    { id: 22, url: 'photos/IMG_9817.jpg' },
    { id: 23, url: 'photos/IMG_ORIGINAL.jpg' }
];

// App State
let currentPhotoIndex = 0;
let isLightboxActive = false;
let scene, camera, renderer, css2dRenderer, controls;
let treeGroup, appleObjects = [], leafPoints, fallingPetals, sharpStarTex;
let isRotating = true;
let isAudioPlaying = false;
let audioCtx = null;
let isOrbitDragging = false;
let pointerStartX = 0;
let pointerStartY = 0;

// ==========================================================================
// 1. CINEMATIC PRELOADER & INTERACTIVE ENTRANCE (100x Better)
// ==========================================================================
let entranceCanvasAnim = null;

function initEntranceCanvas() {
    const canvas = document.getElementById('entrance-stars-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        if (!document.getElementById('loading-screen')) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // 1. Warm Candlelight Embers & Fairy Light Particles
    const emberCount = 50;
    const embers = [];
    const emberColors = ['#ffe8a3', '#ffd56b', '#fef08a', '#fbcfe8', '#fed7aa'];
    for (let i = 0; i < emberCount; i++) {
        embers.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.2 + 0.8,
            vy: Math.random() * 0.35 + 0.15,
            vx: (Math.random() - 0.5) * 0.25,
            angle: Math.random() * Math.PI * 2,
            angleSpeed: (Math.random() - 0.5) * 0.02,
            alpha: Math.random() * 0.65 + 0.25,
            alphaSpeed: (Math.random() * 0.012 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
            color: emberColors[Math.floor(Math.random() * emberColors.length)]
        });
    }

    // 2. Gentle Drifting Watercolor Rose Petals (Organic Bezier Curvature)
    const petalCount = 20;
    const petals = [];
    const petalGradients = ['#9f1239', '#be123c', '#e11d48', '#fb7185', '#f43f5e'];
    for (let i = 0; i < petalCount; i++) {
        petals.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 7 + 5,
            scaleX: Math.random() * 0.3 + 0.7,
            scaleY: Math.random() * 0.4 + 0.8,
            vx: (Math.random() - 0.4) * 0.4,
            vy: Math.random() * 0.35 + 0.25,
            rot: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.018,
            swayAngle: Math.random() * Math.PI * 2,
            swaySpeed: Math.random() * 0.02 + 0.01,
            alpha: Math.random() * 0.45 + 0.3,
            color: petalGradients[Math.floor(Math.random() * petalGradients.length)]
        });
    }

    const sparkles = [];
    function addPointerSparkle(px, py) {
        for (let i = 0; i < 2; i++) {
            sparkles.push({
                x: px + (Math.random() - 0.5) * 12,
                y: py + (Math.random() - 0.5) * 12,
                vx: (Math.random() - 0.5) * 1.4,
                vy: (Math.random() - 0.5) * 1.4 - 0.3,
                radius: Math.random() * 1.8 + 0.6,
                alpha: 1,
                decay: Math.random() * 0.025 + 0.02,
                color: Math.random() > 0.5 ? '#ffd56b' : '#ffedd5'
            });
        }
    }

    window.addEventListener('mousemove', (e) => {
        addPointerSparkle(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
            addPointerSparkle(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    function draw() {
        const screen = document.getElementById('loading-screen');
        if (!screen || screen.style.display === 'none') return;

        ctx.clearRect(0, 0, width, height);

        // Draw ambient floating candle embers
        for (let i = 0; i < embers.length; i++) {
            const e = embers[i];
            e.y -= e.vy;
            e.angle += e.angleSpeed;
            e.x += Math.sin(e.angle) * 0.35 + e.vx;
            e.alpha += e.alphaSpeed;

            if (e.alpha > 0.9 || e.alpha < 0.2) e.alphaSpeed = -e.alphaSpeed;

            if (e.y < -10) {
                e.y = height + 10;
                e.x = Math.random() * width;
            }
            if (e.x < -10) e.x = width + 10;
            if (e.x > width + 10) e.x = -10;

            ctx.save();
            ctx.globalAlpha = Math.max(0, Math.min(1, e.alpha));
            ctx.fillStyle = e.color;
            ctx.shadowColor = e.color;
            ctx.shadowBlur = e.radius * 3.5;
            ctx.beginPath();
            ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // Draw gentle drifting organic rose petals
        for (let i = 0; i < petals.length; i++) {
            const p = petals[i];
            p.y += p.vy;
            p.swayAngle += p.swaySpeed;
            p.x += Math.sin(p.swayAngle) * 0.6 + p.vx;
            p.rot += p.rotSpeed;

            if (p.y > height + 25) {
                p.y = -25;
                p.x = Math.random() * width;
            }
            if (p.x < -25) p.x = width + 25;
            if (p.x > width + 25) p.x = -25;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.scale(p.scaleX, p.scaleY);
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.moveTo(0, -p.size);
            ctx.bezierCurveTo(p.size * 0.85, -p.size * 0.45, p.size * 0.75, p.size * 0.65, 0, p.size);
            ctx.bezierCurveTo(-p.size * 0.75, p.size * 0.65, -p.size * 0.85, -p.size * 0.45, 0, -p.size);
            ctx.fill();
            ctx.restore();
        }

        // Draw interactive cursor sparkles
        for (let i = sparkles.length - 1; i >= 0; i--) {
            const sp = sparkles[i];
            sp.x += sp.vx;
            sp.y += sp.vy;
            sp.alpha -= sp.decay;
            sp.radius *= 0.98;

            if (sp.alpha <= 0 || sp.radius < 0.3) {
                sparkles.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.globalAlpha = Math.max(0, sp.alpha);
            ctx.fillStyle = sp.color;
            ctx.shadowColor = sp.color;
            ctx.shadowBlur = sp.radius * 3;
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        entranceCanvasAnim = requestAnimationFrame(draw);
    }

    draw();
}

let photoBasePath = 'photos/';

function detectPhotoLocation() {
    return new Promise((resolve) => {
        const probeImg = new Image();
        let settled = false;
        const finish = (isSubfolder) => {
            if (settled) return;
            settled = true;
            if (!isSubfolder) {
                photoBasePath = '';
                MEMORIES.forEach(m => {
                    m.url = m.url.replace(/^photos\//, '');
                });
            }
            resolve(photoBasePath);
        };
        probeImg.onload = () => finish(true);
        probeImg.onerror = () => finish(false);
        setTimeout(() => finish(true), 1500);
        probeImg.src = 'photos/IMG_0476.jpg';
    });
}

async function initPreloader() {
    initEntranceCanvas();

    // Dynamically adapt whether photos are in photos/ folder or in repository root
    await detectPhotoLocation();

    // Check parchment background image location as well
    const probeParchment = new Image();
    probeParchment.onerror = () => {
        document.querySelectorAll('.antique-parchment, .envelope-letter-peek').forEach(el => {
            el.style.backgroundImage = "url('parchment_bg.jpg')";
        });
    };
    probeParchment.src = 'assets/parchment_bg.jpg';

    const lineFill = document.getElementById('loader-line-fill');
    const progressWrap = document.getElementById('loader-progress-wrap');
    const enterBtn = document.getElementById('enter-btn');

    let loadedCount = 0;
    const total = MEMORIES.length;
    const startTime = Date.now();

    const preloadPromises = MEMORIES.map((m) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = img.onerror = () => {
                loadedCount++;
                const p = Math.round((loadedCount / total) * 100);
                if (lineFill) lineFill.style.width = p + '%';
                resolve();
            };
            img.src = m.url;
        });
    });

    await Promise.all(preloadPromises);

    // Smooth minimum time so the transition is graceful and cinematic
    const elapsed = Date.now() - startTime;
    const minWait = Math.max(0, 400 - elapsed);

    setTimeout(() => {
        if (lineFill) lineFill.style.width = '100%';

        setTimeout(() => {
            if (progressWrap) {
                progressWrap.style.opacity = '0';
                progressWrap.style.transform = 'scale(0.96)';
                setTimeout(() => {
                    progressWrap.style.display = 'none';
                }, 300);
            }

            if (enterBtn) {
                enterBtn.classList.remove('hidden');
                enterBtn.style.opacity = '1';
                enterBtn.style.transform = 'none';
                enterBtn.addEventListener('click', enterUniverse);
            }
        }, 250);
    }, minWait);
}

function enterUniverse() {
    const loader = document.getElementById('loading-screen');
    if (loader) {
        loader.style.opacity = '0';
        loader.style.transform = 'scale(1.05)';
        setTimeout(() => {
            loader.style.display = 'none';
            if (entranceCanvasAnim) cancelAnimationFrame(entranceCanvasAnim);
        }, 1100);
    }

    // Start romantic ambient audio on user entrance
    toggleMusic(true);

    initGalaxyTree();
}

// ==========================================================================
// 2. ROMANTIC AMBIENT AUDIO (Web Audio API)
// ==========================================================================
function toggleMusic(forcePlay = null) {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    if (forcePlay !== null) {
        isAudioPlaying = forcePlay;
    } else {
        isAudioPlaying = !isAudioPlaying;
    }

    const label = document.getElementById('music-label');
    const btn = document.getElementById('music-toggle');

    if (isAudioPlaying) {
        if (label) label.textContent = 'Audio: On';
        if (btn) btn.classList.add('playing');
        startAmbientHarmony();
    } else {
        if (label) label.textContent = 'Audio: Off';
        if (btn) btn.classList.remove('playing');
        stopAmbientHarmony();
    }
}

let ambientInterval = null;
function startAmbientHarmony() {
    if (ambientInterval) return;

    const chords = [
        [277.18, 349.23, 415.30, 554.37],
        [293.66, 369.99, 440.00, 587.33],
        [246.94, 329.63, 392.00, 493.88],
        [220.00, 277.18, 329.63, 440.00]
    ];
    let chordIdx = 0;

    function playSoftChord() {
        if (!isAudioPlaying || !audioCtx) return;
        const now = audioCtx.currentTime;
        const chord = chords[chordIdx % chords.length];
        chordIdx++;

        chord.forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = i === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, now + i * 0.15);

            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.exponentialRampToValueAtTime(0.02, now + 1.2 + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(now + i * 0.15);
            osc.stop(now + 6.0);
        });
    }

    playSoftChord();
    ambientInterval = setInterval(playSoftChord, 4800);
}

function stopAmbientHarmony() {
    if (ambientInterval) {
        clearInterval(ambientInterval);
        ambientInterval = null;
    }
}

// ==========================================================================
// 3. SHARP DIAMOND STARBURST TEXTURE (ZERO BLUR)
// ==========================================================================
function getSharpStarTexture() {
    if (sharpStarTex) return sharpStarTex;

    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const cx = 64, cy = 64;

    // Glowing core
    const rad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 54);
    rad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    rad.addColorStop(0.2, 'rgba(255, 255, 255, 0.9)');
    rad.addColorStop(0.5, 'rgba(244, 114, 182, 0.45)');
    rad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = rad;
    ctx.beginPath();
    ctx.arc(cx, cy, 54, 0, Math.PI * 2);
    ctx.fill();

    // Sharp crossbeams
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.beginPath();
    ctx.moveTo(cx, cy - 56);
    ctx.quadraticCurveTo(cx, cy, cx + 56, cy);
    ctx.quadraticCurveTo(cx, cy, cx, cy + 56);
    ctx.quadraticCurveTo(cx, cy, cx - 56, cy);
    ctx.quadraticCurveTo(cx, cy, cx, cy - 56);
    ctx.fill();

    sharpStarTex = new THREE.CanvasTexture(canvas);
    sharpStarTex.minFilter = THREE.LinearFilter;
    sharpStarTex.magFilter = THREE.LinearFilter;
    return sharpStarTex;
}

// ==========================================================================
// 4. THREE.JS 3D SAKURA / APPLE TREE (WebGL + CSS2D)
// ==========================================================================
function initGalaxyTree() {
    const container = document.getElementById('three-container');
    if (!container || renderer) return;

    // 1. Three.js Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020008);
    scene.fog = new THREE.FogExp2(0x020008, 0.0018);

    // 2. Camera
    camera = new THREE.PerspectiveCamera(46, window.innerWidth / window.innerHeight, 0.5, 3000);
    camera.position.set(0, 46, 170);

    // 3. WebGL Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    // 4. CSS2D Renderer for Glowing 3D Apples (Zero CORS issues, 100% sharp!)
    css2dRenderer = new THREE.CSS2DRenderer();
    css2dRenderer.setSize(window.innerWidth, window.innerHeight);
    css2dRenderer.domElement.style.position = 'absolute';
    css2dRenderer.domElement.style.top = '0px';
    css2dRenderer.domElement.style.left = '0px';
    css2dRenderer.domElement.style.pointerEvents = 'none';
    container.appendChild(css2dRenderer.domElement);

    // 5. Orbit Controls (Bound to WebGL canvas for silky smooth 360° mouse & touch rotation)
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.minDistance = 35;
    controls.maxDistance = 320;
    controls.maxPolarAngle = Math.PI / 2 + 0.05;
    controls.target.set(0, 42, 0);

    // Pointer drag vs click discriminator (never trigger photos when rotating tree)
    window.addEventListener('pointerdown', (e) => {
        pointerStartX = e.clientX;
        pointerStartY = e.clientY;
        isOrbitDragging = false;
    }, { passive: true });

    window.addEventListener('pointermove', (e) => {
        if (Math.hypot(e.clientX - pointerStartX, e.clientY - pointerStartY) > 6) {
            isOrbitDragging = true;
        }
    }, { passive: true });

    // 6. Build Environment & Apple Tree
    createStarryCosmos();
    createCosmicSpiralRing();
    createOrganicAppleTree();
    populateApplesOnTree();
    createFallingStardustPetals();
    populateMemoryStrip();

    // 7. Lighting
    const ambient = new THREE.AmbientLight(0x2d1848, 1.5);
    scene.add(ambient);

    const treeLight = new THREE.PointLight(0xf43f5e, 3.8, 200, 1.2);
    treeLight.position.set(0, 46, 0);
    scene.add(treeLight);

    const celestialRim = new THREE.PointLight(0x38bdf8, 2.5, 240, 1.4);
    celestialRim.position.set(65, 85, -60);
    scene.add(celestialRim);

    window.addEventListener('resize', onWindowResize);
    setupTreeControls();

    requestAnimationFrame(renderLoop);
}

// Deep Space Stars
function createStarryCosmos() {
    const count = 3500;
    const geom = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        const r = 400 + Math.random() * 1300;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);

        const rand = Math.random();
        if (rand < 0.6) {
            col[i * 3] = 1.0; col[i * 3 + 1] = 0.95; col[i * 3 + 2] = 1.0;
        } else if (rand < 0.85) {
            col[i * 3] = 0.98; col[i * 3 + 1] = 0.65; col[i * 3 + 2] = 0.88;
        } else {
            col[i * 3] = 0.72; col[i * 3 + 1] = 0.82; col[i * 3 + 2] = 1.0;
        }
    }

    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const mat = new THREE.PointsMaterial({
        size: 2.5,
        map: getSharpStarTexture(),
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    scene.add(new THREE.Points(geom, mat));
}

// Stardust Floor Halo
function createCosmicSpiralRing() {
    const count = 1600;
    const geom = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 10 + Math.random() * 95;
        const spread = (Math.random() - 0.5) * 5;

        pos[i * 3]     = Math.cos(angle) * radius;
        pos[i * 3 + 1] = spread - 2;
        pos[i * 3 + 2] = Math.sin(angle) * radius;

        const ratio = radius / 105;
        col[i * 3]     = 0.98 - ratio * 0.35;
        col[i * 3 + 1] = 0.45 + ratio * 0.2;
        col[i * 3 + 2] = 0.85;
    }

    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const mat = new THREE.PointsMaterial({
        size: 2.2,
        map: getSharpStarTexture(),
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    scene.add(new THREE.Points(geom, mat));
}

// Organic Ancient Apple Tree Architecture (Warm Bark, Natural Roots & Splines)
function createOrganicAppleTree() {
    treeGroup = new THREE.Group();
    scene.add(treeGroup);

    // Warm dark mahogany wood with subtle glowing amber veins
    const barkMaterial = new THREE.MeshStandardMaterial({
        color: 0x24140b,
        emissive: 0x1c0d04,
        emissiveIntensity: 0.9,
        roughness: 0.65,
        metalness: 0.1
    });

    function addSmoothBranch(points, radius) {
        const curve = new THREE.CatmullRomCurve3(points);
        const geom = new THREE.TubeGeometry(curve, 24, radius, 12, false);
        const mesh = new THREE.Mesh(geom, barkMaterial);
        treeGroup.add(mesh);
    }

    // Flaring Organic Roots spreading naturally along the stardust soil
    const rootCount = 6;
    for (let r = 0; r < rootCount; r++) {
        const rootAngle = (r / rootCount) * Math.PI * 2 + 0.35;
        const rx = Math.cos(rootAngle) * 15;
        const rz = Math.sin(rootAngle) * 15;
        addSmoothBranch([
            new THREE.Vector3(rx * 0.25, 1.0, rz * 0.25),
            new THREE.Vector3(rx * 0.65, -0.6, rz * 0.65),
            new THREE.Vector3(rx, -2.0, rz)
        ], 1.6);
    }

    // Main Trunk (Naturally tapered rising from base to crown)
    addSmoothBranch([
        new THREE.Vector3(0, -2, 0),
        new THREE.Vector3(0.8, 10, -0.5),
        new THREE.Vector3(-0.5, 22, 0.6),
        new THREE.Vector3(0, 36, 0)
    ], 5.0);

    // 12 Organic Boughs Spreading in 360 Degrees
    const boughs = 12;
    for (let b = 0; b < boughs; b++) {
        const angle = (b / boughs) * Math.PI * 2 + (b % 2) * 0.2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        // Major bough
        const start = new THREE.Vector3(0, 35, 0);
        const mid = new THREE.Vector3(cos * 22, 47 + (b % 3) * 4, sin * 22);
        const end = new THREE.Vector3(cos * 46, 52 + (b % 4) * 5, sin * 46);
        addSmoothBranch([start, mid, end], 2.2);

        // Secondary branchlets spreading into canopy
        const weep1 = new THREE.Vector3(cos * 62 + sin * 12, 45, sin * 62 - cos * 12);
        addSmoothBranch([end, new THREE.Vector3(cos * 54, 50, sin * 54), weep1], 1.1);

        const weep2 = new THREE.Vector3(cos * 56 - sin * 14, 39, sin * 56 + cos * 14);
        addSmoothBranch([end, new THREE.Vector3(cos * 50, 46, sin * 50), weep2], 0.9);
    }

    // Lush Apple Tree Canopy (Emerald Green, Gold & Soft Rose Starlight)
    const leafCount = 5200;
    const leafGeom = new THREE.BufferGeometry();
    const leafPositions = new Float32Array(leafCount * 3);
    const leafColors = new Float32Array(leafCount * 3);

    for (let i = 0; i < leafCount; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 24 + Math.pow(Math.random(), 0.7) * 56;

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = 37 + Math.abs(r * Math.cos(phi)) * 0.95 - (r > 42 ? (r - 42) * 0.22 : 0);
        const z = r * Math.sin(phi) * Math.sin(theta);

        leafPositions[i * 3]     = x;
        leafPositions[i * 3 + 1] = y;
        leafPositions[i * 3 + 2] = z;

        const rand = Math.random();
        if (rand < 0.5) {
            // Fresh Cosmic Emerald
            leafColors[i * 3] = 0.15; leafColors[i * 3 + 1] = 0.85; leafColors[i * 3 + 2] = 0.45;
        } else if (rand < 0.8) {
            // Golden Apple Stardust
            leafColors[i * 3] = 0.98; leafColors[i * 3 + 1] = 0.82; leafColors[i * 3 + 2] = 0.35;
        } else {
            // Soft Rose Starlight
            leafColors[i * 3] = 1.0; leafColors[i * 3 + 1] = 0.45; leafColors[i * 3 + 2] = 0.65;
        }
    }

    leafGeom.setAttribute('position', new THREE.BufferAttribute(leafPositions, 3));
    leafGeom.setAttribute('color', new THREE.BufferAttribute(leafColors, 3));

    const leafMaterial = new THREE.PointsMaterial({
        size: 2.4,
        map: getSharpStarTexture(),
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        depthWrite: false
    });

    leafPoints = new THREE.Points(leafGeom, leafMaterial);
    treeGroup.add(leafPoints);
}

// Falling Golden Starlight Petals
function createFallingStardustPetals() {
    const count = 350;
    const geom = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const vels = [];

    for (let i = 0; i < count; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * 110;
        pos[i * 3 + 1] = 10 + Math.random() * 70;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 110;

        vels.push({
            vy: 0.15 + Math.random() * 0.25,
            vx: (Math.random() - 0.5) * 0.1,
            vz: (Math.random() - 0.5) * 0.1,
            phase: Math.random() * Math.PI * 2
        });
    }

    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({
        size: 2.0,
        color: 0xfcd34d,
        map: getSharpStarTexture(),
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    fallingPetals = new THREE.Points(geom, mat);
    fallingPetals.userData = { vels };
    scene.add(fallingPetals);
}

// ==========================================================================
// 5. 23 GLOWING REALISTIC COSMIC APPLES (CSS2D - ZERO CORS/NO BLACK)
// ==========================================================================
function populateApplesOnTree() {
    appleObjects = [];
    const total = MEMORIES.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    MEMORIES.forEach((memory, i) => {
        let angle, radius, y;
        if (i < 7) {
            // Tier 1: High Canopy (7 apples)
            angle = (i / 7) * 2 * Math.PI + 0.25;
            radius = 38 + (i % 2) * 8;
            y = 56 + (i % 3) * 4;
        } else if (i < 16) {
            // Tier 2: Mid Canopy (9 apples)
            angle = ((i - 7) / 9) * 2 * Math.PI + 0.65;
            radius = 52 + (i % 3) * 6;
            y = 44 + (i % 3) * 3;
        } else {
            // Tier 3: Weeping Outer Boughs (7 apples)
            angle = ((i - 16) / 7) * 2 * Math.PI + 1.15;
            radius = 62 + (i % 2) * 8;
            y = 32 + (i % 3) * 4;
        }

        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        // Outer Anchor for CSS2DRenderer (positions in 3D without CSS transition conflicts)
        const appleAnchor = document.createElement('div');
        appleAnchor.className = 'tree-apple-anchor';

        // Inner Card for Realistic Apple Visuals, Hover Scale, and Breeze Sway
        const appleCard = document.createElement('div');
        appleCard.className = 'apple-wrapper';
        appleCard.setAttribute('data-id', memory.id);
        appleCard.innerHTML = `
            <div class="apple-stem"></div>
            <div class="apple-leaf"></div>
            <div class="apple-body">
                <div class="apple-specular"></div>
                <div class="apple-photo-frame">
                    <img src="${memory.url}" alt="Memory ${memory.id}" loading="eager">
                </div>
            </div>
            <div class="apple-tag">${String(memory.id).padStart(2, '0')}</div>
        `;

        appleAnchor.appendChild(appleCard);

        // Click on Apple opens Lightbox (Ignored if dragging/rotating 360°)
        appleCard.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isOrbitDragging) return;
            openLightbox(i);
        });

        // Wrap as Three.js CSS2DObject
        const apple2D = new THREE.CSS2DObject(appleAnchor);
        apple2D.position.set(x, y, z);

        // Elegant Golden Starlight Filament suspending the apple from branch
        const filamentGeom = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(x, y + 8, z),
            new THREE.Vector3(x * 0.92, y + 18, z * 0.92)
        ]);
        const filamentMat = new THREE.LineBasicMaterial({
            color: 0xfbbf24,
            transparent: true,
            opacity: 0.55
        });
        treeGroup.add(new THREE.Line(filamentGeom, filamentMat));

        // Add to tree
        treeGroup.add(apple2D);

        appleObjects.push({
            obj: apple2D,
            baseY: y,
            phase: Math.random() * Math.PI * 2
        });
    });
}

function setupTreeControls() {
    const rotateBtn = document.getElementById('toggle-rotate');
    const resetBtn = document.getElementById('reset-cam');
    const deckBtn = document.getElementById('toggle-deck');
    const deck = document.getElementById('memory-dock');

    if (rotateBtn) {
        rotateBtn.addEventListener('click', () => {
            isRotating = !isRotating;
            controls.autoRotate = isRotating;
            rotateBtn.classList.toggle('active', isRotating);
            const lbl = document.getElementById('rotate-label');
            if (lbl) lbl.textContent = isRotating ? 'Rotate' : 'Paused';
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            camera.position.set(0, 46, 170);
            controls.target.set(0, 42, 0);
            controls.autoRotate = true;
            if (rotateBtn) {
                rotateBtn.classList.add('active');
                const lbl = document.getElementById('rotate-label');
                if (lbl) lbl.textContent = 'Rotate';
            }
        });
    }

    if (deckBtn && deck) {
        deckBtn.addEventListener('click', () => {
            deck.classList.toggle('hidden');
        });
    }
}

function populateMemoryStrip() {
    const strip = document.getElementById('dock-scroll');
    if (!strip) return;

    strip.innerHTML = '';
    MEMORIES.forEach((m, idx) => {
        const item = document.createElement('div');
        item.className = 'strip-item';
        item.innerHTML = `
            <img src="${m.url}" alt="Memory" loading="lazy">
            <span class="strip-item-idx">${String(m.id).padStart(2, '0')}</span>
        `;
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(idx);
        });
        strip.appendChild(item);
    });
}

// 60FPS Render Loop
let clock = new THREE.Clock();
function renderLoop() {
    requestAnimationFrame(renderLoop);

    if (!document.getElementById('galaxy-tree').classList.contains('active')) {
        return;
    }

    const elapsed = clock.getElapsedTime();
    controls.update();

    // Gentle floating bob for apples
    appleObjects.forEach((item) => {
        const offset = Math.sin(elapsed * 1.5 + item.phase) * 0.6;
        item.obj.position.y = item.baseY + offset;
    });

    // Gentle twinkle for sharp canopy points
    if (leafPoints) {
        leafPoints.rotation.y = elapsed * 0.012;
    }

    // Drifting stardust petals
    if (fallingPetals) {
        const pos = fallingPetals.geometry.attributes.position.array;
        const vels = fallingPetals.userData.vels;
        for (let i = 0; i < vels.length; i++) {
            pos[i * 3 + 1] -= vels[i].vy;
            pos[i * 3]     += Math.sin(elapsed + vels[i].phase) * 0.08;
            pos[i * 3 + 2] += Math.cos(elapsed + vels[i].phase) * 0.08;

            if (pos[i * 3 + 1] < -2) {
                pos[i * 3 + 1] = 68;
                pos[i * 3]     = (Math.random() - 0.5) * 110;
                pos[i * 3 + 2] = (Math.random() - 0.5) * 110;
            }
        }
        fallingPetals.geometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
    if (css2dRenderer) {
        css2dRenderer.render(scene, camera);
    }
}

function onWindowResize() {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (css2dRenderer) {
        css2dRenderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// ==========================================================================
// 6. PAGE 2: PHOTO WALL (Uncropped Full Resolution)
// ==========================================================================
let galleryBuilt = false;
function buildGallery() {
    if (galleryBuilt) return;
    galleryBuilt = true;

    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    grid.innerHTML = '';
    MEMORIES.forEach((m, idx) => {
        const cell = document.createElement('div');
        cell.className = 'gallery-cell';
        cell.innerHTML = `
            <div class="cell-visual">
                <img src="${m.url}" alt="Memory" loading="lazy">
            </div>
            <div class="cell-caption">
                <span class="cell-number">MEMORY #${String(m.id).padStart(2, '0')}</span>
                <span class="cell-view-hint">View</span>
            </div>
        `;
        cell.addEventListener('click', () => {
            openLightbox(idx);
        });
        grid.appendChild(cell);
    });
}

// ==========================================================================
// 7. PAGE 3: ANTIQUE PARCHMENT LETTER & REALISTIC BOTANICAL ROSES
// ==========================================================================
let letterAmbientAnim = null;
function initLetterAmbientCanvas() {
    const canvas = document.getElementById('letter-ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        const page = document.getElementById('birthday-letter');
        if (!page || page.classList.contains('hidden')) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const emberColors = ['#ffd56b', '#ffe8a3', '#fef08a', '#fbcfe8', '#fed7aa'];
    const embers = [];
    for (let i = 0; i < 42; i++) {
        embers.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.2 + 0.8,
            vy: Math.random() * 0.35 + 0.15,
            vx: (Math.random() - 0.5) * 0.25,
            angle: Math.random() * Math.PI * 2,
            angleSpeed: (Math.random() - 0.5) * 0.02,
            alpha: Math.random() * 0.65 + 0.25,
            alphaSpeed: (Math.random() * 0.012 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
            color: emberColors[Math.floor(Math.random() * emberColors.length)]
        });
    }

    const petalGradients = ['#9f1239', '#be123c', '#e11d48', '#fb7185', '#f43f5e'];
    const petals = [];
    for (let i = 0; i < 16; i++) {
        petals.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 7 + 5,
            scaleX: Math.random() * 0.3 + 0.7,
            scaleY: Math.random() * 0.4 + 0.8,
            vx: (Math.random() - 0.4) * 0.4,
            vy: Math.random() * 0.35 + 0.25,
            rot: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.018,
            swayAngle: Math.random() * Math.PI * 2,
            swaySpeed: Math.random() * 0.02 + 0.01,
            alpha: Math.random() * 0.45 + 0.25,
            color: petalGradients[Math.floor(Math.random() * petalGradients.length)]
        });
    }

    function draw() {
        const page = document.getElementById('birthday-letter');
        if (!page || page.classList.contains('hidden')) return;

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < embers.length; i++) {
            const e = embers[i];
            e.y -= e.vy;
            e.angle += e.angleSpeed;
            e.x += Math.sin(e.angle) * 0.35 + e.vx;
            e.alpha += e.alphaSpeed;

            if (e.alpha > 0.85 || e.alpha < 0.2) e.alphaSpeed = -e.alphaSpeed;

            if (e.y < -10) { e.y = height + 10; e.x = Math.random() * width; }
            if (e.x < -10) e.x = width + 10;
            if (e.x > width + 10) e.x = -10;

            ctx.save();
            ctx.globalAlpha = Math.max(0, Math.min(1, e.alpha));
            ctx.fillStyle = e.color;
            ctx.shadowColor = e.color;
            ctx.shadowBlur = e.radius * 3.5;
            ctx.beginPath();
            ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        for (let i = 0; i < petals.length; i++) {
            const p = petals[i];
            p.y += p.vy;
            p.swayAngle += p.swaySpeed;
            p.x += Math.sin(p.swayAngle) * 0.6 + p.vx;
            p.rot += p.rotSpeed;

            if (p.y > height + 25) { p.y = -25; p.x = Math.random() * width; }
            if (p.x < -25) p.x = width + 25;
            if (p.x > width + 25) p.x = -25;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.scale(p.scaleX, p.scaleY);
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.moveTo(0, -p.size);
            ctx.bezierCurveTo(p.size * 0.85, -p.size * 0.45, p.size * 0.75, p.size * 0.65, 0, p.size);
            ctx.bezierCurveTo(-p.size * 0.75, p.size * 0.65, -p.size * 0.85, -p.size * 0.45, 0, -p.size);
            ctx.fill();
            ctx.restore();
        }

        letterAmbientAnim = requestAnimationFrame(draw);
    }

    if (letterAmbientAnim) cancelAnimationFrame(letterAmbientAnim);
    draw();
}

let isEnvelopeOpening = false;

function playSealCrackSound() {
    try {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
        }
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const now = audioCtx.currentTime;
        // Warm resonant C Major arpeggio shimmer when unsealing
        const frequencies = [523.25, 659.25, 783.99, 1046.50];
        frequencies.forEach((freq, idx) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.07);

            gain.gain.setValueAtTime(0.001, now + idx * 0.07);
            gain.gain.exponentialRampToValueAtTime(0.025, now + idx * 0.07 + 0.04);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 1.2);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(now + idx * 0.07);
            osc.stop(now + idx * 0.07 + 1.3);
        });
    } catch (e) {}
}

function setupLetterInteraction() {
    const sealBtn = document.getElementById('seal-btn');
    const envelopeBox = document.getElementById('envelope-box');
    const envelopeFlap = document.getElementById('envelope-flap');
    const letterPeek = document.getElementById('letter-peek');
    const envWrapper = document.getElementById('envelope-wrapper');
    const cardContainer = document.getElementById('letter-card-container');
    const cakeBtn = document.getElementById('cake-btn');
    const cakeModal = document.getElementById('cake-modal');
    const closeCakeBtn = document.getElementById('close-cake-btn');
    const closeModalBackdrop = document.getElementById('close-modal-backdrop');
    const refoldBtn = document.getElementById('refold-letter-btn');

    function openEnvelopeSequence() {
        if (isEnvelopeOpening) return;
        isEnvelopeOpening = true;

        playSealCrackSound();

        // 1. Crack the 3D wax seal with realistic split
        if (sealBtn) sealBtn.classList.add('cracked');

        // 2. Realistic 3D flip open of triangular flap
        setTimeout(() => {
            if (envelopeFlap) envelopeFlap.classList.add('open');
        }, 220);

        // 3. Slide the folded parchment letter upward out of the pocket
        setTimeout(() => {
            if (letterPeek) letterPeek.classList.add('slide-out');
        }, 580);

        // 4. Envelope gently dissolves into the candlelit atmosphere
        setTimeout(() => {
            if (envWrapper) {
                envWrapper.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
                envWrapper.style.opacity = '0';
                envWrapper.style.transform = 'translateY(24px) scale(0.94)';
            }
        }, 1180);

        // 5. Full parchment letter unfolds in 3D
        setTimeout(() => {
            if (envWrapper) envWrapper.style.display = 'none';
            if (cardContainer) {
                cardContainer.classList.remove('hidden');
                cardContainer.classList.add('unfolded');
            }
        }, 1600);
    }

    if (sealBtn) {
        sealBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openEnvelopeSequence();
        });
    }

    if (envelopeBox) {
        envelopeBox.addEventListener('click', openEnvelopeSequence);
    }

    // Re-folding the letter back into the envelope
    if (refoldBtn) {
        refoldBtn.addEventListener('click', () => {
            if (cardContainer) {
                cardContainer.classList.remove('unfolded');
                cardContainer.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                cardContainer.style.opacity = '0';
                cardContainer.style.transform = 'translateY(30px) scale(0.95)';
            }

            setTimeout(() => {
                if (cardContainer) {
                    cardContainer.classList.add('hidden');
                    cardContainer.style.opacity = '';
                    cardContainer.style.transform = '';
                }

                if (sealBtn) sealBtn.classList.remove('cracked');
                if (envelopeFlap) envelopeFlap.classList.remove('open');
                if (letterPeek) letterPeek.classList.remove('slide-out');

                if (envWrapper) {
                    envWrapper.style.display = 'flex';
                    requestAnimationFrame(() => {
                        envWrapper.style.opacity = '1';
                        envWrapper.style.transform = 'none';
                        isEnvelopeOpening = false;
                    });
                }
            }, 420);
        });
    }

    if (cakeBtn && cakeModal) {
        cakeBtn.addEventListener('click', () => {
            cakeModal.classList.remove('hidden');
            triggerRosePetalsBurst({ count: 50, fromTop: true });
        });
    }

    function hideCakeModal() {
        if (cakeModal) cakeModal.classList.add('hidden');
    }

    if (closeCakeBtn) closeCakeBtn.addEventListener('click', hideCakeModal);
    if (closeModalBackdrop) closeModalBackdrop.addEventListener('click', hideCakeModal);
}

// Romantic Curved Rose Petals & Gold Shimmer Burst (Zero Emoji)
let confettiRunning = false;
let confettiList = [];

function triggerRosePetalsBurst(opts = {}) {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    const count = opts.count || 28;
    const petalColors = ['#9f1239', '#be123c', '#e11d48', '#f43f5e', '#fb7185', '#ffd700'];

    if (opts.fromTop) {
        for (let i = 0; i < count; i++) {
            confettiList.push({
                x: Math.random() * window.innerWidth,
                y: -15 - Math.random() * 40,
                vx: (Math.random() - 0.5) * 2,
                vy: Math.random() * 2.2 + 1.2,
                size: Math.random() * 8 + 5,
                color: petalColors[Math.floor(Math.random() * petalColors.length)],
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.08,
                swayAngle: Math.random() * Math.PI * 2,
                swaySpeed: Math.random() * 0.03 + 0.015,
                alpha: 1
            });
        }
    } else {
        const originX = opts.x !== undefined ? opts.x : window.innerWidth / 2;
        const originY = opts.y !== undefined ? opts.y : window.innerHeight * 0.5;
        const isOutward = opts.isOutward !== false;

        for (let i = 0; i < count; i++) {
            const side = (i % 2 === 0) ? -1 : 1;
            const speed = Math.random() * 6 + 4;

            confettiList.push({
                x: originX + (Math.random() - 0.5) * 30,
                y: originY + (Math.random() - 0.5) * 20,
                vx: side * (Math.random() * 6 + 3),
                vy: -(Math.random() * 6 + 3),
                size: Math.random() * 7 + 5,
                color: petalColors[Math.floor(Math.random() * petalColors.length)],
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.12,
                swayAngle: Math.random() * Math.PI * 2,
                swaySpeed: Math.random() * 0.03 + 0.015,
                alpha: 1
            });
        }
    }

    if (!confettiRunning) {
        confettiRunning = true;
        animateRosePetals(ctx, canvas);
    }
}

function animateRosePetals(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiList = confettiList.filter(p => p.y < canvas.height + 30 && p.alpha > 0);

    confettiList.forEach(p => {
        p.swayAngle += p.swaySpeed;
        p.x += p.vx + Math.sin(p.swayAngle) * 0.7;
        p.y += p.vy;
        p.vy += 0.14;
        p.vx *= 0.97;
        p.rotation += p.rotSpeed;
        p.alpha -= 0.0035;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.alpha);

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.85, -p.size * 0.45, p.size * 0.75, p.size * 0.65, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.75, p.size * 0.65, -p.size * 0.85, -p.size * 0.45, 0, -p.size);
        ctx.fill();

        ctx.restore();
    });

    if (confettiList.length > 0) {
        requestAnimationFrame(() => animateRosePetals(ctx, canvas));
    } else {
        confettiRunning = false;
    }
}

// ==========================================================================
// 8. FULLSCREEN LIGHTBOX (ZERO RE-OPEN TRAP, 100% UNCROPPED)
// ==========================================================================
function setupLightbox() {
    const lb = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lb-close');
    const prevBtn = document.getElementById('lb-prev');
    const nextBtn = document.getElementById('lb-next');
    const backdrop = document.getElementById('lb-backdrop');

    function handleClose(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        closeLightbox();
    }

    if (closeBtn) closeBtn.addEventListener('click', handleClose);
    if (backdrop) backdrop.addEventListener('click', handleClose);

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox(-1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox(1);
        });
    }

    window.addEventListener('keydown', (e) => {
        if (isLightboxActive) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        }
    });
}

function openLightbox(index) {
    currentPhotoIndex = index;
    isLightboxActive = true;
    if (controls) controls.enabled = false;

    const memory = MEMORIES[index];
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lb-img');
    const counter = document.getElementById('lb-counter');

    if (img) img.src = memory.url;
    if (counter) counter.textContent = `${String(memory.id).padStart(2, '0')} / ${MEMORIES.length}`;

    if (lb) lb.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    isLightboxActive = false;
    if (controls) controls.enabled = true;
    const lb = document.getElementById('lightbox');
    if (lb) lb.classList.add('hidden');
    document.body.style.overflow = '';
}

function navigateLightbox(dir) {
    currentPhotoIndex = (currentPhotoIndex + dir + MEMORIES.length) % MEMORIES.length;
    const memory = MEMORIES[currentPhotoIndex];
    const img = document.getElementById('lb-img');
    const counter = document.getElementById('lb-counter');

    if (img) {
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = memory.url;
            img.style.opacity = '1';
        }, 120);
    }

    if (counter) counter.textContent = `${String(memory.id).padStart(2, '0')} / ${MEMORIES.length}`;
}

// ==========================================================================
// 9. NAVIGATION
// ==========================================================================
function navigateToPage(pageId) {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(b => {
        if (b.getAttribute('data-page') === pageId) b.classList.add('active');
        else b.classList.remove('active');
    });

    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        page.classList.add('hidden');
    });

    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.remove('hidden');
        activePage.classList.add('active');
    }

    if (pageId === 'gallery') {
        buildGallery();
    } else if (pageId === 'birthday-letter') {
        initLetterAmbientCanvas();
    }
}

function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const pageId = btn.getAttribute('data-page');
            try { window.location.hash = pageId; } catch(e) {}
            navigateToPage(pageId);
        });
    });

    const musicBtn = document.getElementById('music-toggle');
    if (musicBtn) {
        musicBtn.addEventListener('click', () => toggleMusic());
    }

    // Direct hash access (e.g. #birthday-letter)
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && document.getElementById(initialHash)) {
        const loader = document.getElementById('loading-screen');
        if (loader) loader.style.display = 'none';
        navigateToPage(initialHash);
    }
}

// ==========================================================================
// 10. ENTRY POINT
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    setupNavigation();
    setupLetterInteraction();
    setupLightbox();
});
