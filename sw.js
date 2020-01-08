const staticCacheName = 'site-static';
const assets = [
    '/',
    '/index.html',
    '/index.js'
];

// install service worker
self.addEventListener('install', evt => {
    // console.log('Service worker has been installed.');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});

// activate event
self.addEventListener('activate', evt => {
    console.log('Service worker has been activated'); 
});

// fetch event
self.addEventListener('fetch', evt => {
    // console.log('Fetch event: ', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    )
});
