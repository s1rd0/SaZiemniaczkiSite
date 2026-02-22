document.addEventListener("DOMContentLoaded", () => {

    const postsListEl = document.getElementById("postsList");
    const container = document.getElementById("postsContainer");
    if (!postsListEl || !container) return;

    const category = container.dataset.category; // 'photo-history' | 'reviews' | 'storytime'
    const INDEX_URL = "/blog/posts/index.json"; // absolutna ścieżka; działa na serwerze i lokalnie z http://

    fetch(INDEX_URL)
        .then(res => res.ok ? res.json() : Promise.reject("Nie można załadować index.json"))
        .then(posts => {
        const filtered = posts
            .filter(p => p.category === category)
            .sort((a,b) => (b.date || "").localeCompare(a.date || ""));

        if (filtered.length === 0) {
            postsListEl.innerHTML = "<p>Brak wpisów w tej kategorii.</p>";
            return;
        }

        postsListEl.innerHTML = filtered.map(postCard).join("\n");
        })
        .catch(err => {
        postsListEl.innerHTML = "<p>Wystąpił problem z załadowaniem wpisów.</p>";
        console.error("blog.js error:", err);
        });

    function postCard(p) {
        // Bezpieczne zbudowanie URL:
        let postUrl = null;
        if (p.url && typeof p.url === "string") {
        postUrl = p.url; // jeśli w JSON masz pełne url → użyj go
        } else if (p.file && typeof p.file === "string") {
        // Zalecam absolutną ścieżkę (unikamy błędów ../)
        postUrl = "/blog/posts/" + p.file;
        }

        if (!postUrl) {
        console.warn("Pominięto wpis bez 'file' ani 'url':", p);
        return ""; // nie renderuj karty bez linku
        }

        const thumb = p.thumb ? p.thumb : "/images/default-thumb.jpg";
        return `
        <article class="post-card">
            <a class="post-link" href="${escapeHtml(postUrl)}">
            <div class="post-thumb-wrap">
                <img class="post-thumb" src="${escapeHtml(thumb)}" alt="${escapeHtml(p.title || '')}">
            </div>
            <div class="post-meta">
                <h3 class="post-title">${escapeHtml(p.title || 'Untitled')}</h3>
                <div class="post-date">${escapeHtml(p.date || '')}</div>
                <p class="post-excerpt">${escapeHtml(p.excerpt || '')}</p>
            </div>
            </a>
        </article>
        `;
    }

    function escapeHtml(s) {
        if (!s) return "";
        return String(s).replace(/[&<>"']/g, c => ({
        '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
        }[c]));
    }

});