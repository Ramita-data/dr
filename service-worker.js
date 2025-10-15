const cacheName = 'dreampop-cache-v1';
const assets = [
  'index.html',
  'manifest.json',
  'style.css',  // if exists
  'app.js',     // if exists
  'icon-192.png',
  'icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(assets))
      .catch(err => console.error('Cache failed:', err))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== cacheName)
            .map(key => caches.delete(key))
      )
    )
  );
});
