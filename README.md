# Summit Haque

Personal academic website, hosted with GitHub Pages.

Live site: https://summit-haque.github.io/

## Files

- `index.html` — all page content
- `styles.css` — design (colors, type, layout, light and dark themes)
- `script.js` — theme toggle, publication filters, section highlighting
- `assets/` — optimized portrait (`portrait-480`/`960` in WebP and JPEG) and `Summit_Haque_CV.pdf`
- `favicon.svg` — browser tab icon

## Common updates

**Add a news item.** In `index.html`, find `<section ... id="news">` and add an `<li>` at the top of the list:

```html
<li>
  <time datetime="2026-11">Nov 2026</time>
  <p>What happened.</p>
</li>
```

**Add a publication.** Copy one `<li class="pub">` block in the Publications section. Set `data-type="peer"` for peer-reviewed work or `data-type="preprint"` for preprints; the filter counts update on their own. Wrap your name in `<b>…</b>`.

**Update the CV PDF.** Compile your LaTeX CV and replace `assets/Summit_Haque_CV.pdf`, keeping the same file name.

**Add Google Scholar or ORCID.** In the hero section, find the commented-out lines under "Add your profile URLs", fill in your links, and remove the comment markers.

**Change the photo.** Replace the four `assets/portrait-*` files with a 4:5 crop at 480 and 960 pixels wide. Keep each file well under 200 KB.
