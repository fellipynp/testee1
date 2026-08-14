const CACHE_NAME = "despesas-v3";

const ARQUIVOS = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json"
];

self.addEventListener("install", event => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ARQUIVOS))
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(chaves => {
            return Promise.all(
                chaves.map(chave => {
                    if (chave !== CACHE_NAME) {
                        return caches.delete(chave);
                    }
                })
            );
        })
    );

    self.clients.claim();
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(resposta => {
                return resposta || fetch(event.request);
            })
    );
});
