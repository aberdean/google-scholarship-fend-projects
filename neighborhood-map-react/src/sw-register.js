/**
 * Register service worker in development mode. 
 * From https://github.com/facebook/create-react-app/issues/2396
 */

export default function registerLocalServiceWorker() {
    const swPath = 'sw.js';
    if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'production') {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register(swPath).then(function(registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ',
                      registration.scope);
        }, function(err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }
}