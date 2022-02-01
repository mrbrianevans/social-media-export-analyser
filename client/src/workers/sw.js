// this service worker is no longer used. An autogenerated worker is used. Defined in vite.config.ts
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('install', (event) => {
  console.log('Service worker installed')
  event.waitUntil(
    caches.open('v1').then((cache) => {
      //todo: cache all static files (js & css)
      // index.489b889d.js
      // index.e6a3c457.css
      // processingWorker.d17aca0b.js
      // sw.3a062542.js
      // vendor.2bf421a3.js
      // vendor.88f2bfd4.css
      return cache.addAll(['./icon/icon500.webp'])
    })
  )
})

self.addEventListener('fetch', (event) => {
  console.log('Fetch request to', event)
  event.respondWith(caches.match(event.request))
})
