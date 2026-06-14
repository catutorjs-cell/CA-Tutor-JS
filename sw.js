const CACHE_NAME = 'ca-tutor-js-v5';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './styles/main.css',
  './styles/auth.css',
  './styles/modules.css',
  './js/app.js',
  './js/auth.js',
  './js/dashboard.js',
  './js/seedData.js',
  './js/state.js',
  './js/config.js',
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
  // ✅ Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // ✅ Skip non-http requests
  if (!url.protocol.startsWith('http')) return;

  // ✅ CRITICAL: Only intercept requests from our own origin
  // All external API calls (Groq, Gemini, Telegram, EmailJS etc.) pass through freely
  if (url.origin !== self.location.origin) return;

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