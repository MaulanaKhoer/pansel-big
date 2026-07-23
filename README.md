# Seleksi JPT - Badan Informasi Geospasial (BIG)

Aplikasi Web & Portal Sistem Informasi Seleksi Terbuka Jabatan Pimpinan Tinggi (JPT) Pratama & Utama — Badan Informasi Geospasial.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend Landing Page:** React.js (Served via Nginx)
- **Frontend Admin Panel:** React.js + Material-UI (Served via Nginx di `/pansel-management/`)
- **Backend API:** Node.js (Express.js + Sequelize ORM)
- **Database:** PostgreSQL (db_pansel_new)
- **Containerization & Web Server:** Docker, Docker Compose, Nginx

---

## 🏗️ Arsitektur Layanan & Port

| Service | Deskripsi | Port Internal | Port Server (Host) |
|---|---|---|---|
| `jpt_landing` | Landing Page Publik (React + Nginx) | 80 | `8081` |
| `jpt_admin` | Dashboard Admin Management (React + Nginx) | 80 | `/pansel-management/` |
| `jpt_api` | Express.js REST API Backend | 8080 | `8080` |
| `PostgreSQL` | Database Utama Server | 5437 | `10.10.170.88:5437` |

---

## 🗄️ Struktur Tabel & Skema Data (Database: `db_pansel_new`)

### 1. Tabel `users` (Akun Administrator / Operator)
Digunakan untuk menyimpan kredensial login admin ke dashboard management.

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| `id` | `INTEGER` | Primary Key (Auto Increment) |
| `uuid` | `UUID` | Unique identifier (UUID v4) |
| `username` | `VARCHAR(255)` | Username login |
| `email` | `VARCHAR(255)` | Email operator |
| `password` | `VARCHAR(255)` | Hash Password (bcrypt) |
| `createdAt` | `TIMESTAMP` | Waktu pembuatan data |
| `updatedAt` | `TIMESTAMP` | Waktu pembaruan data |

---

### 2. Tabel `formasis` (Formasi Jabatan)
Digunakan untuk data Formasi Jabatan Pimpinan Tinggi yang dibuka.

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| `id` | `INTEGER` | Primary Key (Auto Increment) |
| `uuid` | `UUID` | Unique identifier (UUID v4) |
| `order_no` | `INTEGER` | Urutan tampilan formasi |
| `jabatan` | `VARCHAR(255)` | Nama Jabatan |
| `tugas_fungsi` | `TEXT` | Deskripsi Tugas & Fungsi (HTML terformat) |
| `is_active` | `BOOLEAN` | Status aktif (`true`/`false`) |
| `createdAt` | `TIMESTAMP` | Waktu pembuatan data |
| `updatedAt` | `TIMESTAMP` | Waktu pembaruan data |

---

### 3. Tabel `pengumumen` (Pengumuman Seleksi)
Digunakan untuk menyimpan informasi pengumuman resmi dan dokumen PDF pengumuman.

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| `id` | `INTEGER` | Primary Key (Auto Increment) |
| `uuid` | `UUID` | Unique identifier (UUID v4) |
| `judul` | `VARCHAR(255)` | Judul Pengumuman |
| `tanggal` | `DATE` | Tanggal Publikasi Pengumuman |
| `konten` | `TEXT` | Isi pengumuman (Opsional) |
| `file_url` | `VARCHAR(255)` | Nama file PDF pengumuman yang diunggah |
| `is_active` | `BOOLEAN` | Status aktif (`true`/`false`) |
| `createdAt` | `TIMESTAMP` | Waktu pembuatan data |
| `updatedAt` | `TIMESTAMP` | Waktu pembaruan data |

---

### 4. Tabel `jadwals` (Jadwal Pelaksanaan Seleksi)
Digunakan untuk linimasa / agenda kegiatan tahap seleksi.

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| `id` | `INTEGER` | Primary Key (Auto Increment) |
| `uuid` | `UUID` | Unique identifier (UUID v4) |
| `kegiatan` | `VARCHAR(255)` | Nama Tahapan Kegiatan |
| `tanggal_mulai` | `DATE` | Tanggal Dimulainya Kegiatan |
| `tanggal_selesai` | `DATE` | Tanggal Berakhirnya Kegiatan |
| `status` | `BOOLEAN` | Status aktif kegiatan |
| `order_no` | `INTEGER` | Urutan jadwal |
| `createdAt` | `TIMESTAMP` | Waktu pembuatan data |
| `updatedAt` | `TIMESTAMP` | Waktu pembaruan data |

---

### 5. Tabel `tahapans` (Tahapan Seleksi)
Digunakan untuk informasi panduan tahapan seleksi beserta ikon visual.

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| `id` | `INTEGER` | Primary Key (Auto Increment) |
| `uuid` | `UUID` | Unique identifier (UUID v4) |
| `step_no` | `INTEGER` | Nomor tahapan (1, 2, 3, dst) |
| `judul` | `VARCHAR(150)` | Judul Tahapan |
| `deskripsi` | `TEXT` | Rincian instruksi tahapan |
| `icon_name` | `VARCHAR(50)` | Nama ikon Material-UI |
| `is_active` | `BOOLEAN` | Status aktif (`true`/`false`) |
| `createdAt` | `TIMESTAMP` | Waktu pembuatan data |
| `updatedAt` | `TIMESTAMP` | Waktu pembaruan data |

---

### 6. Tabel `unduh_berkas` (Dokumen Berkas Unduhan)
Digunakan untuk daftar templat dokumen yang dapat diunduh oleh pelamar (Surat Pernyataan, Pakta Integritas, dll).

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| `id` | `INTEGER` | Primary Key (Auto Increment) |
| `uuid` | `UUID` | Unique identifier (UUID v4) |
| `order_no` | `INTEGER` | Urutan nomor berkas |
| `nama_berkas` | `VARCHAR(255)` | Nama Berkas Dokumen |
| `nama_file` | `VARCHAR(255)` | Nama Berkas Terunggah (atau teks nama file) |
| `tanggal_publikasi` | `DATE` | Tanggal Publikasi Dokumen |
| `url_link` | `VARCHAR(500)` | URL/Link Unduhan (Lokal / External Drive) |
| `is_active` | `BOOLEAN` | Status aktif (`true`/`false`) |
| `createdAt` | `TIMESTAMP` | Waktu pembuatan data |
| `updatedAt` | `TIMESTAMP` | Waktu pembaruan data |

---

### 7. Tabel `daftar_steps` (Panduan Pendaftaran)
Digunakan untuk teks langkah-langkah panduan pendaftaran pada landing page.

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| `id` | `INTEGER` | Primary Key (Auto Increment) |
| `uuid` | `UUID` | Unique identifier (UUID v4) |
| `step_no` | `INTEGER` | Nomor Urut Langkah |
| `content` | `TEXT` | Konten instruksi langkah pendaftaran |
| `is_active` | `BOOLEAN` | Status aktif (`true`/`false`) |
| `createdAt` | `TIMESTAMP` | Waktu pembuatan data |
| `updatedAt` | `TIMESTAMP` | Waktu pembaruan data |

---

### 8. Tabel `web_configs` (Konfigurasi Ringkasan Web)
Digunakan untuk pengaturan informasi umum dan data statistik ringkasan formasi pada landing page.

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| `id` | `INTEGER` | Primary Key (Auto Increment) |
| `uuid` | `UUID` | Unique identifier (UUID v4) |
| `title` | `VARCHAR(255)` | Judul Utama Halaman Web |
| `caption` | `TEXT` | Deskripsi / Sub-judul |
| `pratama` | `INTEGER` | Jumlah Formasi JPT Pratama |
| `madya` | `INTEGER` | Jumlah Formasi JPT Madya |
| `utama` | `INTEGER` | Jumlah Formasi JPT Utama |
| `createdAt` | `TIMESTAMP` | Waktu pembuatan data |
| `updatedAt` | `TIMESTAMP` | Waktu pembaruan data |

---

## 📡 Daftar Endpoint REST API Utama

### Auth & Operator
- `POST /api/auth/loginOperator` — Authentication Operator Dashboard
- `GET /api/auth/validOperator` — Verifikasi Token Jwt Admin
- `GET /api/user` — Ambil daftar operator admin
- `POST /api/user` — Tambah operator admin baru

### Formasi
- `GET /api/formasi/active` — Public API List Formasi Aktif
- `GET /api/formasi` — Private API All List Formasi (Admin)
- `POST /api/formasi` — Tambah Formasi Jabatan Baru
- `PUT /api/formasi/:uuid` — Edit Formasi Jabatan
- `DELETE /api/formasi/:uuid` — Hapus Formasi Jabatan

### Pengumuman
- `GET /api/pengumuman/active` — Public API List Pengumuman Aktif
- `GET /api/pengumuman` — Private API All List Pengumuman (Admin)
- `GET /api/pengumuman/view/:uuid` — View PDF Pengumuman Inline
- `GET /api/pengumuman/download/:uuid` — Unduh Berkas PDF Pengumuman
- `POST /api/pengumuman` — Tambah Pengumuman Baru (Multipart Upload)
- `PUT /api/pengumuman/:uuid` — Edit Pengumuman
- `DELETE /api/pengumuman/:uuid` — Hapus Pengumuman

### Unduh Berkas
- `GET /api/unduh_berkas/active` — Public API List Berkas Unduhan
- `GET /api/unduh_berkas` — Private API All List Berkas (Admin)
- `POST /api/unduh_berkas` — Tambah Berkas Unduhan Baru
- `PUT /api/unduh_berkas/:uuid` — Edit Berkas Unduhan
- `DELETE /api/unduh_berkas/:uuid` — Hapus Berkas Unduhan

---

## 🚀 Panduan Jalankan Aplikasi (Docker)

```bash
# Clone Repositori
git clone https://github.com/MaulanaKhoer/pansel-big.git
cd seleksi-jpt-new

# Buat Berkas .env Backend (jika belum ada)
cp api_pansel/.env.example api_pansel/.env

# Build & Run dengan Docker Compose
docker compose up -d --build
```
