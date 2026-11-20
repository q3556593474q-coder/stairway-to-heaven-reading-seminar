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

Edit `site-content.json`, then run `node render.mjs`. This regenerates all seven HTML pages. `recentUpdateIds` explicitly selects which real entries appear under Recent Updates; it currently contains only `obstruction-theory-2026-11-16`, as requested. Removing this field restores automatic listing of the latest eight non-sample entries; an empty array hides all updates.

- Put PDFs in `dist/assets/notes/`, using stable English filenames.
- Add an entry to the relevant collection's `entries` array (`seminars` or `lectureMaterials`): `id`, `date` (YYYY-MM-DD), `speaker`, `title`, `abstract`, `pdf`, and optional `pdfLabel`.
- Use a stable entry ID so previously shared links remain valid.
- Set `sample: false` or omit it for real entries. Add their IDs to `recentUpdateIds` only when the owner wants them featured on the homepage.
- To remove a sample or real entry later, delete its object from `entries` and render again. Remove its PDF files only when no remaining entry links to them. Commit and push the change to update the published website. Git history preserves earlier revisions.
- Both seminars list textbooks and participants without Mentor/Student role labels. Email fields have been removed.
- `introduction` contains the owner's approved program description, with the opening sentence in its own paragraph. About Me links to the owner's supplied CV, which is updated regularly. About My Mentors lists Jingcao Wu and Hongzhi Liu, with bold names and links to their supplied SUFE faculty pages. These entries use the `profiles` array with `name` and `url`.
- About-section attachments use `pdf` (a filename in `dist/assets/notes/`) and `pdfLabel`. The current CV is `hanzhen-bao-cv.pdf`, displayed as a blue “CV” link opening in a new tab. For a replacement CV, use a new dated filename and update `pdf` so the release revision changes and visitors receive the latest file.
- `discussionPdf` adds a separate Further complement from discussion PDF link to an entry. It can point to a different file when real discussion supplements are available.
- `handwritingPdf` adds an Original Handwriting Version PDF link on the next line. Keep the handwritten original in its own file so it can be updated independently of the typed notes and discussion supplement.
- Set `showDownload: false` to display only the primary PDF link for an entry.
- Preserve supplied PDFs byte-for-byte. The Covering maps sample entry and its two unused demonstration PDFs were removed at the owner’s request on 2026-11-20; earlier versions remain in Git history.

## Cover and layout updates

The seven active cover images are in `dist/assets/images/`. Replace files or update their filenames, alternative text, and crop position in `site-content.json`. Photo sources and generated cover details are in `ASSET-CREDITS.md`; the three new section prompts are in `NEW-COVER-PROMPTS.md`.

The top navigation is Homepage, Seminars, Lecture Materials, and More Information. The two dropdowns are generated from the `seminars` and `lectureMaterials` arrays; adding a collection automatically adds its menu link, page, and sitemap entry. On narrow screens the navigation occupies two rows and menu panels stay inside the viewport. Opening one dropdown closes the other. Its pale blue-gray gradient panel uses background blur, opens on mouse hover, and stays open while the pointer moves into the panel. It closes when the pointer leaves the trigger and panel, focus leaves, Escape is pressed, or the user clicks outside. Touch users can tap to toggle it; keyboard users can press Enter, Space, or an arrow key on Seminars and follow the links with Tab. Without JavaScript, the native disclosure remains clickable. Long menus scroll within the available viewport.

The Algebraic Topology page keeps its existing `topology/` URL. The empty Differentiable Manifolds section and page were removed on 2026-11-18 because its subject will be covered together with Riemann Geometry; Reading Journal was removed on 2026-11-20. Remaining page URLs are preserved. Homepage introduction, seminar Information sections, and the two More Information sections use shared, initially collapsed accordions. History & Progress and Recent Updates remain visible sections. The paper section headings are black, bold, and compressed vertically by 6%; the date/speaker/talk typography is unchanged.

Styles live in `dist/assets/site.css`; optional navigation and accordion enhancements live in `dist/assets/site.js`. Fonts are hosted locally, with their OFL licenses beside them. The site does not depend on a remote font service.

## Publication

The repository keeps the complete source on `main`. In Settings → Pages, use GitHub Actions as the publishing source. `.github/workflows/pages.yml` renders the website and publishes only `dist/` whenever `main` is updated. The README, content data, and generator remain in the repository without becoming extra website pages. A manual run is also available through the Actions tab.

Before each publication, regenerate pages and check the affected links and images. Keep PDF attachment bytes unchanged. `siteUrl` determines the canonical page addresses and the generated `sitemap.xml`; update it if the public website address changes.

## Algebraic Topology reading seminar

Seven entries follow the owner’s supplied order: Homology 1 (September 22), Homology 2 (September 29), Homotopy 1 (October 16), Homotopy 2 (October 21), Vector Bundles and Characteristic Classes 1 (November 5), Vector Bundles and Characteristic Classes 2 (November 10), and Obstruction Theory (November 16), all in 2026 and attributed to `Y-B`. Each contains its PDF’s original abstract and one Notes (PDF) link. Participants are LingYu Yu, Hanzhen Bao, Jingcao Wu (Sufe Mentor), and Hongzhi Liu (Sufe Mentor); the same list is used for Riemannian Geometry.

Textbooks were verified against primary sources: Allen Hatcher’s [Algebraic Topology](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html), and John Milnor and James D. Stasheff’s [Characteristic Classes](https://press.princeton.edu/books/paperback/9780691081229/characteristic-classes).

## Riemannian Geometry reading seminar

The Riemannian Geometry title retains its existing `riemann-geometry/` URL. Its seven entries follow the owner's chronological order: September 25, October 9, October 14, October 19, October 27, November 2, and November 5, 2026. The first five are attributed to `Y-B`, and Supplement 1 and Supplement 2 to `B`. Titles follow the source filenames; abstracts are copied from the first-page Abstract sections with line-wrap hyphenation removed. PDFs are preserved byte-for-byte and each entry displays one PDF link. These entries remain in the seminar history; the homepage now features only Obstruction Theory from Algebraic Topology.

This seminar uses `textbooks` and `participants` arrays; participants are listed without Mentor/Student roles. The English translation used for Wu's title is *An Introduction to Riemannian Geometry*. Bibliographic checks: [Higher Education Press](https://academic.hep.com.cn/im/CN/book/978-7-04-040458-6) and [do Carmo's publisher](https://link.springer.com/book/9780817634902).

## Lecture Materials

Lecture Materials contains Complex Analysis, Basic Topology, and Classical Differential Geometry. Each has an initially collapsed Information & Introduction section and an always-visible History & Progress section; all three collections are currently empty. Fill each collection’s `introduction` array with paragraphs and its `entries` array with PDFs and notes as needed.

Classical Differential Geometry reuses the former Differentiable Manifolds cover (`manifolds.jpg`), retaining the established architectural style. Its Information & Introduction and History & Progress are ready for future materials.

On 2026-11-20, Reading Journal and More Information About the Textbooks Used were removed at the owner’s request. Their prior content remains recoverable from Git history; the journal cover is retained as an unused asset.

## Navigation and cache consistency

The desktop navigation uses four equal-width columns with centered labels and matching underline positions. Narrow screens use a balanced two-by-two grid.

`render.mjs` derives a deterministic build revision from the content, generator, CSS, and JavaScript. Every internal page link and the CSS/JavaScript URLs carry `?v=<revision>`; canonical URLs stay clean. This prevents a new page from loading an older cached stylesheet, and makes navigation fetch pages from the same release rather than an older cached menu. When sharing a just-published fix with an existing visitor, use the generated homepage link with its revision to bypass any cached entry page. The revision is also recorded in the `site-build` meta tag.
