const CACHE_NAME = 'dhara-alert-pwa-v3';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/manifest.json'
];

// Install Event: Cache core shell safely
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const asset of STATIC_ASSETS) {
        try {
          await cache.add(asset);
        } catch (e) {
          console.warn('SW: Optional asset skipped during pre-cache:', asset);
        }
      }
    })
  );
  self.skipWaiting();
});

// Activate Event: Clear older caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event: Network-First with Cache Fallback for dynamic/static resources
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Map Tiles (OpenStreetMap, Carto, etc.)
  if (url.hostname.includes('tile.openstreetmap.org') || url.hostname.includes('cartocdn.com') || url.pathname.includes('/tile/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(event.request);
        try {
          const fresh = await fetch(event.request);
          if (fresh && fresh.status === 200) {
            cache.put(event.request, fresh.clone());
          }
          return fresh;
        } catch (err) {
          return cached || new Response('', { status: 408 });
        }
      })
    );
    return;
  }

  // App Resources & Navigation
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone)).catch(() => {});
        }
        return networkResponse;
      })
      .catch(async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return (await caches.match('/index.html')) || (await caches.match('/'));
        }
        return new Response('Offline resource unavailable', { status: 503 });
      })
  );
});


