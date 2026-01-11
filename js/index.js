const container = document.getElementById("featuredNews");

// PWA Service Worker Kaydı (SADECE 1 KEZ)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('Service Worker kayıt edildi:', reg.scope))
      .catch(err => console.log('Service Worker hatası:', err));
  });
}

fetchTopStories().then(ids => {
  ids.slice(0, 6).forEach(async id => {
    const item = await fetchItem(id);

    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5>${item.title}</h5>
            <p class="text-muted small">Yazar: ${item.by}</p>
            <a href="detail.html?id=${item.id}" class="btn btn-primary">
              Detay
            </a>
          </div>
        </div>
      </div>
    `;
  });
});
