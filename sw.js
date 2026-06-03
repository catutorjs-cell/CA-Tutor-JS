const CACHE_NAME = 'ca-tutor-js-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './otp.html',
  './manifest.json',
  './styles/main.css',
  './styles/main.css?v=1.0.8',
  './styles/auth.css',
  './styles/auth.css?v=1.0.8',
  './styles/modules.css',
  './styles/modules.css?v=1.0.8',
  './js/app.js',
  './js/auth.js',
  './js/dashboard.js',
  './js/seedData.js',
  './js/state.js',
  './js/modules/analytics.js',
  './js/modules/decoder.js',
  './js/modules/evaluator.js',
  './js/modules/generator.js',
  './js/modules/mistakes.js',
  './js/modules/owner_console.js',
  './js/modules/pomodoro.js',
  './js/modules/profile.js',
  './js/modules/pyq_mtp.js',
  './js/modules/revision.js',
  './js/modules/social.js',
  './js/modules/syllabus.js',
  './assets/logo.png',
  'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js'
];

// Install Service Worker and cache all critical assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Pre-caching offline assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Service Worker and clean up older caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing old cache', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch strategy: Cache-First for static assets, Network-Fallback
self.addEventListener('fetch', event => {
  // Only intercept GET requests
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);

  // Ignore non-http(s) schemas like chrome-extension, file etc.
  if (!requestUrl.protocol.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(cachedResponse => {
      if (cachedResponse) {
        // Return cached asset immediately
        return cachedResponse;
      }

      // Fallback to network
      return fetch(event.request).then(networkResponse => {
        // Check if response is valid
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        // Cache the dynamically fetched item if it's from our own origin or a trusted CDN
        const shouldCache = requestUrl.origin === self.location.origin || 
                            requestUrl.hostname.includes('cdn.jsdelivr.net') || 
                            requestUrl.hostname.includes('cdnjs.cloudflare.com');

        if (shouldCache) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }

        return networkResponse;
      }).catch(err => {
        // If network request fails and it's a page request, return the cached index.html
        if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
          return caches.match('./index.html');
        }
        console.error('[Service Worker] Fetch failed:', err);
      });
    })
  );
});
