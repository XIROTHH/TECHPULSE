const CACHE_NAME = "techpulse-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./news.html",
  "./css/style.css",
  "./js/index.js", // Eğer varsa js dosyanız
  "./offline.html",
  "./images/icon-192.png" // İkonunuzu buraya eklemeyi unutmayın
];

// Kurulum: Dosyaları önbelleğe al
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch: İnternet varsa internetten çek, yoksa cache'den ver, o da yoksa offline.html göster
self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request)
      .catch(() => {
        return caches.match(e.request).then((response) => {
          if (response) {
            return response;
          } else if (e.request.mode === 'navigate') {
            return caches.match("./offline.html");
          }
        });
      })
  );
});