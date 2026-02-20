document.addEventListener("DOMContentLoaded", function() {

    // ===== TITLE CLICK =====
    const title = document.getElementById("mainTitle");

    title.addEventListener("click", function() {
        title.textContent = "you clicked it. why.";
        title.style.color = "#ffffff";
    });


    // ===== DOG BARK =====
    const dog = document.getElementById("dogImage");
    const bark = document.getElementById("barkSound");

    dog.addEventListener("click", function() {
        bark.currentTime = 0;
        bark.play();
    });


    // ===== RANDOM COUNTER =====
    const counter = document.getElementById("counterNumber");
    const insaneNumber = Math.floor(Math.random() * 900000000) + 100000000;
    counter.textContent = insaneNumber.toLocaleString();


    // ===== RANDOM QUOTES =====
    const quotes = [
        "remember guys, don't give your ID to greedy companies",
        "currently surfing web...",
        "optimized for Windows Vista",
        "best viewed at 1280x1024",
        "this site tracks absolutely everything"
    ];

    const quoteBox = document.getElementById("quoteBox");
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteBox.textContent = randomQuote;

});

document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".close");

    const images = document.querySelectorAll(".gallery-img");

    images.forEach(img => {
        img.style.cursor = "pointer";

        img.addEventListener("click", function () {
            modal.style.display = "flex";
            modalImg.src = this.src;
        });
    });

    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    modal.onclick = function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    };

});

const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playlistEl = document.getElementById("playlist");
const cd = document.getElementById("cdDisc");
const trackTitle = document.getElementById("trackTitle");

if (audio) {

    const tracks = [
    {
        title: "Still Alive - Portal",
        src: "audio/portal-still-alive.mp3"
    },
    {
        title: "Sweden - Minecraft",
        src: "audio/minecraft-sweden.mp3"
    },
    {
        title: "Megalovania - Undertale",
        src: "audio/undertale-megalovania.mp3"
    }
];

    let currentTrack = 0;

    function loadTrack(index) {
        audio.src = tracks[index].src;
        trackTitle.textContent = tracks[index].title;
        updatePlaylist();
    }

    function playTrack() {
        audio.play();
        cd.classList.add("spin");
    }

    function pauseTrack() {
        audio.pause();
        cd.classList.remove("spin");
    }

    playBtn.addEventListener("click", () => {
        if (audio.paused) playTrack();
        else pauseTrack();
    });

    nextBtn.addEventListener("click", () => {
        currentTrack = (currentTrack + 1) % tracks.length;
        loadTrack(currentTrack);
        playTrack();
    });

    prevBtn.addEventListener("click", () => {
        currentTrack =
            (currentTrack - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrack);
        playTrack();
    });

    audio.addEventListener("timeupdate", () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;

        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationEl.textContent = formatTime(audio.duration);
    });

    progressBar.addEventListener("input", () => {
        audio.currentTime =
            (progressBar.value / 100) * audio.duration;
    });

    audio.addEventListener("ended", () => {
        nextBtn.click();
    });

    function formatTime(time) {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60)
            .toString()
            .padStart(2, "0");
        return minutes + ":" + seconds;
    }

    function updatePlaylist() {
        playlistEl.innerHTML = "";
        tracks.forEach((track, index) => {
            const li = document.createElement("li");
            li.textContent = track.title;
            if (index === currentTrack)
                li.classList.add("active");

            li.addEventListener("click", () => {
                currentTrack = index;
                loadTrack(currentTrack);
                playTrack();
            });

            playlistEl.appendChild(li);
        });
    }

    loadTrack(currentTrack);
}