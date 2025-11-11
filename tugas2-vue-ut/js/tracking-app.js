// Tracking App
let currentView = 'table';

document.addEventListener('DOMContentLoaded', function() {
    loadStatistik();
    loadBahanAjarFilter();
    loadTrackingData();
    loadStatsTable();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('input', filterTracking);
    document.getElementById('bahanAjarFilter').addEventListener('change', filterTracking);
    document.getElementById('jenisFilter').addEventListener('change', filterTracking);
    document.getElementById('tanggalFilter').addEventListener('change', filterTracking);
}

// Load Statistics
function loadStatistik() {
    const allTracking = getAllTracking();
    const today = new Date().toISOString().split('T')[0];

    const totalTransaksi = allTracking.length;
    const stokMasuk = allTracking.filter(t => t.jenis === 'masuk').length;
    const stokKeluar = allTracking.filter(t => t.jenis === 'keluar').length;
    const transaksiHariIni = allTracking.filter(t => t.tanggal === today).length;

    document.getElementById('totalTransaksi').textContent = totalTransaksi;
    document.getElementById('stokMasuk').textContent = stokMasuk;
    document.getElementById('stokKeluar').textContent = stokKeluar;
    document.getElementById('transaksiHariIni').textContent = transaksiHariIni;
}

// Load Bahan Ajar Filter
function loadBahanAjarFilter() {
    const select = document.getElementById('bahanAjarFilter');
    const bahanAjarList = getAllBahanAjar();

    bahanAjarList.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = `${item.kode} - ${item.nama}`;
        select.appendChild(option);
    });
}

// Load Tracking Data
function loadTrackingData(data = null) {
    const trackingList = data || getAllTracking();

    if (currentView === 'table') {
        loadTableView(trackingList);
    } else {
        loadTimelineView(trackingList);
    }
}

// Load Table View
function loadTableView(trackingList) {
    const tableBody = document.getElementById('tableBody');
    const emptyState = document.getElementById('emptyState');

    tableBody.innerHTML = '';

    if (trackingList.length === 0) {
        emptyState.style.display = 'block';
        document.querySelector('#tableView .table-container').style.display = 'none';
        return;
    }

    emptyState.style.display = 'none';
    document.querySelector('#tableView .table-container').style.display = 'block';

    trackingList.forEach(track => {
        const row = document.createElement('tr');

        const jenisText = track.jenis === 'masuk' ? 'Masuk' : 'Keluar';
        const jenisBadge = track.jenis === 'masuk' ? 'badge-success' : 'badge-danger';
        const jenisIcon = track.jenis === 'masuk' ? '📥' : '📤';

        row.innerHTML = `
            <td>
                <div style="font-weight: 500;">${formatTanggal(track.tanggal)}</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">${track.waktu}</div>
            </td>
            <td><strong>${track.kodeBahanAjar}</strong></td>
            <td>
                <div style="font-weight: 500;">${track.namaBahanAjar}</div>
            </td>
            <td>
                <span class="badge ${jenisBadge}">
                    ${jenisIcon} ${jenisText}
                </span>
            </td>
            <td>
                <strong style="font-size: 1.125rem;">${track.jumlah}</strong>
                <span style="color: var(--text-secondary); font-size: 0.875rem;">unit</span>
            </td>
            <td>${track.keterangan}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Load Timeline View
function loadTimelineView(trackingList) {
    const timelineContainer = document.getElementById('timelineContainer');
    const emptyState = document.getElementById('emptyState');

    timelineContainer.innerHTML = '';

    if (trackingList.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    // Group by date
    const groupedByDate = {};
    trackingList.forEach(track => {
        if (!groupedByDate[track.tanggal]) {
            groupedByDate[track.tanggal] = [];
        }
        groupedByDate[track.tanggal].push(track);
    });

    // Sort dates descending
    const sortedDates = Object.keys(groupedByDate).sort((a, b) => b.localeCompare(a));

    sortedDates.forEach(tanggal => {
        // Date header
        const dateHeader = document.createElement('div');
        dateHeader.style.cssText = 'font-weight: 600; font-size: 1.125rem; margin: 1.5rem 0 1rem 0; color: var(--primary-color);';
        dateHeader.textContent = formatTanggal(tanggal);
        timelineContainer.appendChild(dateHeader);

        // Timeline items for this date
        groupedByDate[tanggal].forEach(track => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';

            const jenisText = track.jenis === 'masuk' ? 'Stok Masuk' : 'Stok Keluar';
            const jenisBadge = track.jenis === 'masuk' ? 'badge-success' : 'badge-danger';
            const jenisIcon = track.jenis === 'masuk' ? '📥' : '📤';

            timelineItem.innerHTML = `
                <div class="timeline-marker ${track.jenis}"></div>
                <div class="timeline-content">
                    <div class="timeline-header">
                        <div class="timeline-title">
                            <strong>${track.kodeBahanAjar}</strong> - ${track.namaBahanAjar}
                        </div>
                        <div class="timeline-date">${track.waktu}</div>
                    </div>
                    <div class="timeline-body">
                        <div style="display: flex; align-items: center; gap: 0.75rem; margin-top: 0.5rem;">
                            <span class="badge ${jenisBadge}">${jenisIcon} ${jenisText}</span>
                            <span style="font-weight: 600; font-size: 1rem;">
                                ${track.jumlah} unit
                            </span>
                        </div>
                        <div style="margin-top: 0.5rem; color: var(--text-secondary);">
                            ${track.keterangan}
                        </div>
                    </div>
                </div>
            `;

            timelineContainer.appendChild(timelineItem);
        });
    });
}

// Filter Tracking
function filterTracking() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const bahanAjarValue = document.getElementById('bahanAjarFilter').value;
    const jenisValue = document.getElementById('jenisFilter').value;
    const tanggalValue = document.getElementById('tanggalFilter').value;

    let filteredData = getAllTracking();

    // Filter by bahan ajar
    if (bahanAjarValue !== 'Semua') {
        filteredData = getTrackingByBahanAjar(bahanAjarValue);
    }

    // Filter by jenis
    if (jenisValue !== 'Semua') {
        filteredData = filteredData.filter(track => track.jenis === jenisValue);
    }

    // Filter by tanggal
    if (tanggalValue) {
        filteredData = filteredData.filter(track => track.tanggal === tanggalValue);
    }

    // Filter by search
    if (searchValue) {
        filteredData = filteredData.filter(track =>
            track.namaBahanAjar.toLowerCase().includes(searchValue) ||
            track.kodeBahanAjar.toLowerCase().includes(searchValue) ||
            track.keterangan.toLowerCase().includes(searchValue)
        );
    }

    loadTrackingData(filteredData);
}

// Switch View
function switchView(view) {
    currentView = view;

    const tableView = document.getElementById('tableView');
    const timelineView = document.getElementById('timelineView');

    if (view === 'table') {
        tableView.style.display = 'block';
        timelineView.style.display = 'none';
    } else {
        tableView.style.display = 'none';
        timelineView.style.display = 'block';
    }

    filterTracking(); // Reload with current filters
}

// Load Stats Table
function loadStatsTable() {
    const statsTableBody = document.getElementById('statsTableBody');
    const bahanAjarList = getAllBahanAjar();
    const allTracking = getAllTracking();

    statsTableBody.innerHTML = '';

    bahanAjarList.forEach(bahanAjar => {
        const tracking = allTracking.filter(t => t.bahanAjarId === bahanAjar.id);
        const masuk = tracking.filter(t => t.jenis === 'masuk').reduce((sum, t) => sum + t.jumlah, 0);
        const keluar = tracking.filter(t => t.jenis === 'keluar').reduce((sum, t) => sum + t.jumlah, 0);
        const perubahan = masuk - keluar;

        let perubahanClass = '';
        let perubahanIcon = '';
        if (perubahan > 0) {
            perubahanClass = 'badge-success';
            perubahanIcon = '↑';
        } else if (perubahan < 0) {
            perubahanClass = 'badge-danger';
            perubahanIcon = '↓';
        } else {
            perubahanClass = 'badge-secondary';
            perubahanIcon = '−';
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div style="font-weight: 500;">${bahanAjar.nama}</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">
                    <strong>${bahanAjar.kode}</strong> - ${bahanAjar.kategori}
                </div>
            </td>
            <td>
                <span class="badge badge-success">📥 ${masuk}</span>
            </td>
            <td>
                <span class="badge badge-danger">📤 ${keluar}</span>
            </td>
            <td>
                <strong style="font-size: 1.125rem;">${bahanAjar.stok}</strong>
                <span style="color: var(--text-secondary); font-size: 0.875rem;">unit</span>
            </td>
            <td>
                <span class="badge ${perubahanClass}">
                    ${perubahanIcon} ${Math.abs(perubahan)}
                </span>
            </td>
        `;

        statsTableBody.appendChild(row);
    });
}

// Export Data (Simple CSV export)
function exportData() {
    const trackingList = getAllTracking();

    if (trackingList.length === 0) {
        alert('Tidak ada data untuk di-export!');
        return;
    }

    // Create CSV content
    let csv = 'Tanggal,Waktu,Kode,Nama Bahan Ajar,Jenis,Jumlah,Keterangan\n';

    trackingList.forEach(track => {
        csv += `${track.tanggal},${track.waktu},${track.kodeBahanAjar},"${track.namaBahanAjar}",${track.jenis},${track.jumlah},"${track.keterangan}"\n`;
    });

    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tracking-stok-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    alert('Data berhasil di-export!');
}

// Format Tanggal
function formatTanggal(tanggal) {
    const date = new Date(tanggal);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}
