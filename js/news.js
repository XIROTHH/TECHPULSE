let allStories = [];
const list = document.getElementById("newsList");

fetchTopStories().then(ids => {
  ids.forEach(async id => {
    const item = await fetchItem(id);
    allStories.push(item);
    render(allStories);
  });
});

function render(items) {
  list.innerHTML = "";

  items.forEach(item => {
    list.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h6 class="fw-bold">${item.title}</h6>
            <p class="small text-muted">👍 ${item.score}</p>
            <p class="small">
              ${(item.summary || "").substring(0, 300)}...
            </p>
            <a href="detail.html?id=${item.id}">Oku</a>
          </div>
        </div>
      </div>
    `;
  });
}



searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  render(allStories.filter(i => i.title.toLowerCase().includes(value)));
});
