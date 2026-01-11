const BASE_URL = "https://hacker-news.firebaseio.com/v0";

// En popüler haber ID’lerini al
async function fetchTopStories() {
  const res = await fetch(`${BASE_URL}/topstories.json`);
  const ids = await res.json();
  return ids.slice(0, 20); // ilk 20 haber
}

// ID’ye göre haber detayı al
async function fetchItem(id) {
  const res = await fetch(`${BASE_URL}/item/${id}.json`);
  const data = await res.json();

  // Özet metin üretme mantığı
  let summary = "";

  if (data.text) {
    // HTML taglerini temizle
    summary = data.text.replace(/<[^>]*>?/gm, "");
  } else {
    // Text yoksa başlıktan yapay özet
    summary = `${data.title} başlıklı haber teknoloji dünyasında dikkat çeken gelişmeler arasında yer almaktadır.`;
  }

  return {
    ...data,
    summary: summary
  };
}
