# StairwayToHeavenReadingSeminar

All-English reading seminar website for Hanzhen Bao.

## Ownership and hosting

- GitHub owner: `q3556593474q-coder`
- Repository: `https://github.com/q3556593474q-coder/stairway-to-heaven-reading-seminar`
- Website URL: `https://q3556593474q-coder.github.io/stairway-to-heaven-reading-seminar/`
- The user authorized public GitHub Pages publication of the current version, including the sample entry, on 2026-09-14. GitHub Pages is configured to publish through GitHub Actions with HTTPS enabled.
- This is a portable static site, not a registered Sites-hosted project. Preserve the user's hosting choice.

## Preview and files

`dist/` contains the complete website. Its HTML pages use relative paths, so the site can run at a domain root, under a GitHub Pages project path, or directly from the filesystem.

To preview locally, serve `dist/` with any static web server. There are no runtime dependencies, databases, accounts, or upload forms.

## Content updates

Edit `site-content.json`, then run `node render.mjs`. This regenerates all seven HTML pages and automatically lists non-sample entries from seminars and lecture materials under Recent Updates. The initial trial entry has `sample: true`, so the homepage remains empty as requested.

- Put PDFs in `dist/assets/notes/`, using stable English filenames.
- Add an entry to the relevant collection's `entries` array (`seminars` or `lectureMaterials`): `id`, `date` (YYYY-MM-DD), `speaker`, `title`, `abstract`, `pdf`, and optional `pdfLabel`.
- Use a stable entry ID so previously shared links remain valid.
- Set `sample: false` or omit it for a real entry to appear in Recent Updates.
- To remove a sample or real entry later, delete its object from `entries` and render again. Remove its PDF files only when no remaining entry links to them. Commit and push the change to update the published website. Git history preserves earlier revisions.
- Mentor and student names and textbook descriptions are intentionally blank. Email fields have been removed.
- `introduction` contains the owner's approved program description, with the opening sentence in its own paragraph. `aboutSections` still contains demonstration paragraphs requested for preview; replace those before treating them as a finished biography.
- `discussionPdf` adds a separate Further complement from discussion PDF link to an entry. It can point to a different file when real discussion supplements are available.
- `handwritingPdf` adds an Original Handwriting Version PDF link on the next line. Keep the handwritten original in its own file so it can be updated independently of the typed notes and discussion supplement.
- Keep the provided PDF unchanged. The current one-page demonstration PDF is intentionally used for the main notes, discussion supplement, and handwritten original links. The Covering maps description is sample text, not a summary of the attachment.

## Cover and layout updates

The seven active cover images are in `dist/assets/images/`. Replace files or update their filenames, alternative text, and crop position in `site-content.json`. Photo sources and generated cover details are in `ASSET-CREDITS.md`; the three new section prompts are in `NEW-COVER-PROMPTS.md`.

The top navigation is Homepage, Seminars, Lecture Materials, and More Information. The two dropdowns are generated from the `seminars` and `lectureMaterials` arrays; adding a collection automatically adds its menu link, page, and sitemap entry. On narrow screens the navigation occupies two rows and menu panels stay inside the viewport. Opening one dropdown closes the other. Its pale blue-gray gradient panel uses background blur, opens on mouse hover, and stays open while the pointer moves into the panel. It closes when the pointer leaves the trigger and panel, focus leaves, Escape is pressed, or the user clicks outside. Touch users can tap to toggle it; keyboard users can press Enter, Space, or an arrow key on Seminars and follow the links with Tab. Without JavaScript, the native disclosure remains clickable. Long menus scroll within the available viewport.

The Algebraic Topology page keeps its existing `topology/` URL. The empty Differentiable Manifolds section and page were removed on 2026-11-18 because its subject will be covered together with Riemann Geometry; Reading Journal was removed on 2026-11-20. Remaining page URLs are preserved. Homepage introduction, seminar Information sections, and the two More Information sections use shared, initially collapsed accordions. History & Progress and Recent Updates remain visible sections. The paper section headings are black, bold, and compressed vertically by 6%; the date/speaker/talk typography is unchanged.

Styles live in `dist/assets/site.css`; optional navigation and accordion enhancements live in `dist/assets/site.js`. Fonts are hosted locally, with their OFL licenses beside them. The site does not depend on a remote font service.

## Publication

The repository keeps the complete source on `main`. In Settings → Pages, use GitHub Actions as the publishing source. `.github/workflows/pages.yml` renders the website and publishes only `dist/` whenever `main` is updated. The README, content data, and generator remain in the repository without becoming extra website pages. A manual run is also available through the Actions tab.

Before each publication, regenerate pages and check the affected links and images. Keep PDF attachment bytes unchanged. `siteUrl` determines the canonical page addresses and the generated `sitemap.xml`; update it if the public website address changes.

## Lecture Materials

Lecture Materials contains Complex Analysis, Basic Topology, and Classical Differential Geometry. Each has an initially collapsed Information & Introduction section and an always-visible History & Progress section; all three collections are currently empty. Fill each collection’s `introduction` array with paragraphs and its `entries` array with PDFs and notes as needed.

Classical Differential Geometry reuses the former Differentiable Manifolds cover (`manifolds.jpg`), retaining the established architectural style. Its Information & Introduction and History & Progress are ready for future materials.

On 2026-11-20, Reading Journal and More Information About the Textbooks Used were removed at the owner’s request. Their prior content remains recoverable from Git history; the journal cover is retained as an unused asset.

## Navigation and cache consistency

The desktop navigation uses four equal-width columns with centered labels and matching underline positions. Narrow screens use a balanced two-by-two grid.

`render.mjs` derives a deterministic build revision from the content, generator, CSS, and JavaScript. Every internal page link and the CSS/JavaScript URLs carry `?v=<revision>`; canonical URLs stay clean. This prevents a new page from loading an older cached stylesheet, and makes navigation fetch pages from the same release rather than an older cached menu. When sharing a just-published fix with an existing visitor, use the generated homepage link with its revision to bypass any cached entry page. The revision is also recorded in the `site-build` meta tag.
