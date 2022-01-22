// store image in browser cache
const CACHE_NAME = "version-1";
const urlsToCache = ['index.html', 'offline.html'];

// Install SW
// self is ofc the serviceworker itself
// event, callback fn for what will happen after event
// ig is called only the first time page loads
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                // console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    )
});

// Listen for requests
/*
Matches all the requests that our page is receiving
eg: req for API calls, showing images, etc
if it cannot fetch data, no net conn, so we return offline.html
*/
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))
            })
    )
});

// Activate the service worker
/*
There can be different versions of caches
so first we remove all prev caches 

*/
self.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhiteList.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});

