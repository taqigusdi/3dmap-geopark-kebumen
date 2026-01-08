/* data-tesis.js */
/* Berisi Data Tesis dan Logika Interaksi WebGIS */

// --- 1. DATA TESIS (EDIT DATA DI SINI) ---
const DESTINATIONS = [
{ name: "Pantai Kembar", x: -12390.62, y: -10281.87, nilai: "43,35%", kategori: "Sedang", isu: "Abrasi & Sampah Laut", saran: "Pembangunan Breakwater Alami" },
{ name: "Sagara View of Karangbolong", x: -15634.81, y: -10008.37, nilai: "52,92%", kategori: "Sedang", isu: "Kemacetan Akses Masuk", saran: "Manajemen Kantong Parkir" },
{ name: "Pantai Menganti", x: -21501.73, y: -11325.52, nilai: "55,29%", kategori: "Sedang", isu: "Daya Dukung Lingkungan", saran: "Pembatasan Kuota Pengunjung" },
{ name: "Hutan Mangrove Pantai Ayah", x: -23884.69, y: -5698.66, nilai: "40,39%", kategori: "Sedang", isu: "Sedimentasi & Fasilitas", saran: "Revitalisasi Jalur Trekking" },
{ name: "Kerajinan Pandan KTH Margo Rahayu", x: -7496.88, y: 8005.30, nilai: "42,26%", kategori: "Sedang", isu: "Regenerasi Pengrajin", saran: "Pelatihan & Pemasaran Digital" },
{ name: "Sanggar Batik Gemeksekti", x: 5574.07, y: 1677.00, nilai: "38,69%", kategori: "Rendah", isu: "Keterbatasan Showroom", saran: "Integrasi Paket Wisata Kota" },
{ name: "Pariwisata Pedesaan Desa Seboro 'Selo Asri'", x: 11237.29, y: 17001.15, nilai: "41,66%", kategori: "Sedang", isu: "Aksesibilitas Jalan Sempit", saran: "Pelebaran Jalan Last Mile" },
{ name: "Pariwisata Pedesaan Agro Wisata Embung Cangkring", x: 16572.57, y: 17507.11, nilai: "42,48%", kategori: "Sedang", isu: "Minim Atraksi Malam", saran: "Penambahan Lampu & Event" },
{ name: "Pariwisata Pedesaan Desa Karanggayam", x: -3264.14, y: 8018.13, nilai: "38,77%", kategori: "Rendah", isu: "Fasilitas Sanitasi", saran: "Standarisasi Toilet Wisata" },
{ name: "Pariwisata Pedesaan Desa Rahayu", x: 18316.36, y: 4365.18, nilai: "41,93%", kategori: "Sedang", isu: "Promosi Belum Optimal", saran: "Branding Desa Wisata Digital" }
];

const CLICK_RADIUS = 1000; 

// --- 2. FUNGSI UTAMA INTERAKSI (Dipanggil dari index.html) ---
function initCustomInteractions(app, container) {
    console.log("✅ Sistem Interaksi Tesis Aktif (Mobile & Desktop)");

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var popupEl = document.getElementById("my-custom-popup");

    // Fungsi Deteksi Input (Mouse / Sentuh)
    function handleInput(clientX, clientY) {
        // Hitung Posisi
        var rect = app.renderer.domElement.getBoundingClientRect();
        mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

        // Tembak Sinar
        raycaster.setFromCamera(mouse, app.camera);
        var intersects = raycaster.intersectObjects(app.scene.children, true);

        if (intersects.length > 0) {
            var hitPoint = intersects[0].point;
            let nearestLoc = null;
            let minDistance = CLICK_RADIUS;

            // Cek Jarak ke Destinasi
            for (let loc of DESTINATIONS) {
                let dx = hitPoint.x - loc.x;
                let dy = hitPoint.y - loc.y;
                let distance = Math.sqrt(dx*dx + dy*dy);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestLoc = loc;
                }
            }

            // Tampilkan Popup Jika Ketemu
            if (nearestLoc) {
                popupEl.innerHTML = `
                    <div class="popup-header">
                        <h3>${nearestLoc.name}</h3>
                        <small>Geopark Kebumen</small>
                    </div>
                    <div class="popup-body">
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

                // Logika Posisi Popup (Agar aman di HP)
                let leftPos = clientX + 20;
                let topPos = clientY + 20;

                if (window.innerWidth < 600) {
                    // Tampilan HP: Popup di bawah tengah
                    popupEl.style.left = "5%";
                    popupEl.style.top = "auto";
                    popupEl.style.bottom = "20px";
                    popupEl.style.width = "90%";
                } else {
                    // Tampilan Laptop: Ikuti Mouse
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

    // Event Listener Mouse (Laptop)
    container.addEventListener('mousedown', function(e) {
        if (e.button === 0) handleInput(e.clientX, e.clientY);
    }, false);

    // Event Listener Sentuh (HP)
    container.addEventListener('touchstart', function(e) {
        var touch = e.touches[0];
        handleInput(touch.clientX, touch.clientY);
    }, {passive: true});

}
