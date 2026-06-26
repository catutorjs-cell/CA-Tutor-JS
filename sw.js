const CACHE_NAME = 'ca-tutor-js-v7';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './styles/main.css',
  './styles/auth.css',
  './styles/modules.css',
  './assets/logo.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  if (!url.protocol.startsWith('http')) return;

  // ✅ Never intercept external API calls
  if (url.origin !== self.location.origin) return;

  // ✅ Never cache JS files — always fetch fresh from network
  if (url.pathname.endsWith('.js')) return;

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
      .then(cached => {
        if (cached) return cached;
        return fetch(event.request)
          .then(response => {
            if (response && response.status === 200) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
            }
            return response;
          })
          .catch(() => caches.match('./index.html'));
      })
  );
});