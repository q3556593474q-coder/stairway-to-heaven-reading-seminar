import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const content = JSON.parse(await readFile(path.join(root, 'site-content.json'), 'utf8'));
const output = path.join(root, 'dist');
const escape = (value = '') => String(value).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dateLabel = value => new Intl.DateTimeFormat('en-US', {month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}).format(new Date(value + 'T12:00:00Z'));
const favicon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%231a3144'/%3E%3Cpath d='M7 25h6v-6h6v-6h6V7' fill='none' stroke='%23f5f3ee' stroke-width='3'/%3E%3C/svg%3E";

function header(page, prefix) {
  const seminarIsCurrent = content.seminars.some(item => item.id === page);
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="masthead"><a class="quote" href="${prefix}index.html" aria-label="Return to homepage"><span>${escape(content.quote)}</span><span class="attribution">${escape(content.attribution)}</span></a></header>
  <nav class="navigation" aria-label="Main navigation"><div class="nav-inner">
    <a class="nav-top-link nav-home" href="${prefix}index.html"${page === 'home' ? ' aria-current="page"' : ''}>Homepage</a>
    <details class="nav-dropdown${seminarIsCurrent ? ' has-current-page' : ''}" data-nav-dropdown>
      <summary class="nav-trigger" aria-controls="seminars-menu">Seminars<span class="nav-chevron" aria-hidden="true"></span></summary>
      <div class="nav-menu-wrap"><ul class="nav-menu" id="seminars-menu" aria-label="Seminars">${content.seminars.map(item => `<li><a href="${prefix}${escape(item.id)}/index.html"${item.id === page ? ' aria-current="page"' : ''}><span>${escape(item.title)}</span><span class="nav-item-arrow" aria-hidden="true">→</span></a></li>`).join('')}</ul></div>
    </details>
    <a class="nav-top-link nav-more" href="${prefix}about/index.html"${page === 'about' ? ' aria-current="page"' : ''}>More Information</a>
  </div></nav>`;
}

function hero(title, cover, prefix, author = '') {
  return `<section class="hero${author ? '' : ' topic-hero'}" aria-labelledby="page-title">
    <img class="hero-image" src="${prefix}assets/images/${escape(cover.file)}" alt="${escape(cover.alt)}" style="object-position:${escape(cover.position)}" fetchpriority="high" width="2000" height="1333">
    <div class="hero-soften" aria-hidden="true"></div>
    <div class="hero-caption"><h1 id="page-title">${escape(title)}</h1>${author ? `<p class="hero-author">${escape(author)}</p>` : ''}</div>
  </section>`;
}

function section(id, title, inner) {
  return `<section class="content-section" aria-labelledby="${id}"><h2 class="section-heading" id="${id}"><span class="section-title-text">${escape(title)}</span></h2>${inner}</section>`;
}

function paragraphs(items) {
  return (Array.isArray(items) ? items : [items]).filter(Boolean).map(text => `<p>${escape(text)}</p>`).join('');
}

function disclosure(id, title, inner, bodyClass = '') {
  return `<section class="content-section" aria-labelledby="${id}"><details class="section-disclosure" data-accordion>
    <summary class="section-summary"><h2 class="section-heading" id="${id}"><span class="section-title-text">${escape(title)}</span><span class="disclosure-toggle" aria-hidden="true"></span></h2></summary>
    <div class="disclosure-body ${bodyClass}" data-accordion-body>${inner}</div>
  </details></section>`;
}

function seminarInformation(seminar) {
  return `<p class="textbook-note"><strong>Textbook Used:</strong><span>${escape(seminar.textbook)}</span></p>
    <div class="participants-note"><p><strong>Participants:</strong></p><div class="participant-note"><strong>Mentor:</strong><span class="participant-name">${escape(seminar.mentor.name)}</span></div><div class="participant-note"><strong>Student:</strong><span class="participant-name">${escape(seminar.student.name)}</span></div></div>`;
}

function entry(item, prefix) {
  return `<details class="seminar-entry" id="${escape(item.id)}" data-accordion>
    <summary><span class="entry-line"><time datetime="${escape(item.date)}">${dateLabel(item.date)},</time> <strong>${escape(item.speaker)}</strong><span class="entry-comma">,</span> <span class="talk-title">${escape(item.title)}</span></span><span class="entry-toggle" aria-hidden="true"></span></summary>
    <div class="entry-body" data-accordion-body><ul><li><p>${escape(item.abstract)}</p></li><li class="pdf-link"><a href="${prefix}assets/notes/${escape(item.pdf)}" target="_blank" rel="noopener">${escape(item.pdfLabel || 'Lecture notes (PDF)')}</a><span class="pdf-divider" aria-hidden="true">·</span><a class="download-link" href="${prefix}assets/notes/${escape(item.pdf)}" download>Download</a></li>${item.discussionPdf ? `<li class="discussion-link">Further complement from discussion <a href="${prefix}assets/notes/${escape(item.discussionPdf)}" target="_blank" rel="noopener" aria-label="Further complement from discussion (PDF)">PDF</a></li>` : ''}${item.handwritingPdf ? `<li class="discussion-link">Original Handwriting Version <a href="${prefix}assets/notes/${escape(item.handwritingPdf)}" target="_blank" rel="noopener" aria-label="Original Handwriting Version (PDF)">PDF</a></li>` : ''}</ul></div>
  </details>`;
}

function layout(page, title, prefix, body) {
  const canonicalUrl = new URL(page === 'home' ? '' : `${page}/`, content.siteUrl).href;
  return `<!doctype html>
<html lang="en"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escape(page === 'home' ? content.title + ' — mathematical reading and notes by ' + content.author + '.' : title + ' | ' + content.title)}">
  <meta name="author" content="${escape(content.author)}">
  <link rel="canonical" href="${escape(canonicalUrl)}">
  <meta name="theme-color" content="#193247">
  <title>${escape(page === 'home' ? content.title : title + ' — ' + content.title)}</title>
  <link rel="icon" type="image/svg+xml" href="${favicon}">
  <link rel="preload" as="font" type="font/ttf" href="${prefix}assets/fonts/pinyon-script.ttf" crossorigin>
  <link rel="stylesheet" href="${prefix}assets/site.css">
</head><body data-page="${page}">
  ${header(page, prefix)}
  <main id="main" class="page-shell">${body}</main>
  <footer class="footer"><a class="site-name" href="${prefix}index.html">${escape(content.title)}</a><span>© ${content.copyrightYear} ${escape(content.author)}. All rights reserved.</span></footer>
  <script src="${prefix}assets/site.js" defer></script>
</body></html>\n`;
}

await mkdir(output, {recursive:true});
const recent = content.seminars.flatMap(seminar => seminar.entries.filter(item => !item.sample).map(item => ({...item, seminar:seminar.id}))).sort((a,b) => b.date.localeCompare(a.date)).slice(0,8);
const updateContent = recent.length ? `<ul class="updates-list">${recent.map(item => `<li><time datetime="${item.date}">${dateLabel(item.date)}</time><a href="${item.seminar}/index.html#${item.id}">${escape(item.title)}</a></li>`).join('')}</ul>` : '<div class="blank-space" aria-hidden="true"></div>';
const home = hero('Reading Seminars', content.homeCover, '', content.author) + `<div class="paper">${disclosure('introduction-title', 'Introduction of the program', paragraphs(content.introduction))}${section('updates-title','Recent Updates',updateContent)}</div>`;
await writeFile(path.join(output,'index.html'),layout('home',content.title,'',home));
for (const seminar of content.seminars) {
  const body = hero(seminar.title,seminar.cover,'../') + `<div class="paper seminar-paper">${disclosure('information-title','Information',seminarInformation(seminar),'seminar-information')}${section('history-title','History & Progress',seminar.entries.length ? `<div class="entries">${seminar.entries.map(item => entry(item,'../')).join('')}</div>` : '<div class="blank-space history-blank" aria-hidden="true"></div>')}</div>`;
  await mkdir(path.join(output,seminar.id),{recursive:true});
  await writeFile(path.join(output,seminar.id,'index.html'),layout(seminar.id,seminar.title,'../',body));
}
await mkdir(path.join(output,'about'),{recursive:true});
const about = hero('More Information',content.informationCover,'../') + `<div class="paper more-information-paper">${content.aboutSections.map(item => disclosure(item.id,item.title,paragraphs(item.paragraphs))).join('')}</div>`;
await writeFile(path.join(output,'about','index.html'),layout('about','More Information','../',about));
await writeFile(path.join(output,'.nojekyll'),'');
const sitemapPages = ['', ...content.seminars.map(seminar => `${seminar.id}/`), 'about/'];
await writeFile(path.join(output,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPages.map(page => `  <url><loc>${escape(new URL(page, content.siteUrl).href)}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log('Rendered homepage, three seminar pages, and More Information.');
