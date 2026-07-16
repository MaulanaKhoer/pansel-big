# History Aktivitas Pengembangan - Seleksi JPT BIG

Dokumen ini mencatat semua perubahan, pemecahan masalah, dan penyesuaian yang telah dilakukan pada repositori **seleksi-jpt-new**.

---

## 16 Juli 2026

### 1. Integrasi API & Perbaikan Data pada Menu Account List
* **Masalah:** Halaman *Account List* (menu `/akun`) menampilkan pesan *"No data found"* karena format parsing respons API salah (`data.data` padahal respons dari server backend berupa array langsung) serta kolom-kolom tabel merujuk pada properti model pelamar yang salah (`fullname`, `nohp`, `is_activated`).
* **Solusi:**
  - Memodifikasi [Table.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Akun/Table.jsx) agar mampu mengolah data array langsung dari endpoint `/api/user` (maupun objek terbungkus `{ data: [...] }`).
  - Mengubah pemetaan data baris tabel untuk menampilkan `username` (pada kolom Nama) dan `email`, serta menampilkan status `'Aktif'` / `'Tidak Aktif'`.
  - Menggunakan properti `uuid` sebagai key baris React.

### 2. Penyelarasan Desain & Layout (Kesesuaian Tema)
* **Masalah:** Header dan form tambah/ubah/hapus akun menggunakan tampilan bawaan browser atau background abu-abu tua `#dedede` yang tidak senada dengan Dashboard Utama maupun panel navigasi kiri (Plus Jakarta Sans, linear gradient, modern cards).
* **Solusi:**
  - **Halaman Utama Akun:** Mengubah header di [Main.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Akun/Main.jsx) dengan class `.page-header` serta menyisipkan tombol **Tambah Akun** bermotif gradasi emas-kuning sesuai tema.
  - **Tabel Data:** Membungkus `TableContainer` dalam class `.admin-table-container` agar mendapatkan styling hover, border, shadow, dan ukuran font yang seragam.
  - **Form Tambah ([Add.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Akun/Add.jsx)) & Form Ubah ([Edit.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Akun/Edit.jsx)):** Menulis ulang file dengan wadah `.admin-card` dan gradasi biru pada header card, merapikan input, serta mengubah tombol aksi (Batal/Simpan) menjadi bulat (*rounded*) dan bergradasi warna primer.
  - **Dialog Hapus ([DeleteDialog.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Akun/DeleteDialog.jsx) & [Delete.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/components/Content/Akun/Delete.jsx)):** Menyesuaikan header modal dengan gradasi biru, memperbarui tombol aksi (Hapus/Batal), dan menyelaraskan pesan konfirmasi agar merujuk pada "akun" (bukan "pengumuman").

### 3. Konfigurasi Routing
* **Solusi:** Mendaftarkan path baru `akun/add` dan `akun/edit/:dataId` pada file routing utama admin ([MenuRouting.jsx](file:///d:/BIG/pansel/seleksi-jpt-new/pansel_admin/src/MenuRouting.jsx)) untuk menghubungkan navigasi form secara dinamis.

### 4. Setup Git dan Sinkronisasi ke GitHub
* **Masalah:** Repositori lokal belum diinisiasi sebagai repositori Git, dan ketika dihubungkan ke GitHub terjadi konflik *rejected (fetch first)* karena perbedaan riwayat commit.
* **Solusi:**
  - Membuat berkas `.gitignore` untuk menyaring file `node_modules` dan file rahasia `.env`.
  - Melakukan inisialisasi git local (`git init`), menambahkan semua file (`git add .`), dan melakukan commit awal.
  - Menyelesaikan pertentangan riwayat dengan menarik data remote menggunakan parameter `--allow-unrelated-histories` (`git pull origin main --allow-unrelated-histories`).
  - Berhasil mengunggah (*push*) semua file ke repositori GitHub `https://github.com/MaulanaKhoer/pansel-big` pada branch `main`.
