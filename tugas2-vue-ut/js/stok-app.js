// Stok Management App
document.addEventListener('DOMContentLoaded', function() {
    loadKategoriFilter();
    loadTableData();
    loadBahanAjarOptions();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Search and Filter
    document.getElementById('searchInput').addEventListener('input', filterTable);
    document.getElementById('kategoriFilter').addEventListener('change', filterTable);
    document.getElementById('stokFilter').addEventListener('change', filterTable);

    // Form Submissions
    document.getElementById('tambahForm').addEventListener('submit', handleTambahStok);
    document.getElementById('kurangForm').addEventListener('submit', handleKurangStok);

    // Bahan Ajar Selection
    document.getElementById('tambahBahanAjar').addEventListener('change', updateTambahInfo);
    document.getElementById('kurangBahanAjar').addEventListener('change', updateKurangInfo);
}

// Load Kategori Filter
function loadKategoriFilter() {
    const select = document.getElementById('kategoriFilter');
    kategoriList.forEach(kategori => {
        const option = document.createElement('option');
        option.value = kategori;
        option.textContent = kategori;
        select.appendChild(option);
    });
}

// Load Table Data
function loadTableData(data = null) {
    const tableBody = document.getElementById('tableBody');
    const emptyState = document.getElementById('emptyState');
    const bahanAjarList = data || getAllBahanAjar();

    tableBody.innerHTML = '';

    if (bahanAjarList.length === 0) {
        emptyState.style.display = 'block';
        document.querySelector('.table-container').style.display = 'none';
        return;
    }

    emptyState.style.display = 'none';
    document.querySelector('.table-container').style.display = 'block';

    bahanAjarList.forEach(item => {
        const row = document.createElement('tr');

        // Determine stock status
        let stockStatus, stockBadge, stockIndicator;
        if (item.stok >= 20) {
            stockStatus = 'Aman';
            stockBadge = 'badge-success';
            stockIndicator = 'high';
        } else if (item.stok >= 10) {
            stockStatus = 'Sedang';
            stockBadge = 'badge-warning';
            stockIndicator = 'medium';
        } else {
            stockStatus = 'Rendah';
            stockBadge = 'badge-danger';
            stockIndicator = 'low';
        }

        row.innerHTML = `
            <td><strong>${item.kode}</strong></td>
            <td>
                <div style="font-weight: 500;">${item.nama}</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">${item.deskripsi}</div>
            </td>
            <td><span class="badge badge-primary">${item.kategori}</span></td>
            <td>${item.penerbit}</td>
            <td>
                <div class="stock-level">
                    <span class="stock-indicator ${stockIndicator}"></span>
                    <strong style="font-size: 1.125rem;">${item.stok}</strong>
                    <span style="color: var(--text-secondary); font-size: 0.875rem;">unit</span>
                </div>
            </td>
            <td><span class="badge ${stockBadge}">${stockStatus}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn add" onclick="quickAddStok(${item.id})" title="Tambah Stok">
                        ➕
                    </button>
                    <button class="action-btn delete" onclick="quickKurangStok(${item.id})" title="Kurangi Stok">
                        ➖
                    </button>
                </div>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Filter Table
function filterTable() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const kategoriValue = document.getElementById('kategoriFilter').value;
    const stokValue = document.getElementById('stokFilter').value;

    let filteredData = getAllBahanAjar();

    // Filter by category
    if (kategoriValue !== 'Semua') {
        filteredData = getBahanAjarByKategori(kategoriValue);
    }

    // Filter by stock status
    if (stokValue !== 'Semua') {
        filteredData = filteredData.filter(item => {
            if (stokValue === 'Aman') return item.stok >= 20;
            if (stokValue === 'Sedang') return item.stok >= 10 && item.stok < 20;
            if (stokValue === 'Rendah') return item.stok < 10;
            return true;
        });
    }

    // Filter by search
    if (searchValue) {
        filteredData = filteredData.filter(item =>
            item.nama.toLowerCase().includes(searchValue) ||
            item.kode.toLowerCase().includes(searchValue) ||
            item.penerbit.toLowerCase().includes(searchValue) ||
            item.deskripsi.toLowerCase().includes(searchValue)
        );
    }

    loadTableData(filteredData);
}

// Load Bahan Ajar Options for Modals
function loadBahanAjarOptions() {
    const tambahSelect = document.getElementById('tambahBahanAjar');
    const kurangSelect = document.getElementById('kurangBahanAjar');
    const bahanAjarList = getAllBahanAjar();

    bahanAjarList.forEach(item => {
        // For Tambah Modal
        const optionTambah = document.createElement('option');
        optionTambah.value = item.id;
        optionTambah.textContent = `${item.kode} - ${item.nama}`;
        tambahSelect.appendChild(optionTambah);

        // For Kurang Modal
        const optionKurang = document.createElement('option');
        optionKurang.value = item.id;
        optionKurang.textContent = `${item.kode} - ${item.nama}`;
        kurangSelect.appendChild(optionKurang);
    });
}

// Update Tambah Info
function updateTambahInfo() {
    const bahanAjarId = document.getElementById('tambahBahanAjar').value;
    const infoBox = document.getElementById('tambahInfoBox');

    if (!bahanAjarId) {
        infoBox.style.display = 'none';
        return;
    }

    const bahanAjar = getBahanAjarById(bahanAjarId);
    if (bahanAjar) {
        document.getElementById('tambahKode').textContent = bahanAjar.kode;
        document.getElementById('tambahKategori').textContent = bahanAjar.kategori;
        document.getElementById('tambahStokSekarang').textContent = bahanAjar.stok;
        infoBox.style.display = 'block';
    }
}

// Update Kurang Info
function updateKurangInfo() {
    const bahanAjarId = document.getElementById('kurangBahanAjar').value;
    const infoBox = document.getElementById('kurangInfoBox');

    if (!bahanAjarId) {
        infoBox.style.display = 'none';
        return;
    }

    const bahanAjar = getBahanAjarById(bahanAjarId);
    if (bahanAjar) {
        document.getElementById('kurangKode').textContent = bahanAjar.kode;
        document.getElementById('kurangKategori').textContent = bahanAjar.kategori;
        document.getElementById('kurangStokSekarang').textContent = bahanAjar.stok;

        // Update max value for input
        document.getElementById('kurangJumlah').max = bahanAjar.stok;

        infoBox.style.display = 'block';
    }
}

// Handle Tambah Stok
function handleTambahStok(e) {
    e.preventDefault();

    const bahanAjarId = parseInt(document.getElementById('tambahBahanAjar').value);
    const jumlah = parseInt(document.getElementById('tambahJumlah').value);
    const keterangan = document.getElementById('tambahKeterangan').value;

    if (!bahanAjarId || !jumlah || !keterangan) {
        showAlert('Mohon lengkapi semua field!', 'danger');
        return;
    }

    if (jumlah < 1) {
        showAlert('Jumlah stok minimal 1 unit!', 'danger');
        return;
    }

    const bahanAjar = getBahanAjarById(bahanAjarId);
    const stokLama = bahanAjar.stok;

    if (tambahStok(bahanAjarId, jumlah, keterangan)) {
        showAlert(
            `Berhasil menambah stok ${bahanAjar.nama} sebanyak ${jumlah} unit! (${stokLama} → ${bahanAjar.stok})`,
            'success'
        );
        hideModal('tambahModal');
        resetForm('tambahForm');
        loadTableData();
        filterTable(); // Reapply filters
    } else {
        showAlert('Gagal menambah stok!', 'danger');
    }
}

// Handle Kurangi Stok
function handleKurangStok(e) {
    e.preventDefault();

    const bahanAjarId = parseInt(document.getElementById('kurangBahanAjar').value);
    const jumlah = parseInt(document.getElementById('kurangJumlah').value);
    const keterangan = document.getElementById('kurangKeterangan').value;

    if (!bahanAjarId || !jumlah || !keterangan) {
        showAlert('Mohon lengkapi semua field!', 'danger');
        return;
    }

    const bahanAjar = getBahanAjarById(bahanAjarId);

    if (jumlah < 1) {
        showAlert('Jumlah stok minimal 1 unit!', 'danger');
        return;
    }

    if (jumlah > bahanAjar.stok) {
        showAlert(`Stok tidak mencukupi! Stok tersedia: ${bahanAjar.stok} unit`, 'danger');
        return;
    }

    const stokLama = bahanAjar.stok;

    if (kurangiStok(bahanAjarId, jumlah, keterangan)) {
        showAlert(
            `Berhasil mengurangi stok ${bahanAjar.nama} sebanyak ${jumlah} unit! (${stokLama} → ${bahanAjar.stok})`,
            'success'
        );
        hideModal('kurangModal');
        resetForm('kurangForm');
        loadTableData();
        filterTable(); // Reapply filters
    } else {
        showAlert('Gagal mengurangi stok!', 'danger');
    }
}

// Quick Add Stok (from action button)
function quickAddStok(id) {
    document.getElementById('tambahBahanAjar').value = id;
    updateTambahInfo();
    showModal('tambahModal');
}

// Quick Kurang Stok (from action button)
function quickKurangStok(id) {
    document.getElementById('kurangBahanAjar').value = id;
    updateKurangInfo();
    showModal('kurangModal');
}

// Show Modal
function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

// Hide Modal
function hideModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Reset Form
function resetForm(formId) {
    document.getElementById(formId).reset();
    if (formId === 'tambahForm') {
        document.getElementById('tambahInfoBox').style.display = 'none';
    } else if (formId === 'kurangForm') {
        document.getElementById('kurangInfoBox').style.display = 'none';
    }
}

// Show Alert
function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alertContainer');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <span>${type === 'success' ? '✓' : '✕'}</span>
        ${message}
    `;

    alertContainer.appendChild(alert);

    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.style.transition = 'opacity 0.3s ease';
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});
