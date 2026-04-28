const CONFIG = {
    githubUsername: "Darkneth08",
    githubProfile: "https://github.com/Darkneth08?tab=repositories",
    primaryEmail: "kennethborja2003@gmail.com",
    secondaryEmail: "kennethborja00@gmail.com",
    facebookUrl: "#" // Replace # with your real Facebook profile link.
};

const fallbackProjects = [
    {
        name: "farm-inventory-system",
        description: "Farm supply inventory system with customer portal, POS, inventory operations, reporting, and super admin tools.",
        language: "Blade",
        topics: ["php", "laravel", "inventory-management", "point-of-sale"],
        html_url: "https://github.com/Darkneth08/farm-inventory-system",
        homepage: "",
        updated_at: "2026-04-26T00:00:00Z",
        stargazers_count: 0,
        forks_count: 0
    },
    {
        name: "Library_Borrowing",
        description: "Laravel library borrowing and penalty system for managing borrowing workflows.",
        language: "Blade",
        topics: ["laravel", "library-system", "borrowing"],
        html_url: "https://github.com/Darkneth08/Library_Borrowing",
        homepage: "",
        updated_at: "2026-04-23T00:00:00Z",
        stargazers_count: 0,
        forks_count: 0
    },
    {
        name: "boarding-house-system",
        description: "Boarding house reservation and rental payment system for property/rental workflows.",
        language: "PHP",
        topics: ["php", "reservation", "rental-payment"],
        html_url: "https://github.com/Darkneth08/boarding-house-system",
        homepage: "",
        updated_at: "2026-04-22T00:00:00Z",
        stargazers_count: 0,
        forks_count: 0
    },
    {
        name: "barangay-san-antonio",
        description: "Community website project for barangay information and local services.",
        language: "JavaScript",
        topics: ["community", "website", "javascript"],
        html_url: "https://github.com/Darkneth08/barangay-san-antonio",
        homepage: "",
        updated_at: "2026-03-20T00:00:00Z",
        stargazers_count: 0,
        forks_count: 0
    },
    {
        name: "user-management-system",
        description: "PHP/MySQL user management system with registration, login, profile management, password changes, and admin tools.",
        language: "PHP",
        topics: ["php", "mysql", "rbac", "login"],
        html_url: "https://github.com/Darkneth08/user-management-system",
        homepage: "",
        updated_at: "2026-02-21T00:00:00Z",
        stargazers_count: 0,
        forks_count: 0
    },
    {
        name: "My-Portfolio",
        description: "Personal portfolio website showcasing projects, skills, and frontend work.",
        language: "HTML",
        topics: ["portfolio", "html", "css", "javascript"],
        html_url: "https://github.com/Darkneth08/My-Portfolio",
        homepage: "",
        updated_at: "2026-02-13T00:00:00Z",
        stargazers_count: 0,
        forks_count: 0
    }
];

let allProjects = [];
let activeFilter = "all";
let searchValue = "";

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function showToast(message) {
    const toast = $("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function initTheme() {
    const savedTheme = localStorage.getItem("kenneth-portfolio-theme");
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    const theme = savedTheme || (prefersLight ? "light" : "dark");
    document.documentElement.dataset.theme = theme;
    updateThemeIcon(theme);

    $("#themeToggle")?.addEventListener("click", () => {
        const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = nextTheme;
        localStorage.setItem("kenneth-portfolio-theme", nextTheme);
        updateThemeIcon(nextTheme);
        showToast(`${nextTheme === "dark" ? "Dark" : "Light"} mode activated`);
    });
}

function updateThemeIcon(theme) {
    const icon = $("#themeToggle i");
    if (!icon) return;
    icon.className = theme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
}

function initNavigation() {
    const menuToggle = $("#menuToggle");
    const navMenu = $("#navMenu");
    const navLinks = $$(".nav-link");
    const sections = $$("main section[id]");

    menuToggle?.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");
        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("menu-open", isOpen);
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu?.classList.remove("active");
            menuToggle?.classList.remove("active");
            menuToggle?.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
        });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 });

    sections.forEach((section) => observer.observe(section));
}

function initScrollEffects() {
    const progressBar = $(".page-progress span");
    const backTop = $("#backTop");

    function updateScrollUI() {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
        if (progressBar) progressBar.style.width = `${percent}%`;
        backTop?.classList.toggle("visible", window.scrollY > 600);
    }

    updateScrollUI();
    window.addEventListener("scroll", updateScrollUI, { passive: true });
}

function initRevealAnimations() {
    const revealItems = $$(".reveal");
    const skillItems = $$(".skill-item");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");

            if (entry.target.classList.contains("skill-panel")) {
                $$(".skill-item", entry.target).forEach(animateSkillBar);
            }
        });
    }, { threshold: 0.18 });

    revealItems.forEach((item) => observer.observe(item));
    skillItems.forEach((item) => {
        if (item.closest(".skill-panel.visible")) animateSkillBar(item);
    });
}

function animateSkillBar(item) {
    const fill = $("i", item);
    if (!fill) return;
    const progress = item.dataset.progress || "0";
    fill.style.width = `${progress}%`;
}

function initTypingText() {
    const target = $("#typedText");
    if (!target) return;

    const words = [
        "modern web systems",
        "Laravel CRUD apps",
        "clean UI designs",
        "real-world student projects",
        "responsive dashboards"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const word = words[wordIndex];
        target.textContent = isDeleting ? word.slice(0, charIndex - 1) : word.slice(0, charIndex + 1);
        charIndex += isDeleting ? -1 : 1;

        let delay = isDeleting ? 45 : 80;
        if (!isDeleting && charIndex === word.length) {
            delay = 1300;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 350;
        }

        window.setTimeout(type, delay);
    }

    type();
}

function initCursorGlow() {
    const glow = $(".cursor-glow");
    if (!glow) return;

    window.addEventListener("pointermove", (event) => {
        glow.style.transform = `translate(${event.clientX - 224}px, ${event.clientY - 224}px)`;
    }, { passive: true });
}

function initTiltCards() {
    const cards = $$(".tilt-card");

    cards.forEach((card) => {
        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * 10;
            const rotateX = ((0.5 - y / rect.height)) * 10;
            card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("pointerleave", () => {
            card.style.transform = "";
        });
    });
}

function initProfileFallback() {
    const image = $("#profileImage");
    const fallback = $("#avatarFallback");
    if (!image || !fallback) return;

    image.addEventListener("error", () => {
        image.style.display = "none";
        fallback.style.display = "grid";
    });
}

async function loadGitHubProjects() {
    const status = $("#projectStatus");
    const endpoint = `https://api.github.com/users/${CONFIG.githubUsername}/repos?sort=updated&per_page=24`;

    try {
        const response = await fetch(endpoint, { headers: { Accept: "application/vnd.github+json" } });
        if (!response.ok) throw new Error("GitHub API failed");

        const repos = await response.json();
        const usefulRepos = repos
            .filter((repo) => !repo.fork)
            .map((repo) => ({
                name: repo.name,
                description: repo.description || buildDescriptionFromName(repo.name),
                language: repo.language || "Project",
                topics: repo.topics || [],
                html_url: repo.html_url,
                homepage: repo.homepage,
                updated_at: repo.updated_at,
                stargazers_count: repo.stargazers_count,
                forks_count: repo.forks_count
            }));

        allProjects = usefulRepos.length ? usefulRepos : fallbackProjects;
        updateRepoCount(allProjects.length);
        status?.classList.add("hidden");
    } catch (error) {
        allProjects = fallbackProjects;
        updateRepoCount(17);
        if (status) {
            status.innerHTML = `<i class="fa-solid fa-wifi"></i> Showing fallback projects. GitHub API may be offline or rate-limited.`;
        }
    }

    renderProjects();
}

function updateRepoCount(count) {
    const repoCount = $("#repoCount");
    if (repoCount) repoCount.textContent = count;
}

function buildDescriptionFromName(name) {
    const cleanName = name.replace(/[-_]/g, " ");
    return `A ${cleanName} project from Kenneth Borja's GitHub portfolio.`;
}

function formatDate(dateString) {
    if (!dateString) return "Recently updated";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function renderProjects() {
    const grid = $("#projectGrid");
    if (!grid) return;

    const query = searchValue.trim().toLowerCase();
    const filtered = allProjects.filter((project) => {
        const languageMatch = activeFilter === "all" || project.language === activeFilter || project.topics?.includes(activeFilter.toLowerCase());
        const searchableText = `${project.name} ${project.description} ${project.language} ${(project.topics || []).join(" ")}`.toLowerCase();
        const searchMatch = !query || searchableText.includes(query);
        return languageMatch && searchMatch;
    });

    if (!filtered.length) {
        grid.innerHTML = `<article class="project-card"><h3>No projects found</h3><p>Try another search keyword or filter.</p></article>`;
        return;
    }

    grid.innerHTML = filtered.map(createProjectCard).join("");
}

function createProjectCard(project) {
    const topics = (project.topics || []).slice(0, 4);
    const language = project.language || "Project";
    const liveLink = project.homepage ? `<a class="project-link" href="${project.homepage}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live</a>` : "";

    return `
        <article class="project-card reveal visible" data-language="${language}">
            <header>
                <div>
                    <div class="project-icon"><i class="fa-solid ${getProjectIcon(project.name, language)}"></i></div>
                </div>
                <div>
                    <h3>${escapeHtml(project.name)}</h3>
                    <p><i class="fa-solid fa-clock"></i> Updated ${formatDate(project.updated_at)}</p>
                </div>
            </header>
            <p>${escapeHtml(project.description)}</p>
            <div class="project-meta">
                <span class="project-tag"><i class="fa-solid fa-code"></i> ${escapeHtml(language)}</span>
                <span class="project-tag"><i class="fa-solid fa-star"></i> ${project.stargazers_count || 0}</span>
                <span class="project-tag"><i class="fa-solid fa-code-fork"></i> ${project.forks_count || 0}</span>
                ${topics.map((topic) => `<span class="project-tag">${escapeHtml(topic)}</span>`).join("")}
            </div>
            <div class="project-footer">
                <a class="project-link" href="${project.html_url}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> Source Code</a>
                ${liveLink}
            </div>
        </article>
    `;
}

function getProjectIcon(name, language) {
    const text = `${name} ${language}`.toLowerCase();
    if (text.includes("farm") || text.includes("inventory")) return "fa-seedling";
    if (text.includes("library") || text.includes("borrowing")) return "fa-book";
    if (text.includes("boarding") || text.includes("house")) return "fa-house";
    if (text.includes("user") || text.includes("login")) return "fa-users-gear";
    if (text.includes("portfolio")) return "fa-id-card";
    if (text.includes("barangay")) return "fa-landmark";
    return "fa-folder-open";
}

function escapeHtml(value) {
    return String(value || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function initProjectFilters() {
    const search = $("#projectSearch");
    const buttons = $$(".filter-btn");

    search?.addEventListener("input", (event) => {
        searchValue = event.target.value;
        renderProjects();
    });

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            buttons.forEach((item) => item.classList.remove("active"));
            button.classList.add("active");
            activeFilter = button.dataset.filter || "all";
            renderProjects();
        });
    });
}

function initContactForm() {
    const form = $("#contactForm");
    const copyButton = $("#copyEmail");
    const needsLinks = $$(".needs-link");

    form?.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = $("#name")?.value.trim();
        const email = $("#email")?.value.trim();
        const subject = $("#subject")?.value.trim();
        const message = $("#message")?.value.trim();

        const body = [
            `Hi Kenneth,`,
            ``,
            message,
            ``,
            `From: ${name}`,
            `Email: ${email}`
        ].join("\n");

        const mailto = `mailto:${CONFIG.primaryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
        showToast("Opening your email app with a prepared message.");
        form.reset();
    });

    copyButton?.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(CONFIG.primaryEmail);
            showToast("Email copied to clipboard.");
        } catch (error) {
            showToast(`Email: ${CONFIG.primaryEmail}`);
        }
    });

    needsLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            if (CONFIG.facebookUrl === "#") {
                event.preventDefault();
                showToast("Add your real Facebook link in script.js: CONFIG.facebookUrl.");
            }
        });
    });
}

function initCvDownload() {
    const button = $("#downloadCv");
    if (!button) return;

    button.addEventListener("click", () => {
        const cvContent = `Kenneth Borja\nInformation Technology Student / Web Developer\n\nLocation: Davao City, Philippines\nEmail: ${CONFIG.primaryEmail}\nSecondary Email: ${CONFIG.secondaryEmail}\nGitHub: ${CONFIG.githubProfile}\n\nProfile\nInformation Technology student focused on responsive websites, CRUD systems, PHP/Laravel, MySQL, UI/UX design, and practical IT projects.\n\nSkills\n- HTML, CSS, JavaScript\n- PHP, Laravel, MySQL\n- UI/UX and Figma\n- GitHub and project documentation\n- Network fundamentals\n\nFeatured Projects\n- farm-inventory-system\n- Library_Borrowing\n- boarding-house-system\n- user-management-system\n- My-Portfolio\n`;

        const blob = new Blob([cvContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Kenneth_Borja_CV.txt";
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
        showToast("CV file downloaded. You can replace it later with a PDF resume.");
    });
}

function initFooterYear() {
    const year = $("#currentYear");
    if (year) year.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNavigation();
    initScrollEffects();
    initRevealAnimations();
    initTypingText();
    initCursorGlow();
    initTiltCards();
    initProfileFallback();
    initProjectFilters();
    initContactForm();
    initCvDownload();
    initFooterYear();
    loadGitHubProjects();
});
