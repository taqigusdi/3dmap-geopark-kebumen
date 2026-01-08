/* data-tesis.js */
/* Berisi Data Tesis dan Logika Interaksi WebGIS */

// --- 1. DATA TESIS (EDIT DATA DI SINI) ---
const DESTINATIONS = [
{ name: "Pantai Kembar", x: -12390.62, y: -10281.87, 
    nilai: "43,35%", kategori: "Sedang", isu: "Manajemen Limbah & Eksklusivitas", saran: "Sistem pengolahan limbah mandiri & Penyediaan aksesibilitas inklusif", 
    images: [
            "./img/Pantai Kembar 1.jpg",
            "./img/Pantai Kembar 2.jpg",
            "./img/Pantai Kembar 3.jpg",
        ]},
{ name: "Sagara View of Karangbolong", x: -15634.81, y: -10008.37, 
    nilai: "52,92%", kategori: "Sedang", isu: "Komodifikasi Alam, Perlindungan Aset & Eksklusivitas", saran: "Diversifikasi aktivitas & Menyisihkan pendapatan untuk konservasi", 
    images: [
            "./img/Sagara View 1.jpg",
            "./img/Sagara View 2.jpg",
            "./img/Sagara View 3.jpg",
        ]},
{ name: "Pantai Menganti", x: -21501.73, y: -11325.52, 
    nilai: "55,29%", kategori: "Sedang", isu: "Manajemen Autopilot, Eksklusivitas & Lingkungan", saran: "SOP pengelolaan lingkungan yang ketat & Infrastruktur ramah lansia/difabel",
images: [
            "./img/Pantai Menganti 1.jpg",
            "./img/Pantai Menganti 2.jpg",
            "./img/Pantai Menganti 3.jpg",
        ]},
{ name: "Hutan Mangrove Pantai Ayah", x: -23884.69, y: -5698.66, 
    nilai: "40,39%", kategori: "Sedang", isu: "Fasilitas", saran: "Mempertahankan model proteksi aset & Penguatan interpretasi", 
    images: [
            "./img/Hutan Mangrove 1.jpg",
            "./img/Hutan Mangrove 2.jpg",
            "./img/Hutan Mangrove 3.jpg",
        ]},
{ name: "Kerajinan Pandan KTH Margo Rahayu", x: -7496.88, y: 8005.30, 
    nilai: "42,26%", kategori: "Sedang", isu: "Visibilitas & Regenerasi", saran: "Integrasi paket wisata edukasi & Digitalisasi", 
images: [
            "./img/Kerajinan Pandan 1.jpg",
            "./img/Kerajinan Pandan 2.jpg",
            "./img/Kerajinan Pandan 3.jpg",
        ]},
{ name: "Sanggar Batik Gemeksekti", x: 5574.07, y: 1677.00, 
    nilai: "38,69%", kategori: "Rendah", isu: "Kualitas Terendah & Aksesibilitas", saran: "Perbaikan aksesibilitas & Pembuatan paket wisata", 
images: [
            "./img/Sanggar Batik 1.jpg",
            "./img/Sanggar Batik 2.jpg",
            "./img/Sanggar Batik 3.jpg",
        ]},
{ name: "Desa Seboro 'Selo Asri'", x: 11237.29, y: 17001.15, 
    nilai: "41,66%", kategori: "Sedang", isu: "Perlindungan Aset & Eksklusivitas", saran: "Aturan melindungi situs geologi & Penyediaan amenitas", 
images: [
            "./img/Seboro 1.jpeg",
            "./img/Seboro 2.jpg",
            "./img/Seboro 3.jpg",
        ]},
{ name: "Agro Wisata Embung Cangkring", x: 16572.57, y: 17507.11, 
    nilai: "42,48%", kategori: "Sedang", isu: "Infrastruktur & Kelembagaan", saran: "Pengembangan fasilitas penunjang & Penguatan kelembagaan", 
images: [
            "./img/Cangkring 1.webp",
            "./img/Cangkring 2.jpg",
            "./img/Cangkring 3.jpg",
        ]},
{ name: "Desa Karanggayam", x: -3264.14, y: 8018.13, 
    nilai: "38,77%", kategori: "Rendah", isu: "Paradoks Kualitas, Fasilitas Dasar & Aset", saran: "Perbaikan jalan akses & Formalisasi aturan konservasi budaya", 
images: [
            "./img/Karanggayam 1.jpg",
            "./img/Karanggayam 2.jpg",
            "./img/Karanggayam 3.jpg",
        ]},
{ name: "Desa Rahayu", x: 18316.36, y: 4365.18, 
    nilai: "41,93%", kategori: "Sedang", isu: "Aksesibilitas & Modal sosial gotong royong (Positif).", saran: "Peningkatan infrastruktur & Replikasi model bank sampah", 
images: [
            "./img/Rahayu 1.jpg",
            "./img/Rahayu 2.jpg",
            "./img/Rahayu 3.jpeg",
        ]}
];

const CLICK_RADIUS = 1000; 

// --- 2. FUNGSI UTAMA INTERAKSI ---
function initCustomInteractions(app, container) {
    console.log("✅ Sistem Interaksi + Auto Carousel Aktif");

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var popupEl = document.getElementById("my-custom-popup");
    
    // Variabel Penyimpan Timer Auto-Slide
    let slideTimer = null; 

    // --- PROTEKSI KLIK (Agar popup tidak hilang saat diklik) ---
    popupEl.addEventListener('mousedown', function(e) { e.stopPropagation(); }, false);
    popupEl.addEventListener('touchstart', function(e) { e.stopPropagation(); }, {passive: false});
    popupEl.addEventListener('click', function(e) { e.stopPropagation(); }, false);

    function handleInput(clientX, clientY) {
        var rect = app.renderer.domElement.getBoundingClientRect();
        mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, app.camera);
        var intersects = raycaster.intersectObjects(app.scene.children, true);

        // Jika klik sembarang tempat, matikan timer lama dulu
        if (slideTimer) {
            clearInterval(slideTimer);
            slideTimer = null;
        }

        if (intersects.length > 0) {
            var hitPoint = intersects[0].point;
            let nearestLoc = null;
            let minDistance = CLICK_RADIUS;

            for (let loc of DESTINATIONS) {
                let dx = hitPoint.x - loc.x;
                let dy = hitPoint.y - loc.y;
                let distance = Math.sqrt(dx*dx + dy*dy);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestLoc = loc;
                }
            }

            if (nearestLoc) {
                // 1. SIAPKAN HTML GAMBAR
                let carouselHTML = '';
                if (nearestLoc.images && nearestLoc.images.length > 0) {
                    let slides = nearestLoc.images.map((img, index) => 
                        `<img src="${img}" class="carousel-slide ${index === 0 ? 'active' : ''}">`
                    ).join('');
                    
                    let navButtons = nearestLoc.images.length > 1 ? 
                        `<button class="carousel-btn prev-btn">❮</button>
                         <button class="carousel-btn next-btn">❯</button>` : '';

                    carouselHTML = `
                        <div class="carousel-container">
                            ${slides}
                            ${navButtons}
                        </div>
                    `;
                }

                // 2. RENDER POPUP
                popupEl.innerHTML = `
                    <div class="popup-header">
                        <h3>${nearestLoc.name}</h3>
                        <small>Geopark Kebumen</small>
                    </div>
                    <div class="popup-body">
                        ${carouselHTML}
                        <div class="data-row"><span class="data-label">Indeks:</span><span class="score-badge">${nearestLoc.nilai}</span></div>
                        <div class="data-row"><span class="data-label">Kategori:</span><span class="data-value">${nearestLoc.kategori}</span></div>
                        <div class="issue-box"><div style="font-size:10px; color:#555;">⚠️ ISU UTAMA:</div><div class="issue-text">${nearestLoc.isu}</div></div>
                        <div style="margin-top:10px; border-top:1px dashed #ddd; padding-top:8px;">
                            <div style="font-size:10px; color:#27ae60; font-weight:bold;">💡 REKOMENDASI:</div>
                            <span class="rec-text">"${nearestLoc.saran}"</span>
                        </div>
                    </div>
                `;
                popupEl.style.display = "block";

                // 3. LOGIKA CAROUSEL (AUTO + MANUAL)
                if (nearestLoc.images && nearestLoc.images.length > 1) {
                    let currentIndex = 0;
                    const slides = popupEl.querySelectorAll('.carousel-slide');
                    const btnPrev = popupEl.querySelector('.prev-btn');
                    const btnNext = popupEl.querySelector('.next-btn');

                    // Fungsi Ganti Slide
                    function showSlide(index) {
                        slides.forEach((slide, i) => {
                            slide.classList.remove('active');
                            if (i === index) slide.classList.add('active');
                        });
                    }

                    // Fungsi Next (Bisa dipanggil Timer atau Tombol)
                    function nextSlideFunc() {
                        currentIndex = (currentIndex + 1) % slides.length;
                        showSlide(currentIndex);
                    }

                    // A. SET INTERVAL AUTO SLIDE (3 Detik)
                    slideTimer = setInterval(nextSlideFunc, 5000);

                    // B. EVENT TOMBOL MANUAL
                    btnNext.addEventListener('click', (e) => {
                        e.stopPropagation();
                        // Reset timer biar gak balapan
                        clearInterval(slideTimer); 
                        nextSlideFunc();
                        slideTimer = setInterval(nextSlideFunc, 3000); // Mulai lagi
                    });

                    btnPrev.addEventListener('click', (e) => {
                        e.stopPropagation();
                        clearInterval(slideTimer);
                        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                        showSlide(currentIndex);
                        slideTimer = setInterval(nextSlideFunc, 3000);
                    });
                }

                // 4. POSISI POPUP RESPONSIF
                let leftPos = clientX + 20;
                let topPos = clientY + 20;

                if (window.innerWidth < 600) {
                    popupEl.style.left = "5%";
                    popupEl.style.top = "auto";
                    popupEl.style.bottom = "20px";
                    popupEl.style.width = "90%";
                } else {
                    popupEl.style.left = leftPos + "px";
                    popupEl.style.top = topPos + "px";
                    popupEl.style.bottom = "auto";
                    popupEl.style.width = "auto";
                }

            } else {
                popupEl.style.display = "none";
            }
        } else {
            popupEl.style.display = "none";
        }
    }

    container.addEventListener('mousedown', function(e) {
        if (e.button === 0) handleInput(e.clientX, e.clientY);
    }, false);

    container.addEventListener('touchstart', function(e) {
        var touch = e.touches[0];
        handleInput(touch.clientX, touch.clientY);
    }, {passive: true});
}
