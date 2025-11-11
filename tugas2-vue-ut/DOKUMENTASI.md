# Dokumentasi Sistem Inventory Bahan Ajar

## Panduan Lengkap Penggunaan Sistem

---

## 1. HALAMAN DASHBOARD (index.html)

### Fitur:
1. **Statistik Card**
   - Total Bahan Ajar: Menampilkan jumlah total item bahan ajar
   - Total Stok: Jumlah keseluruhan unit stok tersedia
   - Stok Rendah: Jumlah item dengan stok < 10
   - Kategori Terbanyak: Kategori dengan jumlah item terbanyak

2. **Tabel Daftar Bahan Ajar**
   - Kolom: Kode, Nama, Kategori, Penerbit, Tahun, Stok, Status, Harga
   - Indikator stok visual (warna hijau/kuning/merah)
   - Status badge: Aman/Sedang/Rendah

3. **Filter & Pencarian**
   - Search box untuk mencari berdasarkan nama/kode/penerbit/deskripsi
   - Dropdown filter kategori

4. **Aktivitas Terbaru**
   - Timeline 5 aktivitas terakhir
   - Menampilkan transaksi stok masuk/keluar
   - Link ke halaman tracking lengkap

---

## 2. HALAMAN MANAJEMEN STOK (stok.html)

### Fitur Utama:

#### A. Tambah Stok
**Cara Penggunaan:**
1. Klik tombol "➕ Tambah Stok" di pojok kanan atas
2. Modal akan muncul dengan form:
   - **Pilih Bahan Ajar**: Dropdown berisi semua bahan ajar (format: Kode - Nama)
   - **Info Box**: Setelah memilih, akan muncul:
     - Kode bahan ajar
     - Kategori
     - Stok saat ini
   - **Jumlah Stok Masuk**: Input angka (minimal 1)
   - **Keterangan**: Textarea untuk menjelaskan alasan penambahan

3. Contoh pengisian:
   ```
   Bahan Ajar: BK001 - Buku Matematika Dasar
   Jumlah: 10
   Keterangan: Pembelian dari toko buku Gramedia
   ```

4. Klik tombol "✓ Tambah Stok"
5. Alert sukses akan muncul: "Berhasil menambah stok ... sebanyak ... unit! (20 → 30)"
6. Tabel otomatis ter-update

#### B. Kurangi Stok
**Cara Penggunaan:**
1. Klik tombol "➖ Kurangi Stok"
2. Modal akan muncul dengan form serupa
3. **Penting**: Jumlah yang diinput tidak boleh melebihi stok tersedia
4. Contoh pengisian:
   ```
   Bahan Ajar: BK001 - Buku Matematika Dasar
   Jumlah: 5
   Keterangan: Peminjaman untuk kelas X-A
   ```

5. Sistem akan validasi:
   - Jika jumlah > stok tersedia: Error "Stok tidak mencukupi!"
   - Jika valid: Stok berkurang dan tracking tercatat

#### C. Quick Action Button
Di setiap baris tabel, terdapat:
- **➕ Button**: Langsung membuka modal tambah dengan bahan ajar sudah terpilih
- **➖ Button**: Langsung membuka modal kurangi dengan bahan ajar sudah terpilih

#### D. Filter Lanjutan
1. **Search Box**: Cari berdasarkan nama/kode/penerbit/deskripsi
2. **Filter Kategori**: Buku, Modul, LKS, Alat Peraga, Digital
3. **Filter Status Stok**:
   - Aman (≥20 unit)
   - Sedang (10-19 unit)
   - Rendah (<10 unit)

**Tips**: Gunakan filter "Rendah" untuk cepat menemukan item yang perlu restock!

---

## 3. HALAMAN TRACKING (tracking.html)

### Fitur Utama:

#### A. Statistik Transaksi
4 Card menampilkan:
- Total Transaksi: Semua transaksi yang pernah terjadi
- Stok Masuk: Jumlah transaksi penambahan
- Stok Keluar: Jumlah transaksi pengurangan
- Transaksi Hari Ini: Aktivitas hari ini

#### B. Riwayat Transaksi dengan Dual View

**1. Tampilan Tabel** (Default)
- Format tabel tradisional dengan kolom:
  - Tanggal & Waktu
  - Kode
  - Nama Bahan Ajar
  - Jenis (Badge hijau untuk masuk, merah untuk keluar)
  - Jumlah (dengan satuan unit)
  - Keterangan

**2. Tampilan Timeline**
- Grouped by date (tanggal dalam bahasa Indonesia)
- Visual timeline dengan marker berwarna:
  - 🟢 Hijau: Stok masuk
  - 🔴 Merah: Stok keluar
- Card untuk setiap transaksi dengan detail lengkap

**Cara Toggle View:**
Klik button di bawah tabel:
- 📊 Tampilan Tabel
- 📅 Tampilan Timeline

#### C. Filter Komprehensif
1. **Search**: Cari berdasarkan nama bahan ajar/kode/keterangan
2. **Filter Bahan Ajar**: Pilih bahan ajar spesifik
3. **Filter Jenis**:
   - Semua
   - Stok Masuk
   - Stok Keluar
4. **Filter Tanggal**: Pilih tanggal spesifik (date picker)

**Contoh Use Case:**
- Ingin lihat semua transaksi "Buku Matematika Dasar" yang masuk di bulan Januari:
  1. Pilih bahan ajar: "BK001 - Buku Matematika Dasar"
  2. Pilih jenis: "Stok Masuk"
  3. Pilih tanggal: 2024-01-15

#### D. Statistik Per Bahan Ajar
Tabel komprehensif menampilkan:
- **Nama Bahan Ajar** (dengan kode dan kategori)
- **Stok Masuk**: Badge hijau dengan total unit masuk
- **Stok Keluar**: Badge merah dengan total unit keluar
- **Stok Saat Ini**: Jumlah stok terkini
- **Perubahan**: Badge dengan indikator:
  - ↑ Hijau: Perubahan positif (masuk > keluar)
  - ↓ Merah: Perubahan negatif (keluar > masuk)
  - − Abu: Tidak ada perubahan

**Manfaat**: Analisis pergerakan stok per item untuk decision making

#### E. Export Data
1. Klik tombol "📄 Export Data"
2. File CSV akan terdownload otomatis
3. Nama file: `tracking-stok-YYYY-MM-DD.csv`
4. Format CSV:
   ```
   Tanggal,Waktu,Kode,Nama Bahan Ajar,Jenis,Jumlah,Keterangan
   2024-01-15,10:30,BK001,"Buku Matematika Dasar",masuk,25,"Stok awal"
   ```
5. Dapat dibuka di Excel/Google Sheets untuk analisis lanjutan

---

## 4. DATA BAHAN AJAR (dataBahanAjar.js)

### Struktur Data:

```javascript
{
    id: 1,
    kode: "BK001",
    nama: "Buku Matematika Dasar",
    kategori: "Buku",
    penerbit: "Erlangga",
    tahun: 2023,
    stok: 25,
    harga: 85000,
    deskripsi: "Buku matematika untuk tingkat SMA kelas X"
}
```

### Fungsi-fungsi Tersedia:

1. **getAllBahanAjar()**: Mengambil semua data bahan ajar
2. **getBahanAjarById(id)**: Mengambil bahan ajar berdasarkan ID
3. **getBahanAjarByKategori(kategori)**: Filter berdasarkan kategori
4. **tambahStok(bahanAjarId, jumlah, keterangan)**: Menambah stok
5. **kurangiStok(bahanAjarId, jumlah, keterangan)**: Mengurangi stok
6. **getAllTracking()**: Mengambil semua riwayat transaksi
7. **getTrackingByBahanAjar(bahanAjarId)**: Tracking per bahan ajar
8. **getStatistik()**: Mengambil statistik dashboard

### Kategori Bahan Ajar:
1. **Buku**: Buku pelajaran utama
2. **Modul**: Modul pembelajaran
3. **LKS**: Lembar Kerja Siswa
4. **Alat Peraga**: Alat peraga edukatif
5. **Digital**: Media pembelajaran digital (CD, software)

---

## 5. DESAIN & UI/UX

### Color Scheme:
- **Primary (Indigo)**: Tombol utama, brand color
- **Success (Green)**: Stok masuk, status aman
- **Warning (Amber)**: Status stok sedang
- **Danger (Red)**: Stok keluar, status rendah, alert

### Components:
1. **Card**: Container dengan shadow dan border radius
2. **Badge**: Label kecil untuk kategori/status
3. **Modal**: Dialog popup dengan backdrop blur
4. **Alert**: Notifikasi auto-dismiss (5 detik)
5. **Timeline**: Visual timeline dengan marker dan card
6. **Table**: Responsive dengan hover effect

### Responsive Breakpoints:
- **Desktop**: > 1400px
- **Tablet**: 768px - 1400px
- **Mobile**: < 768px

---

## 6. WORKFLOW UMUM

### Scenario 1: Restocking Bahan Ajar
1. Buka **Dashboard** → Lihat "Stok Rendah"
2. Klik **Manajemen Stok** → Filter "Status: Rendah"
3. Klik ➕ di bahan ajar yang perlu restock
4. Isi form:
   - Jumlah: sesuai kebutuhan
   - Keterangan: "Restock bulanan dari supplier"
5. Submit → Stok ter-update
6. Verifikasi di **Tracking** → Lihat transaksi tercatat

### Scenario 2: Peminjaman Kelas
1. Guru meminjam 10 buku matematika untuk kelas X-A
2. Buka **Manajemen Stok**
3. Klik ➖ di "Buku Matematika Dasar"
4. Isi form:
   - Jumlah: 10
   - Keterangan: "Peminjaman kelas X-A - Semester 1"
5. Submit → Stok berkurang
6. Tracking tercatat untuk audit

### Scenario 3: Audit Bulanan
1. Buka **Tracking**
2. Export data bulan berjalan
3. Buka di Excel
4. Analisis:
   - Item dengan transaksi terbanyak
   - Kategori paling banyak dipinjam
   - Pola peminjaman per tanggal
5. Buat keputusan procurement

---

## 7. TIPS & BEST PRACTICES

### Untuk Admin:
1. ✅ Selalu isi keterangan dengan jelas (untuk audit)
2. ✅ Cek stok rendah secara berkala (dashboard)
3. ✅ Export tracking data setiap akhir bulan
4. ✅ Gunakan kode bahan ajar konsisten
5. ❌ Jangan input jumlah negatif
6. ❌ Jangan kurangi stok melebihi tersedia

### Untuk Guru/User:
1. ✅ Catat peminjaman dengan detail kelas
2. ✅ Gunakan search untuk cepat menemukan bahan ajar
3. ✅ Cek stok tersedia sebelum meminjam

### Maintenance:
1. Backup data tracking secara berkala
2. Monitor performa browser (clear cache jika lambat)
3. Update data bahan ajar jika ada penambahan item baru

---

## 8. TROUBLESHOOTING

### Masalah: Tabel tidak muncul
- **Solusi**: Refresh browser (F5)
- **Penyebab**: JavaScript belum loaded

### Masalah: Modal tidak bisa ditutup
- **Solusi**: Klik tombol X atau area di luar modal
- **Alternatif**: Klik tombol "Batal"

### Masalah: Filter tidak bekerja
- **Solusi**: Clear filter → Pilih "Semua" di semua dropdown
- **Cek**: Pastikan search box kosong

### Masalah: Tidak bisa mengurangi stok
- **Solusi**: Cek jumlah input tidak melebihi stok tersedia
- **Validasi**: Sistem akan menolak jika stok tidak cukup

---

## 9. FITUR KEAMANAN & VALIDASI

1. **Input Validation**:
   - Jumlah minimal 1
   - Tidak boleh kosong
   - Tidak boleh negatif

2. **Stock Validation**:
   - Kurangi stok: cek ketersediaan
   - Prevent over-reduction

3. **Data Integrity**:
   - Auto tracking setiap transaksi
   - Timestamp otomatis
   - ID unik untuk setiap transaksi

---

## 10. PENGEMBANGAN KEDEPAN

### Phase 1 (Current): ✅ SELESAI
- Dashboard dengan statistik
- Manajemen stok (tambah/kurangi)
- Tracking dengan dual view
- Filter & search komprehensif
- Export CSV

### Phase 2 (Future):
- [ ] Backend integration (API)
- [ ] Database (MySQL/PostgreSQL)
- [ ] User authentication & authorization
- [ ] Role management (Admin/Guru/Staff)

### Phase 3 (Advanced):
- [ ] Charts & visualization (Chart.js)
- [ ] Advanced reporting
- [ ] Email notification stok rendah
- [ ] Barcode scanner
- [ ] Mobile app version

---

**Selamat menggunakan Sistem Inventory Bahan Ajar!**
Untuk pertanyaan atau issue, silakan hubungi developer.
