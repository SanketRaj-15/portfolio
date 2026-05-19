const dot = document.getElementById('c-dot');
const outline = document.getElementById('c-outline');
let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
});

function animateCursor() {
    const distX = mouseX - outlineX;
    const distY = mouseY - outlineY;
    outlineX = outlineX + (distX * 0.15);
    outlineY = outlineY + (distY * 0.15);
    outline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, input, textarea, select, video, model-viewer, .project-card, .skill-category, .cert-card, .education-card, .contact-item, .stat-item, .detail-item, .video-card, .download-card, .model-viewer-wrapper, .owner-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        outline.style.width = '65px';
        outline.style.height = '65px';
        outline.style.borderColor = 'var(--secondary)';
        outline.style.backgroundColor = 'rgba(255, 101, 132, 0.05)';
        dot.style.transform += ' scale(2)';
    });
    el.addEventListener('mouseleave', () => {
        outline.style.width = '40px';
        outline.style.height = '40px';
        outline.style.borderColor = 'var(--primary)';
        outline.style.backgroundColor = 'transparent';
        dot.style.transform = dot.style.transform.replace(' scale(2)', '');
    });
});

const typewriterElement = document.getElementById('typewriter');
const roles = ['AR/VR System Analyst', '3D Modeler', 'Unity Developer', 'Immersive Experience Creator', 'Video Editor', 'Tech Enthusiast'];
let roleIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 100;
function typeWriter() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }
    setTimeout(typeWriter, typeSpeed);
}
typeWriter();

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
});

const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const step = target / 125;
        let current = 0;
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        updateCounter();
    });
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
if (document.querySelector('.hero-stats')) statsObserver.observe(document.querySelector('.hero-stats'));

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), index * 80);
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        document.querySelectorAll('.project-card').forEach((card, index) => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || filter === category) {
                card.style.display = 'block';
                setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, index * 80);
            } else {
                card.style.opacity = '0'; card.style.transform = 'translateY(20px)';
                setTimeout(() => { card.style.display = 'none'; }, 300);
            }
        });
    });
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const projectType = document.getElementById('projectType').value;
        const message = document.getElementById('message').value.trim();
        const body = [
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone || 'Not provided'}`,
            `Project Type: ${projectType || 'Not selected'}`,
            '',
            message
        ].join('\n');
        window.location.href = `mailto:ssraj4962@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        contactForm.reset();
    });
}

document.querySelectorAll('.video-wrapper video').forEach(video => {
    const revealFallback = () => {
        video.style.opacity = '0';
        video.style.pointerEvents = 'none';
    };
    video.addEventListener('error', revealFallback);
    video.querySelectorAll('source').forEach(source => source.addEventListener('error', revealFallback));
});

function initModelViewer() {
    const container = document.getElementById('model-container');
    if (!container || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 1.5, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.HemisphereLight(0xffffff, 0x6c63ff, 1.25);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const accentLight = new THREE.PointLight(0x00d4aa, 1.7, 8);
    accentLight.position.set(-3, 1.8, 2.4);
    scene.add(accentLight);

    const root = new THREE.Group();
    scene.add(root);

    function createProceduralShowcase() {
        const primary = new THREE.MeshStandardMaterial({ color: 0x6c63ff, roughness: 0.28, metalness: 0.45 });
        const accent = new THREE.MeshStandardMaterial({ color: 0x00d4aa, roughness: 0.34, metalness: 0.35 });
        const soft = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.18, metalness: 0.18, transparent: true, opacity: 0.82 });

        const headset = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.9, 0.72, 8, 8, 8), primary);
        headset.position.y = 0.45;
        headset.scale.set(1, 1, 0.86);
        root.add(headset);

        const visor = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.56, 0.08, 8, 8, 2), soft);
        visor.position.set(0, 0.48, 0.39);
        root.add(visor);

        [-1.32, 1.32].forEach(x => {
            const controller = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 1.05, 32), accent);
            controller.position.set(x, -0.75, 0.2);
            controller.rotation.z = x < 0 ? -0.28 : 0.28;
            controller.rotation.x = 0.32;
            root.add(controller);

            const ring = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.035, 12, 42), soft);
            ring.position.set(x, -0.18, 0.04);
            ring.rotation.x = Math.PI / 2.6;
            ring.rotation.z = x < 0 ? -0.18 : 0.18;
            root.add(ring);
        });

        const orbitRing = new THREE.Mesh(
            new THREE.TorusGeometry(1.95, 0.012, 16, 120),
            new THREE.MeshBasicMaterial({ color: 0xff6584, transparent: true, opacity: 0.66 })
        );
        orbitRing.rotation.x = Math.PI / 2.25;
        root.add(orbitRing);

        const grid = new THREE.GridHelper(5, 18, 0x6c63ff, 0xb8c2ff);
        grid.position.y = -1.35;
        grid.material.transparent = true;
        grid.material.opacity = 0.22;
        scene.add(grid);
    }

    function fitLoadedModel(model) {
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        const maxAxis = Math.max(size.x, size.y, size.z) || 1;
        model.scale.setScalar(2.6 / maxAxis);
        root.add(model);
    }

    if (typeof THREE.GLTFLoader === 'function') {
        const loader = new THREE.GLTFLoader();
        loader.load('models/bike.glb', gltf => fitLoadedModel(gltf.scene), undefined, createProceduralShowcase);
    } else {
        createProceduralShowcase();
    }

    let controls;
    if (typeof THREE.OrbitControls === 'function') {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.2;
        controls.enablePan = false;
        controls.minDistance = 3;
        controls.maxDistance = 8;
    }

    function resizeRenderer() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    window.addEventListener('resize', resizeRenderer);

    function animateModel() {
        requestAnimationFrame(animateModel);
        if (!controls) {
            root.rotation.y += 0.008;
        } else {
            controls.update();
        }
        root.rotation.x = Math.sin(Date.now() * 0.001) * 0.045;
        renderer.render(scene, camera);
    }

    animateModel();
}

window.addEventListener('load', initModelViewer);

const OWNER_PASSCODE = 'sanket-xr-admin';
const PROJECT_STORAGE_KEY = 'sanketPortfolioProjects';

function loadCustomProjects() {
    try {
        return JSON.parse(localStorage.getItem(PROJECT_STORAGE_KEY)) || [];
    } catch (error) {
        return [];
    }
}

function saveCustomProjects(projects) {
    localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(projects));
}

function projectIconMarkup(project) {
    if (project.asset && /\.(png|jpg|jpeg|webp|gif)$/i.test(project.asset)) {
        return `<img src="${escapeHtml(project.asset)}" alt="${escapeHtml(project.name)} preview">`;
    }
    return `<i class="${escapeHtml(project.icon || 'fas fa-cube')}"></i>`;
}

function projectTagsMarkup(tags) {
    return (tags || [])
        .filter(Boolean)
        .map(tag => `<span class="project-tag">${escapeHtml(tag.trim())}</span>`)
        .join('');
}

function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    }[character]));
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card fade-in visible';
    card.dataset.category = project.type;
    card.dataset.ownerProject = project.id;
    const link = project.link || project.asset || '#contact';
    const safeLink = escapeHtml(link);
    const safeName = escapeHtml(project.name);
    const safeTypeLabel = escapeHtml(project.typeLabel);
    const isDownload = /\.(apk|zip|pdf)$/i.test(link);
    card.innerHTML = `
        <div class="project-image ${project.asset && /\.(png|jpg|jpeg|webp|gif)$/i.test(project.asset) ? 'project-thumb' : ''}">
            ${projectIconMarkup(project)}
            <div class="project-overlay">
                <a href="${safeLink}" ${link.startsWith('http') ? 'target="_blank" rel="noopener"' : ''} ${isDownload ? 'download' : ''} aria-label="Open ${safeName}">
                    <i class="${isDownload ? 'fas fa-download' : 'fas fa-arrow-up-right-from-square'}"></i>
                </a>
            </div>
        </div>
        <div class="project-info">
            <div class="project-tags">${projectTagsMarkup(project.tags)}</div>
            <h3 class="project-name">${safeName}</h3>
            <p class="project-desc">${escapeHtml(project.description)}</p>
            <div class="project-footer">
                <a href="${safeLink}" ${link.startsWith('http') ? 'target="_blank" rel="noopener"' : ''} ${isDownload ? 'download' : ''}>${isDownload ? 'Download' : 'Open Project'} <i class="fas fa-arrow-right"></i></a>
                <span style="font-size:0.8rem; color:var(--text-muted);"><i class="fas fa-layer-group"></i> ${safeTypeLabel}</span>
            </div>
        </div>
    `;
    return card;
}

function renderCustomProjects() {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;
    document.querySelectorAll('[data-owner-project]').forEach(card => card.remove());
    loadCustomProjects().forEach(project => grid.appendChild(createProjectCard(project)));
}

function renderAdminProjectList() {
    const list = document.getElementById('adminProjectList');
    if (!list) return;
    const projects = loadCustomProjects();
    if (!projects.length) {
        list.innerHTML = '<p class="owner-note">No locally saved projects yet.</p>';
        return;
    }
    list.innerHTML = projects.map(project => `
        <div class="admin-project-item">
            <div>
                <strong>${escapeHtml(project.name)}</strong>
                <span>${escapeHtml(project.typeLabel)}</span>
            </div>
            <button type="button" class="admin-delete" data-delete-project="${escapeHtml(project.id)}" aria-label="Delete ${escapeHtml(project.name)}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function unlockOwnerPanel() {
    const panel = document.querySelector('[data-owner-panel]');
    if (!panel) return;
    const alreadyUnlocked = sessionStorage.getItem('sanketOwnerUnlocked') === 'true';
    const wantsOwner = new URLSearchParams(window.location.search).has('owner') || window.location.hash === '#owner-panel';
    if (!alreadyUnlocked && !wantsOwner) return;
    if (!alreadyUnlocked) {
        const passcode = window.prompt('Owner passcode');
        if (passcode !== OWNER_PASSCODE) {
            window.location.hash = '';
            return;
        }
        sessionStorage.setItem('sanketOwnerUnlocked', 'true');
    }
    panel.hidden = false;
    renderAdminProjectList();
}

function initOwnerProjectManager() {
    renderCustomProjects();
    unlockOwnerPanel();

    const form = document.getElementById('projectAdminForm');
    if (form) {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const type = document.getElementById('adminProjectType').value;
            const typeLabels = { 'ar-vr': 'AR/VR', multimedia: 'Multimedia', web: 'Web' };
            const project = {
                id: `project-${Date.now()}`,
                name: document.getElementById('adminProjectName').value.trim(),
                type,
                typeLabel: typeLabels[type] || type,
                description: document.getElementById('adminProjectDescription').value.trim(),
                tags: document.getElementById('adminProjectTags').value.split(',').map(tag => tag.trim()).filter(Boolean),
                link: document.getElementById('adminProjectLink').value.trim(),
                asset: document.getElementById('adminProjectAsset').value.trim(),
                icon: document.getElementById('adminProjectIcon').value.trim()
            };
            const projects = loadCustomProjects();
            projects.push(project);
            saveCustomProjects(projects);
            renderCustomProjects();
            renderAdminProjectList();
            form.reset();
        });
    }

    document.addEventListener('click', event => {
        const deleteButton = event.target.closest('[data-delete-project]');
        if (!deleteButton) return;
        const id = deleteButton.getAttribute('data-delete-project');
        saveCustomProjects(loadCustomProjects().filter(project => project.id !== id));
        renderCustomProjects();
        renderAdminProjectList();
    });

    const clearButton = document.getElementById('clearAdminProjects');
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            saveCustomProjects([]);
            renderCustomProjects();
            renderAdminProjectList();
        });
    }
}

window.addEventListener('load', initOwnerProjectManager);