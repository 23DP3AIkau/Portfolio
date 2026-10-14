/* Draws a project write-up (project.html?id=...) from data.js */

function renderSection(section) {
  let body = "";
  if (section.paragraphs) body += section.paragraphs.map((p) => `<p>${esc(tr(p))}</p>`).join("");
  if (section.list) {
    body += `<dl class="feature-list">${section.list
      .map(([term, text]) => `<div><dt>${esc(tr(term))}</dt><dd>${esc(tr(text))}</dd></div>`)
      .join("")}</dl>`;
  }
  return `<section><h2>${esc(tr(section.heading))}</h2>${body}</section>`;
}

function renderImages(images) {
  if (!images || !images.length) return "";
  return `
    <section>
      <div class="shots">
        ${images
          .map(
            (img) => `
          <figure>
            <img src="${esc(assetUrl(img.src))}" alt="${esc(tr(img.alt))}" loading="lazy">
            ${img.caption ? `<figcaption>${esc(tr(img.caption))}</figcaption>` : ""}
          </figure>`
          )
          .join("")}
      </div>
    </section>`;
}

function renderSnippets(snippets) {
  if (!snippets || !snippets.length) return "";
  return `
    <section>
      ${snippets
        .map(
          (s) => `
        <figure class="snippet">
          <figcaption>${esc(tr(s.title))}${s.lang ? ` <span class="muted">(${esc(s.lang)})</span>` : ""}</figcaption>
          <pre><code>${esc(s.code)}</code></pre>
        </figure>`
        )
        .join("")}
    </section>`;
}

function renderNotFound(main) {
  document.title = `${ui("notFoundTitle")} | ${SITE.name}`;
  main.innerHTML = `
    <div class="wrap case-head">
      <a class="back" href="./#projects">${esc(ui("back"))}</a>
      <h1 class="case-title">${esc(ui("notFoundTitle"))}</h1>
      <p class="case-lead">${esc(ui("notFoundText"))}</p>
    </div>`;
}

function renderCase() {
  const main = document.querySelector("#main");
  const id = new URLSearchParams(location.search).get("id");
  const p = PROJECTS.find((x) => x.id === id && x.caseStudy);
  if (!p) return renderNotFound(main);

  const cs = p.caseStudy;
  document.title = `${p.name} | ${SITE.name}`;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", tr(p.summary));

  const meta = [
    [ui("status"), [tr(p.status), p.year].filter(Boolean).join(", ")],
    [ui("role"), tr(p.role)],
    [ui("team"), tr(p.team)],
    [ui("builtWith"), (p.stack || []).map(tr).join(", ")],
  ].filter(([, v]) => v);

  const links = [];
  if (p.visibility === "public" && p.repoUrl) {
    links.push(`<a class="btn btn-primary" href="${esc(p.repoUrl)}" rel="noopener">${esc(ui("viewCode"))}</a>`);
  }
  if (p.demo && p.site) {
    links.push(`<a class="btn btn-primary" href="${esc(demoMailto(p))}">${esc(ui("requestDemo"))}</a>`);
  }
  if (p.site) {
    links.push(`<a class="btn" href="${esc(p.site)}" rel="noopener">${esc(ui("visitSite", { host: hostOf(p.site) }))}</a>`);
  }

  main.innerHTML = `
    <div class="wrap case-head">
      <a class="back" href="./#projects">${esc(ui("back"))}</a>
      <h1 class="case-title">${esc(p.name)}</h1>
      <p class="case-lead">${esc(tr(p.summary))}</p>
    </div>
    <div class="wrap case-grid">
      <aside class="case-aside">
        <dl class="meta meta-stacked">${meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
        ${links.length ? `<div class="actions">${links.join("")}</div>` : ""}
        ${p.visibility === "private" ? `<p class="private-note">${LOCK_ICON}${esc(ui("privateRepo"))}</p>` : ""}
      </aside>
      <article class="prose">
        ${cs.sections.map(renderSection).join("")}
        ${renderImages(cs.images)}
        ${renderSnippets(cs.snippets)}
        ${cs.video ? `<section><p><a class="text-link" href="${esc(cs.video)}" rel="noopener">${esc(ui("demoVideo"))}</a></p></section>` : ""}
      </article>
    </div>`;
}

initTheme();
renderSharedLinks();
initLanguage(renderCase);
