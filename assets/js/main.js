/* Draws the home page from data.js */

function renderHero() {
  const photo = document.querySelector("[data-photo]");
  if (SITE.photo) {
    photo.innerHTML = `<img src="${esc(assetUrl(SITE.photo))}" alt="${esc(SITE.name)}" width="112" height="112">`;
    photo.hidden = false;
  } else {
    photo.hidden = true;
  }
  document.querySelector("[data-role]").textContent = tr(SITE.role);
  document.querySelector("[data-intro]").textContent = tr(SITE.intro);
  document.querySelector("[data-availability]").textContent = tr(SITE.availability);
}

function metaRows(project) {
  const rows = [
    [ui("status"), [tr(project.status), project.year].filter(Boolean).join(", ")],
    [ui("role"), tr(project.role)],
    [ui("team"), tr(project.team)],
    [ui("builtWith"), (project.stack || []).map(tr).join(", ")],
  ].filter(([, value]) => value);
  return `<dl class="meta">${rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>`;
}

function projectLinks(project) {
  const links = [];
  if (project.demo && project.site) {
    links.push(`<a class="btn btn-primary" href="${esc(demoMailto(project))}">${esc(ui("requestDemo"))}</a>`);
  }
  if (project.site) {
    links.push(`<a class="btn" href="${esc(project.site)}" rel="noopener">${esc(ui("visitSite", { host: hostOf(project.site) }))}</a>`);
  }
  if (project.caseStudy) {
    links.push(`<a class="btn" href="project.html?id=${encodeURIComponent(project.id)}">${esc(ui("readCase"))}</a>`);
  }
  if (project.visibility === "public" && project.repoUrl) {
    links.push(`<a class="btn" href="${esc(project.repoUrl)}" rel="noopener">${esc(ui("viewCode"))}</a>`);
  }
  return links.length ? `<div class="actions">${links.join("")}</div>` : "";
}

function projectShot(project) {
  if (!project.image) return "";
  const host = project.site ? hostOf(project.site) : project.name;
  const img = `<img src="${esc(assetUrl(project.image))}" alt="${esc(tr(project.imageAlt) || project.name)}" data-fallback="${esc(host)}">`;
  return `<div class="project-shot">${project.site ? `<a href="${esc(project.site)}" rel="noopener" tabindex="-1" aria-hidden="true">${img}</a>` : img}</div>`;
}

function renderProject(p) {
  const shot = projectShot(p);
  const subtitle = tr(p.subtitle);
  const title = p.caseStudy
    ? `<a href="project.html?id=${encodeURIComponent(p.id)}">${esc(p.name)}</a>`
    : esc(p.name);
  return `
    <article class="project${shot ? " project-has-shot" : ""}">
      ${shot}
      <div class="project-body">
        <h3 class="project-title">${title}</h3>
        ${subtitle ? `<p class="project-subtitle">${esc(subtitle)}</p>` : ""}
        <p class="project-summary">${esc(tr(p.summary))}</p>
        ${p.note ? `<p class="project-note">${esc(tr(p.note))}</p>` : ""}
        ${metaRows(p)}
        ${p.demo && p.site ? `<p class="project-note">${esc(ui("serversOff"))}</p>` : ""}
        ${projectLinks(p)}
        ${p.visibility === "private" ? `<p class="private-note">${LOCK_ICON}${esc(ui("privateRepo"))}</p>` : ""}
      </div>
    </article>`;
}

function renderProjects() {
  const list = document.querySelector("[data-projects]");
  list.innerHTML = PROJECTS.map(renderProject).join("");
  attachImageFallbacks(list);
}

function renderUgc() {
  document.querySelector("[data-ugc-intro]").textContent = tr(UGC.intro);
  document.querySelector("[data-ugc]").innerHTML = UGC.items
    .map(
      (item) => `
      <li class="ugc">
        <div class="ugc-image"><img src="${esc(assetUrl(item.image))}" alt="${esc(tr(item.name))}" loading="lazy"></div>
        <h3>${esc(tr(item.name))}</h3>
        <p>${esc(tr(item.description))}</p>
      </li>`
    )
    .join("");
}

function renderTimeline() {
  document.querySelector("[data-about]").textContent = tr(SITE.about);
  document.querySelector("[data-timeline]").innerHTML = TIMELINE.map(
    (t) => `
    <li>
      <div class="tl-head">
        <h3>${esc(tr(t.title))}<span class="tl-place">${esc(tr(t.place))}</span></h3>
        <p class="tl-when">${esc(tr(t.when))}</p>
      </div>
      ${t.text ? `<p class="tl-text">${esc(tr(t.text))}</p>` : ""}
    </li>`
  ).join("");
}

function renderSkills() {
  document.querySelector("[data-skills]").innerHTML = SKILLS.map(
    (s) => `
    <div class="skill-group">
      <h3>${esc(tr(s.group))}</h3>
      <p>${esc(joinList(s.items))}</p>
    </div>`
  ).join("");
}

function renderHome() {
  document.title = ui("pageTitle");
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", ui("pageDescription"));
  renderHero();
  renderProjects();
  renderUgc();
  renderTimeline();
  renderSkills();
}

initTheme();
renderSharedLinks();
initLanguage(renderHome);
