//Menunggu halaman selesai
window.addEventListener('load', function() {

    //Halaman Container Utama
    const panel = this.document.createElement('div');
    panel.className = 'smart-panel'

    //Isi Konten
    panel.innerHTML = `
    <div class="panel-header">
        <h2>Geopark Kebumen</h2>
        <span> DASHBOARD PARIWISATA BERKUALITAS  <span>
    </div>
    <p class="panel-desc"> 
    Visualisasi Evaluasi Kinerja Pariwisata Berbasis <strong>Indeks Gabungan 6A Pariwisata dan Pariwisata Berkualitas</strong>.
    </p>
    
    <div class="legend-box"> 
        <h4 class="legend-title">Legenda Peta</h4>
    
        <div class="legend-item">
            <span style="width: 12px; height: 12px; background: #000000ff; ; border-radius: 50%; margin-right: 10px;"></span>
            <span>Daya Tarik Wisata</span>
        </div>

        <div class="legend-item">
        <span style="width: 12px; height: 12px; background-color: #f1c4bf; margin-right: 10px;"></span>
        <span>Pariwisata Pedesaan</span>
        </div>

        <div class="legend-item">
        <span style="width: 12px; height: 12px; background: linear-gradient(to right, #16a085, #2ecc71); margin-right: 10px;"></span>
        <span>Geopark Kebumen</span>
        </div>
    </div>

    <div class="panel-footer">
        &copy; 2025 Taqiy Gusdi Baitulloh | Universitas Padjadjaran
    </div>
    `;

    //Masuk ke Body HTML
    this.document.body.appendChild(panel);

});