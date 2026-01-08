/* dashboard.js - Versi Toggle (Buka-Tutup) */

window.addEventListener('load', function() {
    
    // --- 1. BUAT TOMBOL TOGGLE (ICON INFO) ---
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'dashboard-toggle';
    toggleBtn.innerHTML = 'ℹ️'; // Ikon Info
    toggleBtn.title = "Lihat Info & Legenda";
    document.body.appendChild(toggleBtn);

    // --- 2. BUAT PANEL DASHBOARD (Tersembunyi Awalnya) ---
    const panel = document.createElement('div');
    panel.className = 'smart-panel';
    // Default sembunyi (hidden) agar peta terlihat lega
    panel.style.display = 'none'; 

    // Isi Konten Panel
    panel.innerHTML = `
        <div class="panel-header">
            <h2>Geopark Kebumen</h2>
            <span>DASHBOARD QUALITY TOURISM</span>
            <div class="panel-close">&times;</div>
        </div>
        
        <div class="panel-content-scroll">
            <p class="panel-desc"> 
            Visualisasi Evaluasi Kinerja Pariwisata Berbasis <strong>Indeks Gabungan 6A Pariwisata</strong>.
            </p>
            
            <div class="legend-box"> 
                <h4 class="legend-title">Legenda Peta</h4>
                <div class="legend-item">
                    <span style="width: 12px; height: 12px; background: #000000ff; border-radius: 50%; margin-right: 10px;"></span>
                    <span>Daya Tarik Wisata</span>
                </div>
                <div class="legend-item">
                    <span style="display:inline-block; width: 14px; height: 14px; background-color: #f1c4bf; margin-right: 10px; vertical-align: middle; border-radius: 3px; border: 1px solid rgba(0,0,0,0.1);"></span>
                    <span>Pariwisata Pedesaan</span>
                </div>
                <div class="legend-item">
                    <span style="width: 12px; height: 3px; background-color: #000000; margin-right: 10px;"></span>
                    <span>Jalan</span>
                </div>
            </div>

            <div class="legend-box"> 
                <h4 class="legend-title">Status Quality Tourism</h4>
                    <div class="legend-item">
                        <span style="width: 12px; height: 12px; background-color: #2ecc71; border-radius: 2px; margin-right: 10px;"></span>
                        <span>Sangat Baik</span>
                    </div>

                    <div class="legend-item">
                        <span style="width: 12px; height: 12px; background-color: #f1c40f; border-radius: 2px; margin-right: 10px;"></span>
                        <span>Baik</span>
                    </div>

                    <div class="legend-item">
                        <span style="width: 12px; height: 12px; background-color: #e67e22; border-radius: 2px; margin-right: 10px;"></span>
                        <span>Sedang</span>
                    </div>

                    <div class="legend-item">
                        <span style="width: 12px; height: 12px; background-color: #e74c3c; border-radius: 2px; margin-right: 10px;"></span>
                        <span>Rendah</span>
                    </div>

                    <div class="legend-item">
                        <span style="width: 12px; height: 12px; background-color: #9b59b6; border-radius: 2px; margin-right: 10px;"></span>
                        <span>Sangat Rendah</span>
                    </div>
                </div>
            </div>

            <div style="margin-top:15px; font-size:11px; color:#666; text-align:center;">
                <em>Klik objek pada peta untuk melihat Detail.</em>
            </div>
        </div>
    `;
    
    document.body.appendChild(panel);

    // --- 3. LOGIKA KLIK (INTERAKSI) ---
    
    // Variabel elemen tombol close
    const closeBtn = panel.querySelector('.panel-close');

    // A. Fungsi Buka Panel
    toggleBtn.addEventListener('click', function() {
        panel.style.display = 'block'; // Munculkan panel
        toggleBtn.style.display = 'none'; // Sembunyikan tombol info
    });

    // B. Fungsi Tutup Panel
    closeBtn.addEventListener('click', function() {
        panel.style.display = 'none'; // Sembunyikan panel
        toggleBtn.style.display = 'block'; // Munculkan tombol info lagi
    });

    // C. (Opsional) Buka otomatis jika di Laptop (Layar Besar)
    if (window.innerWidth > 800) {
        panel.style.display = 'block';
        toggleBtn.style.display = 'none';
    }
});




