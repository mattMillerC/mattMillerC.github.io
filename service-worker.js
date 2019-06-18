var CACHE_NAME = "my-site-cache-v7";
var urlsToCache = [
    "/index.html",
    "/backgrounds.html",
    "/bestiary.html",
    "/classes.html",
    "/conditions.html",
    "/cults.html",
    "/favicon.ico",
    "/feats.html",
    "/items.html",
    "/psionics.html",
    "/races.html",
    "/rewards.html",
    "/rules.html",
    "/spells.html",
    "/variantrules.html",

    "/css/material-components-web.min.css",
    "/css/styles.css",
    "/css/reset.css",

    "/data/backgrounds.json",
    "/data/basicitems.json",
    "/data/bestiary-tob.json",
    "/data/bestiary.json",
    "/data/classes.json",
    "/data/conditions.json",
    "/data/cults.json",
    "/data/encounters.json",
    "/data/feats.json",
    "/data/items.json",
    "/data/loot.json",
    "/data/magicvariants.json",
    "/data/monsterfeatures.json",
    "/data/msbcr.json",
    "/data/psionics.json",
    "/data/races.json",
    "/data/rewards.json",
    "/data/rules.json",
    "/data/spells-roll20.json",
    "/data/spells.json",
    "/data/variantrules.json",

    "/fonts/MaterialIcons-Regular.ttf",
    "/fonts/MaterialIcons-Regular.woff",
    "/fonts/MaterialIcons-Regular.woff2",

    "/img/android-chrome-192x192.png",
    "/img/android-chrome-512x512.png",
    "/img/apple-touch-icon.png",
    "/img/favicon-16x16.png",
    "/img/favicon-32x32.png",
    "/img/favicon.ico",
    "/img/logo-white-192x192.png",
    "/img/classes.svg",

    "/js/backgrounds.js",
    "/js/bestiary.js",
    "/js/classes.js",
    "/js/conditions.js",
    "/js/cults.js",
    "/js/entryrender.js",
    "/js/feats.js",
    "/js/filter.js",
    "/js/history.js",
    "/js/items.js",
    "/js/nav.js",
    "/js/psionics.js",
    "/js/races.js",
    "/js/rewards.js",
    "/js/rules.js",
    "/js/spells.js",
    "/js/utils.js",
    "/js/variantrules.js",

    "/lib/droll.js",
    "/lib/jquery.js",
    "/lib/list.js",
    "/lib/throttle.js",
    "/lib/swipe.js",
    "/lib/material-components-web.min.js"
];

self.addEventListener("install", function(event) {
    // Perform install steps
    // 1. Wait till install is done
    event.waitUntil(
        // 2. Open a cache
        caches.open(CACHE_NAME).then(function(cache) {
            console.log("Opened cache");
            // Adds all files to cache,
            // rejects if a file fails to download
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            // On failure, tries to fetch.... (could be bad if offline)
            console.error("Asset not found in cache, re-requesting.");

            return fetch(event.request).then(function(response) {
                // Check if we received a valid response
                if (!response || response.status !== 200 || response.type !== "basic") {
                    console.error("Re-request failed.");
                    return response;
                }

                // IMPORTANT: Clone the response. A response is a stream
                // and because we want the browser to consume the response
                // as well as the cache consuming the response, we need
                // to clone it so we have two streams.
                var responseToCache = response.clone();

                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(event.request, responseToCache);
                });

                return response;
            });
        })
    );
});
