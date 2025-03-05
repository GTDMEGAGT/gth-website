const CACHE_NAME = "site-cache-v1";

// List of files to cache
const CACHE_ASSETS = [
    "/",
    "/index.html",
    "/style.css",
    "/script.js",

    // Images
    "/images/1.png",
    "/images/2.png",
    "/images/3.png",
    "/images/4.png",
    "/images/5.png",
    "/images/6.png",
    "/images/7.png",
    "/images/8.png",
    "/images/9.png",
    "/images/digital brain.png",
    "/images/grid1.png",
    "/images/grid2.png",
    "/images/grid4.png",
    "/images/gthlogo.jpg",
    "/images/miladicode.png",
    "/images/thumbnail.png",
    "/images/youtube-ligo.png",

    // Videos
    "/videos/blackhole.mp4",
    "/videos/galaxy.mp4",
    "/videos/glob.mp4",
    "/videos/hero-video-1.mp4",
    "/videos/hero-video-2.mp4",
    "/videos/hero-video.mp4"
];

// Install event
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching files...");
            return cache.addAll(CACHE_ASSETS);
        })
    );
});

// Activate event
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Deleting old cache:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch event
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});