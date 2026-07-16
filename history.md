# History Aktivitas Pengembangan - Seleksi JPT BIG

Dokumen ini mencatat semua perubahan, pemecahan masalah, dan penyesuaian yang telah dilakukan pada repositori **seleksi-jpt-new**.

---

## 16 Juli 2026 (Update 9)

### 1. Perbaikan Fitur Ubah & Hapus Pengumuman serta Penerapan View Inline PDF
- **Perbaikan Rute Router Frontend:** Mendaftarkan path route `/pengumuman/edit/:dataId` ke dalam berkas router [MenuRouting.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/MenuRouting.jsx) agar halaman edit dapat diakses dan tidak langsung memantul kembali (*redirect*) ke halaman list.
- **Perbaikan Hapus Pengumuman (Delete):** Memperbaiki [Delete.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Pengumuman/Delete.jsx) agar memanggil REST API menggunakan method `DELETE` pada endpoint `/api/pengumuman/:uuid` yang sesuai dengan arsitektur backend, menggantikan pemanggilan POST yang salah sebelumnya.
- **Perbaikan Ubah Pengumuman (Edit):** Memperbaiki berkas [Edit.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Pengumuman/Edit.jsx) agar mengambil detail melalui `GET /api/pengumuman/:uuid` dan mengirimkan pembaruan data multipart melalui method `PUT` pada `/api/pengumuman/:uuid` (yang mendukung pembaruan file opsional).
- **Fitur View PDF Inline:**
  - Menambahkan endpoint `GET /api/pengumuman/view/:uuid` di backend ([pengumuman.routes.js](file:///d:/BIG/pansel/seleksi-jpt-new/api_pansel/app/routes/pengumuman.routes.js) dan [pengumuman.controller.js](file:///d:/BIG/pansel/seleksi-jpt-new/api_pansel/app/controllers/pengumuman.controller.js)) yang mengirimkan file PDF secara inline (`Content-Type: application/pdf`).
  - Mengubah tombol unduh di [Table.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Pengumuman/Table.jsx) menjadi tombol **Lihat** (menggunakan ikon `Preview` warna biru) yang membuka dokumen PDF secara inline di tab baru browser (`target="_blank"`).

---

## 16 Juli 2026 (Update 8)

### 1. Penyelarasan Desain Form & Tabel Pengumuman di Admin Panel
- **Penyelarasan Desain Form Tambah & Ubah:** Menulis ulang berkas [Add.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Pengumuman/Add.jsx) dan [Edit.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Pengumuman/Edit.jsx) untuk modul Pengumuman agar menggunakan wadah `.admin-card` dengan header gradasi biru primer, serta tombol aksi bulat (rounded) yang seragam.
- **Penyelarasan Desain Tabel Pengumuman:**
  - Menambahkan kolom **No** sebagai indeks baris tabel pada [Table.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Pengumuman/Table.jsx).
  - Mengubah penamaan header kolom menjadi Bahasa Indonesia: **No**, **Judul**, **Nama File**, **Tanggal Publikasi**, **Status**, dan **Aksi**.
  - Mengubah kolom aksi untuk menampilkan ikon **Download** (warna primary), **Edit** (warna warning), dan **Hapus** (warna error) yang seragam dengan rancangan aksi pada modul Formasi.

---

## 16 Juli 2026 (Update 7)

### 1. Perbaikan Endpoint dan Pemetaan Kolom Pengumuman di Admin Panel
- Mengubah endpoint pengambilan data pada [Table.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Pengumuman/Table.jsx) dari `/api/pengumuman/active/` ke `/api/pengumuman` agar admin dapat mengelola semua berkas pengumuman (aktif maupun tidak aktif).
- Memperbaiki parsing data list respons array langsung dari backend agar tidak bernilai `undefined`.
- Memperbaiki pemetaan kolom baris tabel (`uuid` -> `public_id`, `judul` -> `title`, `file_url` -> `filename`, `tanggal` -> `time_uploaded`, `is_active` -> `status`) yang sebelumnya merujuk pada nama field yang salah, sehingga tabel pengumuman kini dapat menampilkan data secara lengkap.

---

## 16 Juli 2026 (Update 6)

### 1. Perbaikan MulterError: Unexpected field pada Pengunggahan File
- Mengubah middleware `multer` pada rute pengumuman dari `upload.single('file')` menjadi `upload.any()` pada berkas [pengumuman.routes.js](file:///d:/BIG/pansel/seleksi-jpt-new/api_pansel/app/routes/pengumuman.routes.js). Hal ini memungkinkan penerimaan pengunggahan berkas secara fleksibel dengan nama field apa pun (misal, `'file'` dari antarmuka admin React, maupun `'file_url'` dari pengujian klien API Bruno).
- Memperbarui berkas [pengumuman.controller.js](file:///d:/BIG/pansel/seleksi-jpt-new/api_pansel/app/controllers/pengumuman.controller.js) untuk membaca data berkas dari `req.files` (sebagai array) alih-alih `req.file` tunggal.

---

## 16 Juli 2026 (Update 5)

### 1. Perbaikan Kestabilan API Backend (TypeError Guard)
- Menambahkan pemeriksaan keamanan `!req.body` sebelum mengakses properti pada [formasi.controller.js](file:///d:/BIG/pansel/seleksi-jpt-new/api_pansel/app/controllers/formasi.controller.js) dan [pengumuman.controller.js](file:///d:/BIG/pansel/seleksi-jpt-new/api_pansel/app/controllers/pengumuman.controller.js). Hal ini mencegah backend melempar error `TypeError: Cannot read properties of undefined` dan menghentikan proses server (*server crash*) apabila ada permintaan HTTP yang dikirim dengan body kosong atau tanpa header `Content-Type: application/json`.

---

## 16 Juli 2026 (Update 4)

### 1. Integrasi Formasi Dinamis pada Landing Page
- Mengubah berkas [Formasi.js](file:///d:/BIG/pansel/seleksi-jpt-new/landing_page/src/components/Formasi.js) di repositori `landing_page` untuk mengambil data secara dinamis dari server backend menggunakan URL endpoint `Config.api_domain + "/formasi/active"`.
- Menyesuaikan kolom deskripsi Tugas & Fungsi agar mem-parsing teks HTML yang dihasilkan editor WYSIWYG menggunakan `dangerouslySetInnerHTML`.
- Mengubah berkas konfigurasi lokal `landing_page` [config.json](file:///d:/BIG/pansel/seleksi-jpt-new/landing_page/src/config.json) agar merujuk ke server API lokal (`http://localhost:8080/api`) guna memfasilitasi pengujian data secara langsung di lingkungan pengembangan (*local development*).

---

## 16 Juli 2026 (Update 3)

### 1. Implementasi WYSIWYG Editor pada Formasi
- Menginstal paket npm `react-quill` untuk dukungan penyuntingan teks kaya (*rich text*).
- Menulis ulang komponen [Add.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Formasi/Add.jsx) dan [Edit.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Formasi/Edit.jsx) pada modul Formasi untuk menyisipkan editor `ReactQuill` menggantikan input teks biasa pada kolom **Tugas & Fungsi**.
- Memodifikasi [Table.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Formasi/Table.jsx) pada modul Formasi untuk me-render nilai `tugas_fungsi` sebagai HTML terformat menggunakan `dangerouslySetInnerHTML` agar format cetak miring, tebal, maupun daftar terurut tampil dengan benar.

---

## 16 Juli 2026 (Update 2)

### 1. Kustomisasi Sidebar Menu & Penghapusan Pelamar List
- Menata ulang urutan menu navigasi pada [LeftMenu.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/LeftMenu.jsx) menjadi: **Pansel Setting**, **Formasi**, **Pengumuman**, **Jadwal**, **Tahapan**, **Unduh** (menggantikan label *Berkas List*), dan **Account List**.
- Menghapus menu **Pelamar List** dari panel navigasi sidebar.

### 2. Integrasi & Perbaikan Halaman Formasi
- Menulis ulang berkas [Main.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Formasi/Main.jsx) menggunakan layout header `.page-header` bergradasi biru, lengkap dengan badge kategori dan tombol **Tambah Formasi**.
- Menulis ulang berkas [Table.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Formasi/Table.jsx) agar mengambil data dari endpoint yang benar `/api/formasi` (bukan `/api/jadwal/active/` yang tersalin dari modul Jadwal), menampilkan kolom-kolom Formasi yang benar (**No, Order No, Nama Jabatan, Tugas & Fungsi, Status, Aksi**), dan membungkus tabel dalam class `.admin-table-container` agar seragam.
- Menulis ulang berkas [Add.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Formasi/Add.jsx) dan [Edit.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Formasi/Edit.jsx) untuk mendukung form input field Formasi (`order_no`, `jabatan`, `tugas_fungsi`, `is_active`) dengan styling card `.admin-card` bergradasi dan tombol rounded.
- Menulis ulang berkas [DeleteDialog.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Formasi/DeleteDialog.jsx) dan [Delete.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Formasi/Delete.jsx) untuk dialog hapus formasi dengan endpoint `DELETE /api/formasi/:uuid`.
- Mendaftarkan subroute `/formasi/add` dan `/formasi/edit/:dataId` di [MenuRouting.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/MenuRouting.jsx).

### 3. Penyelarasan Desain Halaman Lain (Pengumuman, Jadwal, Tahapan, Berkas/Unduh)
- **Pengumuman**: Mengubah header [Main.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Pengumuman/Main.jsx) dengan template `.page-header` dan menambahkan class `.admin-table-container` pada [Table.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Pengumuman/Table.jsx).
- **Jadwal**: Mengubah header [Main.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Jadwal/Main.jsx) dengan template `.page-header` dan menambahkan class `.admin-table-container` pada [Table.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Jadwal/Table.jsx).
- **Tahapan**: Mengubah header [Main.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Tahapan/Main.jsx) dengan template `.page-header`.
- **Unduh (Berkas)**: Mengubah header [Main.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Berkas/Main.jsx) dengan template `.page-header` (label "Unduh") dan menambahkan class `.admin-table-container` pada [Table.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Berkas/Table.jsx).

---

## 16 Juli 2026 (Update 1)

### 1. Integrasi API & Perbaikan Data pada Menu Account List
* **Masalah:** Halaman *Account List* (menu `/akun`) menampilkan pesan *"No data found"* karena format parsing respons API salah (`data.data` padahal respons dari server backend berupa array langsung) serta kolom-kolom tabel merujuk pada properti model pelamar yang salah (`fullname`, `nohp`, `is_activated`).
* **Solusi:**
  - Memodifikasi [Table.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Akun/Table.jsx) agar mampu mengolah data array langsung dari endpoint `/api/user` (maupun objek terbungkus `{ data: [...] }`).
  - Mengubah pemetaan data baris tabel untuk menampilkan `username` (pada kolom Nama) dan `email`, serta menampilkan status `'Aktif'` / `'Tidak Aktif'`.
  - Menggunakan properti `uuid` sebagai key baris React.

### 2. Penyelarasan Desain & Layout (Kesisuaian Tema)
* **Masalah:** Header dan form tambah/ubah/hapus akun menggunakan tampilan bawaan browser atau background abu-abu tua `#dedede` yang tidak senada dengan Dashboard Utama maupun panel navigasi kiri (Plus Jakarta Sans, linear gradient, modern cards).
* **Solusi:**
  - **Halaman Utama Akun:** Mengubah header di [Main.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Akun/Main.jsx) dengan class `.page-header` serta menyisipkan tombol **Tambah Akun** bermotif gradasi emas-kuning sesuai tema.
  - **Tabel Data:** Membungkus `TableContainer` dalam class `.admin-table-container` agar mendapatkan styling hover, border, shadow, dan ukuran font yang seragam.
  - **Form Tambah ([Add.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Akun/Add.jsx)) & Form Ubah ([Edit.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Akun/Edit.jsx)):** Menulis ulang file dengan wadah `.admin-card` dan gradasi biru pada header card, merapikan input, serta mengubah tombol aksi (Batal/Simpan) menjadi bulat (*rounded*) dan bergradasi warna primer.
  - **Dialog Hapus ([DeleteDialog.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Akun/DeleteDialog.jsx) & [Delete.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Akun/Delete.jsx)):** Menyesuaikan header modal dengan gradasi biru, memperbarui tombol aksi (Hapus/Batal), dan menyelaraskan pesan konfirmasi agar merujuk pada "akun" (bukan "pengumuman").

### 3. Konfigurasi Routing
* **Solusi:** Mendaftarkan path baru `akun/add` dan `akun/edit/:dataId` pada file routing utama admin ([MenuRouting.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/MenuRouting.jsx)) untuk menghubungkan navigasi form secara dinamis.
