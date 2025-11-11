// Data Bahan Ajar untuk Sistem Inventory Tracking
const dataBahanAjar = [
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
    },
    {
        id: 2,
        kode: "BK002",
        nama: "Buku Fisika Modern",
        kategori: "Buku",
        penerbit: "Gramedia",
        tahun: 2023,
        stok: 18,
        harga: 95000,
        deskripsi: "Buku fisika untuk tingkat SMA kelas XI"
    },
    {
        id: 3,
        kode: "BK003",
        nama: "Buku Kimia Organik",
        kategori: "Buku",
        penerbit: "Yudhistira",
        tahun: 2022,
        stok: 22,
        harga: 88000,
        deskripsi: "Buku kimia organik untuk tingkat SMA"
    },
    {
        id: 4,
        kode: "MD001",
        nama: "Modul Bahasa Inggris",
        kategori: "Modul",
        penerbit: "Oxford",
        tahun: 2023,
        stok: 30,
        harga: 45000,
        deskripsi: "Modul pembelajaran bahasa Inggris tingkat menengah"
    },
    {
        id: 5,
        kode: "MD002",
        nama: "Modul Praktikum Biologi",
        kategori: "Modul",
        penerbit: "Erlangga",
        tahun: 2023,
        stok: 15,
        harga: 55000,
        deskripsi: "Modul praktikum biologi lengkap dengan panduan"
    },
    {
        id: 6,
        kode: "LKS001",
        nama: "LKS Matematika Semester 1",
        kategori: "LKS",
        penerbit: "Intan Pariwara",
        tahun: 2024,
        stok: 40,
        harga: 35000,
        deskripsi: "Lembar Kerja Siswa matematika semester 1"
    },
    {
        id: 7,
        kode: "LKS002",
        nama: "LKS Bahasa Indonesia",
        kategori: "LKS",
        penerbit: "Viva Pakarindo",
        tahun: 2024,
        stok: 35,
        harga: 32000,
        deskripsi: "Lembar Kerja Siswa bahasa Indonesia"
    },
    {
        id: 8,
        kode: "AL001",
        nama: "Alat Peraga Geometri",
        kategori: "Alat Peraga",
        penerbit: "Edukatif Indonesia",
        tahun: 2023,
        stok: 10,
        harga: 150000,
        deskripsi: "Set alat peraga untuk pembelajaran geometri"
    },
    {
        id: 9,
        kode: "AL002",
        nama: "Alat Peraga Sistem Tata Surya",
        kategori: "Alat Peraga",
        penerbit: "Science Kit",
        tahun: 2022,
        stok: 5,
        harga: 250000,
        deskripsi: "Model 3D sistem tata surya"
    },
    {
        id: 10,
        kode: "DG001",
        nama: "CD Pembelajaran Interaktif Sejarah",
        kategori: "Digital",
        penerbit: "EduTech",
        tahun: 2023,
        stok: 20,
        harga: 75000,
        deskripsi: "Media pembelajaran digital sejarah Indonesia"
    }
];

// Data tracking stok (history perubahan stok)
let trackingData = [
    {
        id: 1,
        bahanAjarId: 1,
        tanggal: "2024-01-15",
        waktu: "10:30",
        jenis: "masuk",
        jumlah: 25,
        keterangan: "Stok awal"
    },
    {
        id: 2,
        bahanAjarId: 2,
        tanggal: "2024-01-15",
        waktu: "10:35",
        jenis: "masuk",
        jumlah: 20,
        keterangan: "Stok awal"
    },
    {
        id: 3,
        bahanAjarId: 1,
        tanggal: "2024-01-20",
        waktu: "14:20",
        jenis: "keluar",
        jumlah: 5,
        keterangan: "Peminjaman kelas X-A"
    }
];

// Kategori yang tersedia
const kategoriList = [
    "Buku",
    "Modul",
    "LKS",
    "Alat Peraga",
    "Digital"
];

// Fungsi untuk mendapatkan semua data bahan ajar
function getAllBahanAjar() {
    return dataBahanAjar;
}

// Fungsi untuk mendapatkan bahan ajar berdasarkan ID
function getBahanAjarById(id) {
    return dataBahanAjar.find(item => item.id === parseInt(id));
}

// Fungsi untuk mendapatkan bahan ajar berdasarkan kategori
function getBahanAjarByKategori(kategori) {
    if (kategori === "Semua") return dataBahanAjar;
    return dataBahanAjar.filter(item => item.kategori === kategori);
}

// Fungsi untuk menambah stok
function tambahStok(bahanAjarId, jumlah, keterangan) {
    const bahanAjar = getBahanAjarById(bahanAjarId);
    if (bahanAjar) {
        bahanAjar.stok += parseInt(jumlah);

        // Tambahkan ke tracking
        const tracking = {
            id: trackingData.length + 1,
            bahanAjarId: bahanAjarId,
            tanggal: new Date().toISOString().split('T')[0],
            waktu: new Date().toTimeString().split(' ')[0].substring(0, 5),
            jenis: "masuk",
            jumlah: parseInt(jumlah),
            keterangan: keterangan
        };
        trackingData.push(tracking);

        return true;
    }
    return false;
}

// Fungsi untuk mengurangi stok
function kurangiStok(bahanAjarId, jumlah, keterangan) {
    const bahanAjar = getBahanAjarById(bahanAjarId);
    if (bahanAjar && bahanAjar.stok >= jumlah) {
        bahanAjar.stok -= parseInt(jumlah);

        // Tambahkan ke tracking
        const tracking = {
            id: trackingData.length + 1,
            bahanAjarId: bahanAjarId,
            tanggal: new Date().toISOString().split('T')[0],
            waktu: new Date().toTimeString().split(' ')[0].substring(0, 5),
            jenis: "keluar",
            jumlah: parseInt(jumlah),
            keterangan: keterangan
        };
        trackingData.push(tracking);

        return true;
    }
    return false;
}

// Fungsi untuk mendapatkan semua tracking
function getAllTracking() {
    return trackingData.map(track => {
        const bahanAjar = getBahanAjarById(track.bahanAjarId);
        return {
            ...track,
            namaBahanAjar: bahanAjar ? bahanAjar.nama : "Unknown",
            kodeBahanAjar: bahanAjar ? bahanAjar.kode : "Unknown"
        };
    }).sort((a, b) => {
        const dateA = new Date(a.tanggal + ' ' + a.waktu);
        const dateB = new Date(b.tanggal + ' ' + b.waktu);
        return dateB - dateA;
    });
}

// Fungsi untuk mendapatkan tracking berdasarkan bahan ajar
function getTrackingByBahanAjar(bahanAjarId) {
    return trackingData.filter(track => track.bahanAjarId === parseInt(bahanAjarId))
        .map(track => {
            const bahanAjar = getBahanAjarById(track.bahanAjarId);
            return {
                ...track,
                namaBahanAjar: bahanAjar ? bahanAjar.nama : "Unknown",
                kodeBahanAjar: bahanAjar ? bahanAjar.kode : "Unknown"
            };
        }).sort((a, b) => {
            const dateA = new Date(a.tanggal + ' ' + a.waktu);
            const dateB = new Date(b.tanggal + ' ' + b.waktu);
            return dateB - dateA;
        });
}

// Fungsi untuk mendapatkan statistik
function getStatistik() {
    return {
        totalBahanAjar: dataBahanAjar.length,
        totalStok: dataBahanAjar.reduce((sum, item) => sum + item.stok, 0),
        stokRendah: dataBahanAjar.filter(item => item.stok < 10).length,
        kategoriTerbanyak: getMostCategory()
    };
}

function getMostCategory() {
    const kategorCount = {};
    dataBahanAjar.forEach(item => {
        kategorCount[item.kategori] = (kategorCount[item.kategori] || 0) + 1;
    });
    return Object.keys(kategorCount).reduce((a, b) =>
        kategorCount[a] > kategorCount[b] ? a : b
    );
}
