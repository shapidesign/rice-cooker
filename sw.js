const CACHE_NAME = 'ricey-v1';
const urlsToCache = [
  '/',
  '/cooking',
  '/static/js/main.js',
  '/static/css/main.css'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Background sync for timer
self.addEventListener('sync', event => {
  if (event.tag === 'timer-sync') {
    event.waitUntil(updateTimer());
  }
});

function updateTimer() {
  // This will be called when the app comes back online
  return Promise.resolve();
}

// Handle timer notifications
self.addEventListener('push', event => {
  const options = {
    body: 'Your rice is ready! 🍚',
    icon: '/logo192.png',
    badge: '/logo192.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open App',
        icon: '/logo192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Ricey Timer', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
