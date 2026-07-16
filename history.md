# History Aktivitas Pengembangan - Seleksi JPT BIG

Dokumen ini mencatat semua perubahan, pemecahan masalah, dan penyesuaian yang telah dilakukan pada repositori **seleksi-jpt-new**.

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
