/* Shared helpers for both pages: language, theme, escaping and links. */

const I18N = {
  en: {
    skip: "Skip to content",
    navProjects: "Projects",
    navExperience: "Experience",
    navSkills: "Skills",
    headProjects: "Projects",
    head3d: "3D work",
    show3d: "Show the models",
    hide3d: "Hide the models",
    headExperience: "Experience",
    headSkills: "Skills",
    emailMe: "Email me",
    email: "Email",
    status: "Status",
    role: "Role",
    team: "Team",
    builtWith: "Built with",
    readCase: "Read the case study",
    viewCode: "View the code on GitHub",
    privateRepo: "Private repository",
    requestDemo: "Request a live demo",
    visitSite: "Visit {host}",
    serversOff: "The servers are usually switched off. Request a demo and I'll turn them on.",
    demoSubject: "{name} demo request",
    demoBody: "Hi Alans,\n\nCould you turn on the {name} servers so I can look at {host}?\n\nWhen I'd like to look at it: \nCompany and role: \n\nThanks!",
    back: "Back to all projects",
    demoVideo: "Watch the demo video",
    notFoundTitle: "Project not found",
    notFoundText: "There's no project at this address. Go back to the project list to find it.",
    toDark: "Switch to dark theme",
    toLight: "Switch to light theme",
    langButton: "LV",
    langLabel: "Pārslēgt uz latviešu valodu",
    footer: "Written in HTML, CSS and JavaScript. Hosted on GitHub Pages.",
    noscript: "Turn on JavaScript to see the projects.",
    pageTitle: "Alans Ikaunieks | Portfolio",
    pageDescription: "Programming student in Riga, building web apps with Laravel, Vue and MySQL.",
  },
  lv: {
    skip: "Pāriet uz saturu",
    navProjects: "Projekti",
    navExperience: "Pieredze",
    navSkills: "Prasmes",
    headProjects: "Projekti",
    head3d: "3D darbi",
    show3d: "Rādīt modeļus",
    hide3d: "Paslēpt modeļus",
    headExperience: "Pieredze",
    headSkills: "Prasmes",
    emailMe: "Rakstīt e-pastu",
    email: "E-pasts",
    status: "Statuss",
    role: "Loma",
    team: "Komanda",
    builtWith: "Tehnoloģijas",
    readCase: "Lasīt projekta aprakstu",
    viewCode: "Skatīt kodu GitHub",
    privateRepo: "Privāts repozitorijs",
    requestDemo: "Pieprasīt demonstrāciju",
    visitSite: "Atvērt {host}",
    serversOff: "Serveri parasti ir izslēgti. Pieprasi demonstrāciju, un es tos ieslēgšu.",
    demoSubject: "{name} demonstrācijas pieprasījums",
    demoBody: "Labdien!\n\nVai varētu ieslēgt {name} serverus, lai es varētu apskatīt {host}?\n\nVēlamais laiks: \nUzņēmums un amats: \n\nPaldies!",
    back: "Atpakaļ uz projektiem",
    demoVideo: "Skatīties demonstrācijas video",
    notFoundTitle: "Projekts nav atrasts",
    notFoundText: "Šajā adresē projekta nav. Atgriezies projektu sarakstā, lai to atrastu.",
    toDark: "Pārslēgt uz tumšo režīmu",
    toLight: "Pārslēgt uz gaišo režīmu",
    langButton: "EN",
    langLabel: "Switch to English",
    footer: "Veidots ar HTML, CSS un JavaScript. Mitināts GitHub Pages.",
    noscript: "Ieslēdz JavaScript, lai redzētu projektus.",
    pageTitle: "Alans Ikaunieks | Portfolio",
    pageDescription: "Programmēšanas students Rīgā, kas veido tīmekļa lietotnes ar Laravel, Vue un MySQL.",
  },
};

/* ---------- Language ---------- */

let LANG = (function pickLanguage() {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (fromUrl === "en" || fromUrl === "lv") return fromUrl;
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "lv") return saved;
  } catch (e) {
    /* storage unavailable */
  }
  return (navigator.language || "").toLowerCase().startsWith("lv") ? "lv" : "en";
})();

/* Returns the text for the current language from a string or { en, lv }. */
function tr(value) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[LANG] ?? value.en ?? "";
}

/* Joins a list as "A, B and C" or, in Latvian, "A, B un C". */
function joinList(items) {
  const words = items.map(tr);
  if (words.length < 2) return words.join("");
  const and = LANG === "lv" ? "un" : "and";
  return `${words.slice(0, -1).join(", ")} ${and} ${words[words.length - 1]}`;
}

/* Interface strings, with {placeholders} filled in. */
function ui(key, vars = {}) {
  const text = I18N[LANG][key] ?? I18N.en[key] ?? key;
  return text.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? "");
}

function applyStaticText() {
  document.documentElement.lang = LANG;
  document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = ui(el.dataset.i18n)));
  const lang = document.querySelector(".lang-toggle");
  if (lang) {
    lang.textContent = ui("langButton");
    lang.setAttribute("aria-label", ui("langLabel"));
    lang.setAttribute("lang", LANG === "en" ? "lv" : "en");
  }
}

function initLanguage(render) {
  const button = document.querySelector(".lang-toggle");
  const update = () => {
    applyStaticText();
    syncThemeLabel();
    render();
  };
  if (button) {
    button.addEventListener("click", () => {
      LANG = LANG === "en" ? "lv" : "en";
      try {
        localStorage.setItem("lang", LANG);
      } catch (e) {
        /* the choice lasts for this visit only */
      }
      const url = new URL(location.href);
      if (url.searchParams.has("lang")) {
        url.searchParams.set("lang", LANG);
        history.replaceState(null, "", url);
      }
      update();
    });
  }
  update();
}

/* ---------- Theme ---------- */

const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = () => document.documentElement.dataset.theme || (darkQuery.matches ? "dark" : "light");

function syncThemeLabel() {
  const button = document.querySelector(".theme-toggle");
  if (!button) return;
  const theme = currentTheme();
  button.dataset.state = theme;
  button.setAttribute("aria-label", theme === "dark" ? ui("toLight") : ui("toDark"));
}

function initTheme() {
  const button = document.querySelector(".theme-toggle");
  if (!button) return;
  button.innerHTML =
    '<svg class="icon icon-sun" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="3.6" fill="currentColor"/><g stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M10 1.8v2.1M10 16.1v2.1M1.8 10h2.1M16.1 10h2.1M4.2 4.2l1.5 1.5M14.3 14.3l1.5 1.5M4.2 15.8l1.5-1.5M14.3 5.7l1.5-1.5"/></g></svg>' +
    '<svg class="icon icon-moon" viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M16.6 12.6A7 7 0 0 1 7.4 3.4a7 7 0 1 0 9.2 9.2Z"/></svg>';
  button.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* the choice lasts for this visit only */
    }
    syncThemeLabel();
  });
  if (darkQuery.addEventListener) darkQuery.addEventListener("change", syncThemeLabel);
}

/* ---------- Helpers ---------- */

const LOCK_ICON =
  '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M4 7V5a4 4 0 1 1 8 0v2h.5A1.5 1.5 0 0 1 14 8.5v5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5v-5A1.5 1.5 0 0 1 3.5 7H4Zm1.5 0h5V5a2.5 2.5 0 0 0-5 0v2Z"/></svg>';

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* File paths can contain spaces or "+", so encode them for use in src="" */
function assetUrl(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

function mailto(subject, body) {
  const query = [];
  if (subject) query.push("subject=" + encodeURIComponent(subject));
  if (body) query.push("body=" + encodeURIComponent(body));
  return "mailto:" + SITE.email + (query.length ? "?" + query.join("&") : "");
}

function hostOf(url) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch (e) {
    return url;
  }
}

function demoMailto(project) {
  const vars = { name: project.name, host: hostOf(project.site) };
  return mailto(ui("demoSubject", vars), ui("demoBody", vars));
}

function githubUrl() {
  return `https://github.com/${SITE.github}`;
}

/* Header and footer links that every page shares. */
function renderSharedLinks() {
  document.querySelectorAll("[data-email-link]").forEach((a) => (a.href = mailto()));
  document.querySelectorAll("[data-github-link]").forEach((a) => (a.href = githubUrl()));
  document.querySelectorAll("[data-linkedin-link]").forEach((a) => {
    if (SITE.linkedin) a.href = SITE.linkedin;
    else a.hidden = true;
  });
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
}

/* Replace a screenshot that fails to load with a simple placeholder. */
function attachImageFallbacks(root) {
  root.querySelectorAll("img[data-fallback]").forEach((img) => {
    const swap = () => {
      const box = document.createElement("div");
      box.className = "shot-fallback";
      box.textContent = img.dataset.fallback;
      img.replaceWith(box);
    };
    if (img.complete && img.naturalWidth === 0) swap();
    else img.addEventListener("error", swap, { once: true });
  });
}
