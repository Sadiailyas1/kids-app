# Little Learners Worksheets

A small installable app (PWA) for sharing kids' worksheets. Works on any phone
straight from a browser, and can be added to the home screen like a real app.

## How to put this on GitHub and share it

1. **Create a new GitHub repo** (e.g. `kids-worksheets`) — public, so anyone
   with the link can view it.
2. **Upload all files in this folder** to the repo, keeping the folder
   structure (`worksheets/`, `icons/`, etc.) exactly as-is.
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment," set **Source: Deploy from a branch**,
   branch: `main`, folder: `/ (root)`. Save.
5. Wait ~1 minute. GitHub will give you a live link like:
   `https://yourusername.github.io/kids-worksheets/`
6. Share that link with anyone. On their phone, opening the link in
   Chrome or Safari will offer **"Add to Home Screen"** — after that it
   opens full-screen like a real app icon, and works offline.

## How to add a new worksheet

1. Duplicate a file in `worksheets/`, e.g. copy `shapes-match.html` to
   `worksheets/colors-match.html`.
2. Edit the `<h1>`, instructions, and content inside.
3. Add a new card to `index.html` (copy one `<a class="card ...">` block,
   change the emoji, title, and `href`).
4. Add the new file's path to the `FILES_TO_CACHE` list in
   `service-worker.js` so it's available offline too.
5. Push the changes to GitHub — the live link updates automatically.

## Files

- `index.html` — home screen listing all worksheets
- `worksheets/*.html` — individual worksheet pages
- `style.css` — all visual styling
- `app.js` — install prompt + "mark as done" tracking (saved on-device)
- `manifest.json` — tells phones this is an installable app
- `service-worker.js` — makes it work offline once installed
- `icons/` — app icon in two sizes

## Notes

- "Mark as done" is saved only on that child's device (not shared
  anywhere), so it's private by default.
- If a worksheet doesn't show updates after you edit it, that's the
  service worker's cache — bump `CACHE_NAME` (e.g. `v1` → `v2`) in
  `service-worker.js` and it'll refresh.
