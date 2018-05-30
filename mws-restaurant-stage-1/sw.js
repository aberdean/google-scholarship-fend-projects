/**
 * Install the service worker and cache all resources.
 */
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open('rr-static-v1').then((cache) => {
			return cache.addAll([
				'/',	
				'restaurant.html',
				'index.html',
				'js/main.js',
				'js/dbhelper.js',
				'js/restaurant_info.js',
				'css/styles.css',
				'img/1.jpg',
				'img/2.jpg',
				'img/3.jpg',
				'img/4.jpg',
				'img/5.jpg',
				'img/6.jpg',
				'img/7.jpg',
				'img/8.jpg',
				'img/9.jpg',
				'img/10.jpg',
				'/data/restaurants.json'
			]);
		})
	);
});

/**
 * On fetch, return cached items if present, otherwise fetch from web.
 */
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});
