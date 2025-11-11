# Sistem Inventory Tracking Bahan Ajar

Sistem manajemen inventory modern untuk mengelola stok bahan ajar dengan tampilan clean dan user-friendly.

## Fitur Utama

### 1. Dashboard
- **Statistik Real-time**: Tampilan total bahan ajar, total stok, stok rendah, dan kategori terbanyak
- **Daftar Bahan Ajar**: Tabel lengkap dengan informasi detail setiap bahan ajar
- **Filter & Search**: Pencarian dan filter berdasarkan kategori
- **Aktivitas Terbaru**: Timeline aktivitas stok masuk dan keluar

### 2. Manajemen Stok
- **Tambah Stok**: Fitur untuk menambah stok bahan ajar dengan:
  - Pilih bahan ajar dari dropdown
  - Input jumlah stok yang akan ditambah
  - Keterangan/alasan penambahan stok
  - Preview informasi bahan ajar (kode, kategori, stok saat ini)

- **Kurangi Stok**: Fitur untuk mengurangi stok dengan:
  - Validasi stok tersedia
  - Tidak bisa mengurangi melebihi stok yang ada
  - Tracking otomatis setiap transaksi

- **Filter Lanjutan**:
  - Pencarian berdasarkan nama/kode/penerbit
  - Filter kategori
  - Filter status stok (Aman/Sedang/Rendah)

- **Indikator Stok Visual**:
  - 🟢 Hijau (Aman): Stok ≥ 20
  - 🟡 Kuning (Sedang): Stok 10-19
  - 🔴 Merah (Rendah): Stok < 10

### 3. Tracking Pergerakan Stok
- **Riwayat Lengkap**: Semua transaksi stok masuk dan keluar
- **Dual View Mode**:
  - 📊 Tampilan Tabel: Format tabel tradisional
  - 📅 Tampilan Timeline: Timeline visual dengan grouping per tanggal

- **Filter Komprehensif**:
  - Pencarian teks
  - Filter bahan ajar spesifik
  - Filter jenis transaksi (masuk/keluar)
  - Filter berdasarkan tanggal

- **Statistik Transaksi**:
  - Total transaksi
  - Jumlah stok masuk/keluar
  - Transaksi hari ini

- **Statistik Per Bahan Ajar**:
  - Total stok masuk per item
  - Total stok keluar per item
  - Stok saat ini
  - Perubahan bersih (↑/↓)

- **Export Data**: Export riwayat tracking ke format CSV

## Struktur File

```
tugas2-vue-ut/
├─ index.html           # Halaman dashboard
├─ stok.html            # Halaman manajemen stok
├─ tracking.html        # Halaman tracking
├─ css/
│   └─ style.css        # Styling modern dengan CSS variables
└─ js/
    ├─ dataBahanAjar.js # Data dan fungsi CRUD bahan ajar
    ├─ stok-app.js      # Logika aplikasi manajemen stok
    └─ tracking-app.js  # Logika aplikasi tracking
```

## Data Bahan Ajar

Sistem ini dilengkapi dengan 10 data bahan ajar sample meliputi:
- **Buku**: Matematika, Fisika, Kimia
- **Modul**: Bahasa Inggris, Praktikum Biologi
- **LKS**: Matematika, Bahasa Indonesia
- **Alat Peraga**: Geometri, Sistem Tata Surya
- **Digital**: CD Pembelajaran Interaktif

Setiap bahan ajar memiliki:
- Kode unik
- Nama
- Kategori
- Penerbit
- Tahun terbit
- Stok tersedia
- Harga
- Deskripsi

## Cara Menggunakan

### 1. Membuka Aplikasi
Buka `index.html` di browser untuk memulai aplikasi.

### 2. Menambah Stok
1. Klik menu **Manajemen Stok**
2. Klik tombol **➕ Tambah Stok**
3. Pilih bahan ajar dari dropdown
4. Masukkan jumlah stok
5. Isi keterangan (contoh: "Pembelian dari supplier")
6. Klik **Tambah Stok**

### 3. Mengurangi Stok
1. Klik menu **Manajemen Stok**
2. Klik tombol **➖ Kurangi Stok**
3. Pilih bahan ajar
4. Masukkan jumlah (tidak boleh melebihi stok tersedia)
5. Isi keterangan (contoh: "Peminjaman kelas X-A")
6. Klik **Kurangi Stok**

### 4. Quick Action
Di halaman Manajemen Stok, setiap baris tabel memiliki tombol:
- **➕**: Quick tambah stok
- **➖**: Quick kurangi stok

### 5. Melihat Tracking
1. Klik menu **Tracking**
2. Gunakan filter untuk mencari transaksi spesifik
3. Toggle antara tampilan Tabel atau Timeline
4. Export data jika diperlukan

## Teknologi

- **HTML5**: Struktur halaman
- **CSS3**: Styling modern dengan:
  - CSS Variables untuk theming
  - Flexbox & Grid untuk layout
  - Responsive design
  - Smooth animations & transitions
- **Vanilla JavaScript**: Logika aplikasi tanpa framework
- **Local Storage Ready**: Data tersimpan di memori (dapat diupgrade ke localStorage)

## Desain Modern

- **Clean Look**: Minimalis dengan fokus pada konten
- **Color Scheme**:
  - Primary: Indigo (#6366f1)
  - Success: Green (#10b981)
  - Warning: Amber (#f59e0b)
  - Danger: Red (#ef4444)
- **Typography**: Inter font family
- **Components**:
  - Cards dengan shadow & border radius
  - Badges untuk status
  - Modal dengan backdrop blur
  - Alert notifications
  - Timeline visual
  - Responsive tables

## Responsive Design

Aplikasi fully responsive dan dapat digunakan di:
- Desktop (1400px+)
- Tablet (768px - 1400px)
- Mobile (< 768px)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Pengembangan Selanjutnya

Fitur yang dapat ditambahkan:
- [ ] LocalStorage/IndexedDB untuk persistensi data
- [ ] Backend API integration
- [ ] User authentication
- [ ] Advanced reporting & charts
- [ ] Print preview untuk laporan
- [ ] Barcode scanner integration
- [ ] Email notifications untuk stok rendah
- [ ] Multi-language support

## Author

Dibuat untuk tugas kuliah - Sistem Inventory Bahan Ajar
