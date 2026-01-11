const id = new URLSearchParams(location.search).get("id");
const detail = document.getElementById("detail");

fetchItem(id).then(item => {
  detail.innerHTML = `
    <h2>${item.title}</h2>
    <p><strong>Yazar:</strong> ${item.by}</p>
    <p><strong>Özet:</strong> ${item.summary}</p>
    <p><strong>Puan:</strong> ${item.score}</p>
    <a href="${item.url}" target="_blank" class="btn btn-outline-primary">
      Haberi Aç
    </a>
    <br><br>
    <a href="news.html">← Geri</a>
  `;
});
