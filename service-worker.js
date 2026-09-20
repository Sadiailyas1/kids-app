// Bump this version any time you add or change files, so devices fetch the fresh copies.
const CACHE_NAME = "little-learners-v3";

// List every file the app needs to work offline.
// Add a new line here each time you add a worksheet page.
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./worksheets/counting-1-10.html",
  "./worksheets/alphabet-trace.html",
  "./worksheets/shapes-match.html",
  "./worksheets/mental-math-trail.html",
  "./worksheets/rise-of-muslim-rule.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
