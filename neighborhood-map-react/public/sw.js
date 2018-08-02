/**
 * Install the service worker and cache all resources.
 */
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open('neighborhood-map-1').then((cache) => {
			return cache.addAll([
			    '../App.css',
			    '../App.js',
			    '../index.css',
			    '../Location.js',
			    '../LocationList.js',
			    '../LocationsErrorBoundary.js',
			    '../Map.js',
			    '../MapErrorBoundary.js',
			    'favicon.png',
			    'index.html'
			]);
		})
	);
});

/**
 * On fetch, return cached items if present, otherwise fetch from web.
 */
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request, {ignoreSearch: true}).then((response) => {
			return response || fetch(event.request);
		})
	);
});
