# Portfolio Website - HTML/CSS/JS

Website portfolio profesional dengan admin panel untuk mengelola konten. Dibangun dengan HTML, CSS, dan JavaScript vanilla - sederhana dan mudah di-deploy ke GitHub Pages.

## ✨ Fitur

- ✅ Website portfolio responsif dan modern
- ✅ Admin panel untuk mengelola portfolio dan sertifikasi
- ✅ Data management menggunakan localStorage
- ✅ Section Portfolio yang dapat dikustomisasi
- ✅ Section Sertifikasi & Awards yang terpisah
- ✅ 100% HTML/CSS/JS - tidak perlu build process
- ✅ Siap untuk GitHub Pages deployment

## 📁 Struktur File

```
portofolio/
├── index.html          # Halaman utama
├── admin.html          # Admin panel
├── styles.css          # Styling utama
├── script.js           # JavaScript untuk halaman utama
├── admin.js            # JavaScript untuk admin panel
├── data.js             # Data management utilities
└── README.md           # Dokumentasi
```

## 🚀 Cara Menggunakan

### 1. Buka Website

Buka file `index.html` di browser atau gunakan local server:

```bash
# Menggunakan Python
python -m http.server 8000

# Menggunakan Node.js (http-server)
npx http-server

# Menggunakan PHP
php -S localhost:8000
```

Kemudian buka `http://localhost:8000` di browser.

### 2. Akses Admin Panel

- Buka `admin.html` di browser
- Atau klik ikon Settings (⚙️) di header website
- Atau akses `/admin.html` dari halaman utama

### 3. Mengelola Konten

**Portfolio:**
- Klik tab "Portfolio" di admin panel
- Klik "Tambah Item" untuk menambah portfolio baru
- Klik "Edit" untuk mengubah item yang ada
- Klik "Hapus" untuk menghapus item
- Klik "Simpan" untuk menyimpan perubahan ke localStorage

**Certifications & Awards:**
- Klik tab "Sertifikasi & Awards" di admin panel
- Klik "Tambah Item" untuk menambah sertifikasi/award baru
- Pilih tipe: "Certification" atau "Award"
- Klik "Simpan" untuk menyimpan perubahan

## 📦 Deploy ke GitHub Pages

### Metode 1: Manual Upload

1. Buat repository baru di GitHub
2. Upload semua file ke repository
3. Buka **Settings** > **Pages**
4. Pilih branch `main` dan folder `/ (root)`
5. Klik **Save**
6. Website akan tersedia di `https://[username].github.io/[repository-name]`

### Metode 2: Menggunakan Git

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote repository
git remote add origin https://github.com/[username]/[repository-name].git

# Push to GitHub
git branch -M main
git push -u origin main
```

Kemudian aktifkan GitHub Pages di repository settings.

## 🎨 Kustomisasi

### Mengubah Warna Theme

Edit CSS variables di `styles.css`:

```css
:root {
    --primary: #6366f1;        /* Warna utama */
    --accent: #6366f1;         /* Warna aksen */
    --background: #0a0a0a;     /* Background */
    --foreground: #f2f2f2;     /* Text color */
    /* ... */
}
```

### Menambah Data Default

Edit file `data.js` untuk mengubah data default portfolio dan sertifikasi.

## 📝 Catatan Penting

- **Data Storage**: Data disimpan di localStorage browser, jadi setiap browser/device memiliki data terpisah
- **No Backend**: Website ini 100% client-side, tidak memerlukan server backend
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Responsive**: Website sudah responsif untuk mobile, tablet, dan desktop

## 🔧 Teknologi

- **HTML5**: Struktur website
- **CSS3**: Styling dengan CSS Variables untuk theming
- **JavaScript (Vanilla)**: Interaktivitas dan data management
- **Font Awesome**: Icons (via CDN)
- **localStorage**: Data persistence

## 📄 Lisensi

MIT

## 🤝 Kontribusi

Silakan buat issue atau pull request jika ingin berkontribusi!

---

**Dibuat dengan ❤️ untuk portfolio profesional**
