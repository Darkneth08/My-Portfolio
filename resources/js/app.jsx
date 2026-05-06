import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
    ArrowUp,
    AtSign,
    BadgeCheck,
    Brain,
    CalendarDays,
    CheckCheck,
    Download,
    ExternalLink,
    Eye,
    EyeOff,
    FileDown,
    FileSpreadsheet,
    GitBranch,
    Inbox,
    Languages,
    LineChart,
    LockKeyhole,
    LogOut,
    Mail,
    MapPin,
    MessageSquareText,
    MessagesSquare,
    Moon,
    PanelTopOpen,
    Phone,
    PhoneCall,
    RefreshCw,
    Reply,
    Search,
    Send,
    Shield,
    ShieldCheck,
    Sparkles,
    Sun,
    TimerReset,
    Trash2,
    User,
    Users,
} from 'lucide';

const iconSet = {
    'arrow-up': ArrowUp,
    'at-sign': AtSign,
    'badge-check': BadgeCheck,
    brain: Brain,
    'calendar-days': CalendarDays,
    'check-check': CheckCheck,
    download: Download,
    'external-link': ExternalLink,
    eye: Eye,
    'eye-off': EyeOff,
    'file-down': FileDown,
    'file-spreadsheet': FileSpreadsheet,
    'git-branch': GitBranch,
    inbox: Inbox,
    languages: Languages,
    'line-chart': LineChart,
    'lock-keyhole': LockKeyhole,
    'log-out': LogOut,
    mail: Mail,
    'map-pin': MapPin,
    'message-square-text': MessageSquareText,
    'messages-square': MessagesSquare,
    moon: Moon,
    'panel-top-open': PanelTopOpen,
    phone: Phone,
    'phone-call': PhoneCall,
    'refresh-cw': RefreshCw,
    reply: Reply,
    search: Search,
    send: Send,
    shield: Shield,
    'shield-check': ShieldCheck,
    sparkles: Sparkles,
    sun: Sun,
    'timer-reset': TimerReset,
    'trash-2': Trash2,
    user: User,
    users: Users,
};

const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
const adminStorageKey = 'portfolio-admin-token';

function Icon({ name }) {
    const node = iconSet[name];

    if (!node) {
        return null;
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {node.map(([tag, attrs], index) => React.createElement(tag, { ...attrs, key: index }))}
        </svg>
    );
}

function useTheme() {
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem('portfolio-theme');

        if (stored === 'light' || stored === 'dark') {
            return stored;
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('portfolio-theme', theme);
    }, [theme]);

    return [theme, setTheme];
}

function App() {
    const [theme, setTheme] = useTheme();
    const isAdmin = window.location.pathname.startsWith('/admin');

    return isAdmin ? (
        <AdminApp theme={theme} setTheme={setTheme} />
    ) : (
        <PortfolioApp theme={theme} setTheme={setTheme} />
    );
}

const navItems = [
    ['Profile', '#profile'],
    ['Experience', '#experience'],
    ['Skills', '#skills'],
    ['Education', '#education'],
    ['Contact', '#contact'],
];

function Header({ theme, setTheme }) {
    const [active, setActive] = useState('#home');

    useEffect(() => {
        const sections = [...document.querySelectorAll('[data-section]')];
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries
                    .filter((item) => item.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (entry) {
                    setActive(`#${entry.target.id}`);
                }
            },
            { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.35, 0.7] },
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    return (
        <header className="site-header is-pinned">
            <a className="brand" href="#home" aria-label="Kristine Burgos home">
                <span className="brand-mark">KB</span>
                <span>
                    <strong>Kristine Burgos</strong>
                    <small>Finance Portfolio</small>
                </span>
            </a>

            <nav className="site-nav" aria-label="Main navigation">
                {navItems.map(([label, href]) => (
                    <a key={href} className={active === href ? 'is-active' : ''} href={href}>
                        {label}
                    </a>
                ))}
            </nav>

            <button
                className="icon-button"
                type="button"
                aria-label="Change color mode"
                data-tooltip={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
                <Icon name={theme === 'dark' ? 'moon' : 'sun'} />
            </button>
        </header>
    );
}

function Reveal({ as: Tag = 'div', className = '', children, ...props }) {
    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    node.classList.add('is-visible');
                    observer.disconnect();
                }
            },
            { threshold: 0.15 },
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return (
        <Tag ref={ref} className={`reveal ${className}`} {...props}>
            {children}
        </Tag>
    );
}

function PortfolioApp({ theme, setTheme }) {
    return (
        <>
            <a className="skip-link" href="#content">
                Skip to content
            </a>
            <Header theme={theme} setTheme={setTheme} />
            <main id="content">
                <Hero theme={theme} />
                <ProfileSection />
                <ExperienceSection />
                <SkillsSection />
                <EducationSection />
                <ResumeSection />
                <ContactSection />
            </main>
            <footer className="site-footer">
                <p>Kristine Bernadette D. Burgos</p>
                <a href="#home" aria-label="Back to top">
                    <Icon name="arrow-up" />
                    <span>Top</span>
                </a>
            </footer>
        </>
    );
}

function Hero({ theme }) {
    return (
        <section className="hero section-anchor" id="home" data-section>
            <ThreeHero theme={theme} />
            <div className="hero-shade" aria-hidden="true" />

            <div className="hero-content">
                <Reveal className="hero-copy">
                    <p className="eyebrow">BSBA Financial Management | Davao City</p>
                    <h1>Kristine Bernadette D. Burgos</h1>
                    <p className="hero-lead">
                        A finance-minded professional path built around risk awareness, financial analysis,
                        strategic decision making, and adaptable client-facing experience.
                    </p>

                    <div className="hero-actions" aria-label="Primary actions">
                        <a className="button button-primary" href="/assets/kristine-resume.pdf" download>
                            <Icon name="download" />
                            <span>Download Resume</span>
                        </a>
                        <a className="button" href="#contact">
                            <Icon name="send" />
                            <span>Send Message</span>
                        </a>
                        <a className="button button-soft" href="/admin">
                            <Icon name="inbox" />
                            <span>Admin Inbox</span>
                        </a>
                    </div>
                </Reveal>

                <Reveal className="hero-ledger" aria-label="Portfolio snapshot">
                    <div className="ledger-row">
                        <span>Current</span>
                        <strong>University of Mindanao</strong>
                    </div>
                    <div className="ledger-row">
                        <span>Focus</span>
                        <strong>Corporate finance</strong>
                    </div>
                    <div className="ledger-row">
                        <span>Inbox</span>
                        <strong>Admin-ready messages</strong>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

function ThreeHero({ theme }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        let disposed = false;
        let cleanup = () => {};

        import('three').then((THREE) => {
            if (disposed || !canvasRef.current) {
                return;
            }

            cleanup = initThreeScene(THREE, canvasRef.current, theme);
        });

        return () => {
            disposed = true;
            cleanup();
        };
    }, [theme]);

    return <canvas ref={canvasRef} id="hero-canvas" aria-hidden="true" />;
}

function initThreeScene(THREE, canvas, theme) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDark = theme === 'dark';
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance',
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(isDark ? 0x070a08 : 0xf4fbf7, 12, 32);

    const camera = new THREE.PerspectiveCamera(43, 1, 0.1, 90);
    camera.position.set(0, 0.5, 13);

    const palette = {
        green: new THREE.Color(isDark ? 0x31c998 : 0x0f9f78),
        coral: new THREE.Color(isDark ? 0xff7771 : 0xd84c4c),
        gold: new THREE.Color(isDark ? 0xf3c247 : 0xe0a317),
        cyan: new THREE.Color(isDark ? 0x55c0d8 : 0x177f9d),
        violet: new THREE.Color(isDark ? 0xaa8be8 : 0x7651b8),
        ink: new THREE.Color(isDark ? 0xf8faf6 : 0x18342a),
    };

    const rig = new THREE.Group();
    rig.position.set(2.15, -0.05, 0);
    scene.add(rig);

    scene.add(new THREE.AmbientLight(0xffffff, isDark ? 0.38 : 0.7));

    const keyLight = new THREE.DirectionalLight(0xffffff, isDark ? 2.6 : 2.2);
    keyLight.position.set(4, 6, 8);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(palette.green, isDark ? 95 : 62, 26);
    rimLight.position.set(-5, -2, 6);
    scene.add(rimLight);

    const pulseLight = new THREE.PointLight(palette.coral, isDark ? 55 : 36, 18);
    pulseLight.position.set(4, 1, 5);
    scene.add(pulseLight);

    const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.25, 7),
        new THREE.MeshPhysicalMaterial({
            color: palette.green,
            metalness: 0.34,
            roughness: 0.2,
            transmission: isDark ? 0.1 : 0.26,
            thickness: 0.7,
            clearcoat: 1,
            clearcoatRoughness: 0.12,
        }),
    );
    rig.add(core);

    const knot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(1.82, 0.075, 220, 12, 3, 7),
        new THREE.MeshPhysicalMaterial({
            color: palette.gold,
            metalness: 0.55,
            roughness: 0.18,
            clearcoat: 0.8,
        }),
    );
    rig.add(knot);

    const ringGroup = new THREE.Group();
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: palette.gold,
        transparent: true,
        opacity: isDark ? 0.38 : 0.46,
        wireframe: true,
    });

    [
        [2.55, 0.2, 0.42],
        [3.25, Math.PI / 2.8, 0],
        [4.05, Math.PI / 2, Math.PI / 5],
        [4.75, Math.PI / 2.35, Math.PI / 2.8],
    ].forEach(([radius, x, y]) => {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.012, 8, 160), ringMaterial.clone());
        ring.rotation.set(x, y, 0);
        ringGroup.add(ring);
    });
    rig.add(ringGroup);

    const colors = [palette.cyan, palette.coral, palette.gold, palette.green, palette.violet];
    const paneGroup = new THREE.Group();

    for (let i = 0; i < 38; i += 1) {
        const angle = (i / 38) * Math.PI * 2;
        const radius = 3.5 + Math.sin(i * 1.7) * 0.95;
        const pane = new THREE.Mesh(
            new THREE.BoxGeometry(0.84, 0.42, 0.035),
            new THREE.MeshPhysicalMaterial({
                color: colors[i % colors.length],
                transparent: true,
                opacity: isDark ? 0.48 : 0.55,
                roughness: 0.15,
                metalness: 0.15,
                transmission: 0.2,
                thickness: 0.24,
            }),
        );

        pane.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.8) * 1.26, Math.sin(angle) * radius);
        pane.rotation.set(Math.sin(angle) * 0.9, -angle, Math.cos(angle) * 0.3);
        pane.userData.phase = angle;
        paneGroup.add(pane);
    }
    rig.add(paneGroup);

    const barGroup = new THREE.Group();
    const barMaterial = new THREE.MeshPhysicalMaterial({
        color: palette.cyan,
        metalness: 0.28,
        roughness: 0.24,
        clearcoat: 0.7,
    });

    for (let i = 0; i < 14; i += 1) {
        const height = 0.45 + (Math.sin(i * 1.4) + 1.4) * 0.48;
        const bar = new THREE.Mesh(new THREE.BoxGeometry(0.16, height, 0.16), barMaterial.clone());
        bar.material.color = colors[i % colors.length];
        bar.position.set(-2.4 + i * 0.34, -2.35 + height / 2, -1.6 + Math.sin(i * 0.8) * 0.5);
        bar.rotation.y = -0.35;
        bar.userData.phase = i * 0.55;
        barGroup.add(bar);
    }
    rig.add(barGroup);

    const coinGroup = new THREE.Group();
    const coinGeometry = new THREE.CylinderGeometry(0.18, 0.18, 0.035, 36);

    for (let i = 0; i < 18; i += 1) {
        const angle = (i / 18) * Math.PI * 2;
        const coin = new THREE.Mesh(
            coinGeometry,
            new THREE.MeshPhysicalMaterial({
                color: i % 2 ? palette.gold : palette.green,
                metalness: 0.62,
                roughness: 0.2,
            }),
        );
        coin.position.set(Math.cos(angle) * 5.2, Math.sin(i * 0.7) * 2.35, Math.sin(angle) * 5.2);
        coin.rotation.set(Math.PI / 2, angle, 0);
        coin.userData.phase = angle;
        coinGroup.add(coin);
    }
    rig.add(coinGroup);

    const nodePositions = [];
    const nodeGeometry = new THREE.SphereGeometry(0.055, 16, 16);
    const nodeGroup = new THREE.Group();

    for (let i = 0; i < 82; i += 1) {
        const angle = i * 0.88;
        const radius = 2.7 + (i % 11) * 0.22;
        const position = new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(i * 0.63) * 2.35,
            Math.sin(angle) * radius,
        );
        const node = new THREE.Mesh(
            nodeGeometry,
            new THREE.MeshBasicMaterial({
                color: colors[i % colors.length],
                transparent: true,
                opacity: isDark ? 0.9 : 0.7,
            }),
        );
        node.position.copy(position);
        nodePositions.push(position);
        nodeGroup.add(node);
    }
    rig.add(nodeGroup);

    const networkPositions = [];
    for (let i = 0; i < nodePositions.length - 1; i += 2) {
        networkPositions.push(...nodePositions[i].toArray(), ...nodePositions[(i + 5) % nodePositions.length].toArray());
    }

    const networkGeometry = new THREE.BufferGeometry();
    networkGeometry.setAttribute('position', new THREE.Float32BufferAttribute(networkPositions, 3));
    const network = new THREE.LineSegments(
        networkGeometry,
        new THREE.LineBasicMaterial({
            color: palette.cyan,
            transparent: true,
            opacity: isDark ? 0.2 : 0.32,
        }),
    );
    rig.add(network);

    const starCount = 1100;
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i += 1) {
        starPositions[i * 3] = (Math.random() - 0.5) * 38;
        starPositions[i * 3 + 1] = (Math.random() - 0.5) * 19;
        starPositions[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(
        starGeometry,
        new THREE.PointsMaterial({
            color: palette.ink,
            size: isDark ? 0.024 : 0.018,
            transparent: true,
            opacity: isDark ? 0.58 : 0.42,
            depthWrite: false,
        }),
    );
    scene.add(stars);

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onPointerMove = (event) => {
        target.x = (event.clientX / window.innerWidth - 0.5) * 2;
        target.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const resize = () => {
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(1, rect.width);
        const height = Math.max(1, rect.height);

        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        rig.position.x = width < 760 ? 0.9 : 2.35;
        rig.scale.setScalar(width < 760 ? 0.76 : 1);
    };

    window.addEventListener('resize', resize);
    resize();

    let frameId = 0;

    const animate = (time = 0) => {
        const seconds = time * 0.001;
        const scroll = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.4);

        pointer.x += (target.x - pointer.x) * 0.055;
        pointer.y += (target.y - pointer.y) * 0.055;

        core.rotation.set(seconds * 0.22 + pointer.y * 0.22, seconds * 0.36 + pointer.x * 0.32, seconds * 0.08);
        knot.rotation.set(-seconds * 0.19, seconds * 0.44, seconds * 0.08);
        ringGroup.rotation.set(seconds * 0.06, seconds * 0.12 + scroll * 0.35, pointer.x * 0.08);
        paneGroup.rotation.set(pointer.y * 0.13, seconds * 0.16 + pointer.x * 0.18, 0);
        nodeGroup.rotation.y = -seconds * 0.09;
        network.rotation.y = -seconds * 0.09;
        coinGroup.rotation.y = seconds * 0.18;
        stars.rotation.y = seconds * 0.012;
        pulseLight.intensity = (isDark ? 42 : 24) + Math.sin(seconds * 2.6) * 12;

        paneGroup.children.forEach((pane) => {
            pane.position.y += Math.sin(seconds * 1.4 + pane.userData.phase) * 0.0024;
        });

        barGroup.children.forEach((bar) => {
            bar.scale.y = 0.82 + Math.sin(seconds * 1.9 + bar.userData.phase) * 0.18;
        });

        coinGroup.children.forEach((coin) => {
            coin.rotation.z = seconds * 1.4 + coin.userData.phase;
        });

        camera.position.z = 13 - scroll * 1.2;
        camera.position.x = pointer.x * 0.36;
        camera.position.y = 0.55 - pointer.y * 0.24;
        camera.lookAt(0.45, 0, 0);

        renderer.render(scene, camera);

        if (!reducedMotion) {
            frameId = window.requestAnimationFrame(animate);
        }
    };

    animate();

    return () => {
        window.cancelAnimationFrame(frameId);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('resize', resize);
        renderer.dispose();
        scene.traverse((object) => {
            if (object.geometry) {
                object.geometry.dispose();
            }

            if (object.material) {
                const materials = Array.isArray(object.material) ? object.material : [object.material];
                materials.forEach((material) => material.dispose());
            }
        });
    };
}

function ProfileSection() {
    return (
        <section className="section profile-band section-anchor" id="profile" data-section>
            <div className="section-inner profile-layout">
                <Reveal className="section-heading">
                    <p className="eyebrow">Profile</p>
                    <h2>Detail-oriented, adaptable, and ready for finance work that needs calm judgment.</h2>
                </Reveal>

                <Reveal className="profile-copy">
                    <p>
                        Kristine is focused on Financial Management with a passion for continuous learning and
                        professional growth. Her resume highlights risk management, financial analysis, strategic
                        decision making, teamwork, and effective communication.
                    </p>
                    <p>
                        She has worked across service, digital printing, and ESL teaching environments, giving her
                        practice in managing tasks, supporting clients, and staying composed when priorities shift.
                    </p>
                </Reveal>

                <Reveal className="fact-grid" aria-label="Personal details">
                    {[
                        ['map-pin', 'Location', 'Agdao, Davao City'],
                        ['languages', 'Language', 'English'],
                        ['calendar-days', 'Date of Birth', 'February 01, 2004'],
                        ['badge-check', 'Nationality', 'Filipino'],
                    ].map(([icon, label, value]) => (
                        <article className="fact-card" key={label}>
                            <Icon name={icon} />
                            <span>{label}</span>
                            <strong>{value}</strong>
                        </article>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}

function ExperienceSection() {
    return (
        <section className="section section-anchor" id="experience" data-section>
            <div className="section-inner split-layout">
                <Reveal className="section-heading">
                    <p className="eyebrow">Experience</p>
                    <h2>Hands-on roles across teaching, service, and production support.</h2>
                </Reveal>

                <Reveal className="timeline">
                    {[
                        ['2025', 'ESL Teacher', 'Station 51 Devhub, Davao City Branch'],
                        ['2024-2025', 'Part Time Crew', "Ley's Catering"],
                        ['2024-2025', 'Digital Printing', 'Production support, customer requests, and detail-focused output handling.'],
                    ].map(([date, title, body]) => (
                        <article className="timeline-item" key={`${date}-${title}`}>
                            <div className="timeline-date">{date}</div>
                            <div>
                                <h3>{title}</h3>
                                <p>{body}</p>
                            </div>
                        </article>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}

const skills = [
    ['finance', 'line-chart', 'Financial Analysis', 'Interpreting numbers, risks, and decisions with a finance-first mindset.'],
    ['finance', 'shield-check', 'Risk Management', 'Spotting potential issues early and thinking through practical responses.'],
    ['finance', 'git-branch', 'Strategic Decision Making', 'Balancing available information, priorities, and long-term goals.'],
    ['work', 'users', 'Teamwork', 'Working with others while staying accountable for assigned tasks.'],
    ['work', 'messages-square', 'Effective Communication', 'Clear, respectful communication across service and teaching settings.'],
    ['work', 'timer-reset', 'Time Management', 'Handling deadlines, shifts, and changing priorities with focus.'],
    ['work', 'refresh-cw', 'Adaptability', 'Learning quickly and staying steady in new environments.'],
    ['work', 'brain', 'Critical Thinking', 'Looking past surface details and choosing grounded next steps.'],
    ['tools', 'file-spreadsheet', 'MS Office', 'Word, Excel, and PowerPoint for documents, reports, and presentations.'],
];

function SkillsSection() {
    const [filter, setFilter] = useState('all');
    const filteredSkills = skills.filter(([category]) => filter === 'all' || category === filter);

    return (
        <section className="section skills-band section-anchor" id="skills" data-section>
            <div className="section-inner">
                <Reveal className="section-heading">
                    <p className="eyebrow">Skills</p>
                    <h2>A practical mix of finance thinking, communication, and office execution.</h2>
                </Reveal>

                <Reveal className="skill-console">
                    <div className="segmented" role="tablist" aria-label="Skill categories">
                        {['all', 'finance', 'work', 'tools'].map((item) => (
                            <button
                                className={`segment ${filter === item ? 'is-active' : ''}`}
                                type="button"
                                role="tab"
                                aria-selected={filter === item}
                                onClick={() => setFilter(item)}
                                key={item}
                            >
                                {item[0].toUpperCase() + item.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="skill-grid">
                        {filteredSkills.map(([category, icon, title, body]) => (
                            <article className="skill-card" data-skill-category={category} key={title}>
                                <Icon name={icon} />
                                <h3>{title}</h3>
                                <p>{body}</p>
                            </article>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

function EducationSection() {
    return (
        <section className="section section-anchor" id="education" data-section>
            <div className="section-inner split-layout">
                <Reveal className="section-heading">
                    <p className="eyebrow">Education</p>
                    <h2>A Davao-based learning path now centered on financial management.</h2>
                </Reveal>

                <Reveal className="education-list">
                    {[
                        ['2023-Present', 'University of Mindanao', 'BSBA Financial Management'],
                        ['2021-2023', 'Philippine Academy of Sakya Davao, Inc.', 'Senior high school track listed in resume records.'],
                        ['2017-2021', 'Leon Garcia Sr. National High School', 'Secondary education, including senior high school year noted in the second resume.'],
                        ['2017-2018', 'Holy Cross of Agdao', 'Secondary education record from the Burgos resume.'],
                        ['2011-2017', 'Don Julian Rodriguez Sr. Elementary School', 'Primary education.'],
                    ].map(([date, title, body]) => (
                        <article className="education-item" key={`${date}-${title}`}>
                            <span>{date}</span>
                            <h3>{title}</h3>
                            <p>{body}</p>
                        </article>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}

function ResumeSection() {
    return (
        <section className="section resume-band" aria-labelledby="resume-heading">
            <div className="section-inner resume-layout">
                <Reveal className="section-heading">
                    <p className="eyebrow">Resume Files</p>
                    <h2 id="resume-heading">Two uploaded resume versions are available for download.</h2>
                </Reveal>

                <Reveal className="resume-actions">
                    {[
                        ['/assets/kristine-resume.pdf', 'Resume.pdf'],
                        ['/assets/burgos-resume.pdf', 'Burgos Resume.pdf'],
                    ].map(([href, label]) => (
                        <a className="resume-tile" href={href} download key={href}>
                            <Icon name="file-down" />
                            <span>{label}</span>
                            <strong>Download</strong>
                        </a>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}

function ContactSection() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState('');
    const [isSending, setSending] = useState(false);
    const mailtoHref = useMemo(() => {
        const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'visitor'}`);
        const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}`);

        return `mailto:kbburgos23@gmail.com?subject=${subject}&body=${body}`;
    }, [form]);

    const copy = async (value) => {
        try {
            await navigator.clipboard.writeText(value);
            setStatus('Copied to clipboard.');
        } catch {
            setStatus(value);
        }
    };

    const submit = async (event) => {
        event.preventDefault();
        setSending(true);
        setStatus('Saving message...');

        try {
            const response = await fetch('/messages', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.message || 'Please check the form and try again.');
            }

            setForm({ name: '', email: '', phone: '', message: '' });
            setStatus('Message saved. Kristine can read it in the admin inbox.');
        } catch (error) {
            setStatus(error.message);
        } finally {
            setSending(false);
        }
    };

    return (
        <section className="section section-anchor contact-section" id="contact" data-section>
            <div className="section-inner contact-layout">
                <Reveal className="section-heading">
                    <p className="eyebrow">Contact</p>
                    <h2>Open to corporate finance opportunities and professional conversations.</h2>
                </Reveal>

                <Reveal className="contact-panel">
                    <div className="contact-list">
                        {[
                            ['mail', 'kbburgos23@gmail.com'],
                            ['phone', '09943753314'],
                            ['phone-call', '09553503200'],
                            ['map-pin', 'Davao City, Philippines'],
                        ].map(([icon, value]) => (
                            <button type="button" className="contact-line" onClick={() => copy(value)} key={value}>
                                <Icon name={icon} />
                                <span>{value}</span>
                            </button>
                        ))}
                    </div>

                    <form className="contact-form" onSubmit={submit}>
                        <label>
                            <span>Your name</span>
                            <input
                                type="text"
                                name="name"
                                autoComplete="name"
                                value={form.name}
                                onChange={(event) => setForm({ ...form, name: event.target.value })}
                                required
                            />
                        </label>
                        <label>
                            <span>Email</span>
                            <input
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={form.email}
                                onChange={(event) => setForm({ ...form, email: event.target.value })}
                            />
                        </label>
                        <label>
                            <span>Phone</span>
                            <input
                                type="tel"
                                name="phone"
                                autoComplete="tel"
                                value={form.phone}
                                onChange={(event) => setForm({ ...form, phone: event.target.value })}
                            />
                        </label>
                        <label>
                            <span>Message</span>
                            <textarea
                                name="message"
                                rows="5"
                                value={form.message}
                                onChange={(event) => setForm({ ...form, message: event.target.value })}
                                required
                            />
                        </label>
                        <div className="form-actions">
                            <button className="button button-primary" type="submit" disabled={isSending}>
                                <Icon name="send" />
                                <span>{isSending ? 'Sending...' : 'Save Message'}</span>
                            </button>
                            <a className="button" href={mailtoHref}>
                                <Icon name="mail" />
                                <span>Email Draft</span>
                            </a>
                        </div>
                        <p className="form-status" role="status" aria-live="polite">
                            {status}
                        </p>
                    </form>
                </Reveal>

                <Reveal className="personal-strip" aria-label="Additional personal information">
                    <span>Place of Birth: Davao City</span>
                    <span>Sex: Female</span>
                    <span>Civil Status: Single</span>
                    <span>Religion: Roman Catholic</span>
                </Reveal>
            </div>
        </section>
    );
}

function AdminApp({ theme, setTheme }) {
    const [token, setToken] = useState(() => localStorage.getItem(adminStorageKey) || '');
    const [pin, setPin] = useState('');
    const [messages, setMessages] = useState([]);
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [status, setStatus] = useState('');
    const [showPin, setShowPin] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const authHeaders = useMemo(
        () => ({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
            Authorization: `Bearer ${token}`,
        }),
        [token],
    );

    const loadMessages = async () => {
        if (!token) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/admin/messages', { headers: authHeaders });

            if (response.status === 403) {
                localStorage.removeItem(adminStorageKey);
                setToken('');
                setStatus('Admin session expired. Enter the PIN again.');
                return;
            }

            if (!response.ok) {
                throw new Error('Could not load inbox.');
            }

            setMessages(await response.json());
            setStatus('Inbox updated.');
        } catch (error) {
            setStatus(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMessages();
        const id = window.setInterval(loadMessages, 15000);

        return () => window.clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const login = async (event) => {
        event.preventDefault();
        setStatus('Checking PIN...');

        try {
            const response = await fetch('/admin/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify({ pin }),
            });

            if (!response.ok) {
                throw new Error('Invalid PIN.');
            }

            const data = await response.json();
            localStorage.setItem(adminStorageKey, data.token);
            setToken(data.token);
            setPin('');
            setStatus('Admin unlocked.');
        } catch (error) {
            setStatus(error.message);
        }
    };

    const updateStatus = async (message, nextStatus) => {
        await fetch(`/admin/messages/${message.id}`, {
            method: 'PATCH',
            headers: authHeaders,
            body: JSON.stringify({ status: nextStatus }),
        });
        await loadMessages();
    };

    const deleteMessage = async (message) => {
        await fetch(`/admin/messages/${message.id}`, {
            method: 'DELETE',
            headers: authHeaders,
        });
        await loadMessages();
    };

    const filteredMessages = messages.filter((message) => {
        const statusMatch = filter === 'all' || message.status === filter;
        const text = `${message.name} ${message.email} ${message.phone} ${message.message}`.toLowerCase();

        return statusMatch && text.includes(query.toLowerCase());
    });

    const unreadCount = messages.filter((message) => message.status === 'unread').length;

    return (
        <main className="admin-shell">
            <div className="admin-canvas" aria-hidden="true">
                <ThreeHero theme={theme} />
                <div className="hero-shade" />
            </div>

            <section className="admin-panel">
                <div className="admin-topbar">
                    <a className="brand" href="/">
                        <span className="brand-mark">KB</span>
                        <span>
                            <strong>Admin Inbox</strong>
                            <small>Portfolio messages</small>
                        </span>
                    </a>
                    <div className="admin-top-actions">
                        <button className="icon-button" type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                            <Icon name={theme === 'dark' ? 'moon' : 'sun'} />
                        </button>
                        {token && (
                            <button
                                className="icon-button"
                                type="button"
                                onClick={() => {
                                    localStorage.removeItem(adminStorageKey);
                                    setToken('');
                                }}
                            >
                                <Icon name="log-out" />
                            </button>
                        )}
                    </div>
                </div>

                {!token ? (
                    <form className="admin-login" onSubmit={login}>
                        <Icon name="lock-keyhole" />
                        <h1>Unlock Messages</h1>
                        <p>Enter the admin PIN to see saved portfolio messages.</p>
                        <label>
                            <span>Admin PIN</span>
                            <div className="pin-field">
                                <input
                                    type={showPin ? 'text' : 'password'}
                                    value={pin}
                                    onChange={(event) => setPin(event.target.value)}
                                    autoFocus
                                    required
                                />
                                <button type="button" onClick={() => setShowPin(!showPin)} aria-label="Toggle PIN visibility">
                                    <Icon name={showPin ? 'eye-off' : 'eye'} />
                                </button>
                            </div>
                        </label>
                        <button className="button button-primary" type="submit">
                            <Icon name="shield" />
                            <span>Open Inbox</span>
                        </button>
                        <p className="form-status" role="status">
                            {status}
                        </p>
                    </form>
                ) : (
                    <div className="admin-dashboard">
                        <div className="admin-metrics">
                            <article>
                                <span>Total</span>
                                <strong>{messages.length}</strong>
                            </article>
                            <article>
                                <span>Unread</span>
                                <strong>{unreadCount}</strong>
                            </article>
                            <article>
                                <span>Status</span>
                                <strong>{isLoading ? 'Syncing' : 'Live'}</strong>
                            </article>
                        </div>

                        <div className="admin-tools">
                            <label className="search-field">
                                <Icon name="search" />
                                <input
                                    type="search"
                                    placeholder="Search messages"
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                />
                            </label>
                            <div className="segmented" role="tablist" aria-label="Message status filter">
                                {['all', 'unread', 'read', 'replied', 'archived'].map((item) => (
                                    <button
                                        className={`segment ${filter === item ? 'is-active' : ''}`}
                                        type="button"
                                        onClick={() => setFilter(item)}
                                        key={item}
                                    >
                                        {item[0].toUpperCase() + item.slice(1)}
                                    </button>
                                ))}
                            </div>
                            <button className="button" type="button" onClick={loadMessages}>
                                <Icon name="refresh-cw" />
                                <span>Refresh</span>
                            </button>
                        </div>

                        <p className="form-status" role="status">
                            {status}
                        </p>

                        <div className="message-list">
                            {filteredMessages.length === 0 ? (
                                <div className="empty-inbox">
                                    <Icon name="inbox" />
                                    <strong>No messages found.</strong>
                                    <p>New saved messages from the portfolio contact form will appear here.</p>
                                </div>
                            ) : (
                                filteredMessages.map((message) => (
                                    <article className={`message-card status-${message.status}`} key={message.id}>
                                        <div className="message-head">
                                            <div>
                                                <span>{message.status}</span>
                                                <h2>{message.name}</h2>
                                            </div>
                                            <time dateTime={message.created_at}>
                                                {new Date(message.created_at).toLocaleString()}
                                            </time>
                                        </div>
                                        <div className="message-meta">
                                            {message.email && (
                                                <a href={`mailto:${message.email}`}>
                                                    <Icon name="at-sign" />
                                                    <span>{message.email}</span>
                                                </a>
                                            )}
                                            {message.phone && (
                                                <a href={`tel:${message.phone}`}>
                                                    <Icon name="phone" />
                                                    <span>{message.phone}</span>
                                                </a>
                                            )}
                                        </div>
                                        <p>{message.message}</p>
                                        <div className="message-actions">
                                            <button type="button" onClick={() => updateStatus(message, 'read')}>
                                                <Icon name="check-check" />
                                                <span>Read</span>
                                            </button>
                                            <a
                                                href={`mailto:${message.email || 'kbburgos23@gmail.com'}?subject=${encodeURIComponent(
                                                    `Re: Portfolio message from ${message.name}`,
                                                )}`}
                                                onClick={() => updateStatus(message, 'replied')}
                                            >
                                                <Icon name="reply" />
                                                <span>Reply</span>
                                            </a>
                                            <button type="button" onClick={() => updateStatus(message, 'archived')}>
                                                <Icon name="panel-top-open" />
                                                <span>Archive</span>
                                            </button>
                                            <button type="button" className="danger" onClick={() => deleteMessage(message)}>
                                                <Icon name="trash-2" />
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    </article>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}

createRoot(document.getElementById('portfolio-root')).render(<App />);
