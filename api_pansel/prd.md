# Dokumentasi Pengembangan Aplikasi (PRD & Panduan Pengembangan)

Dokumen ini berisi informasi teknis, arsitektur, konfigurasi, dan panduan pengembangan untuk proyek **api_pansel** (API Seleksi JPT).

---

## 1. Deskripsi Proyek
Aplikasi backend **api_pansel** dirancang sebagai RESTful API yang melayani pengelolaan data seleksi Jabatan Pimpinan Tinggi (JPT). Backend ini menyediakan manajemen data pengguna, formasi, jadwal kegiatan, pengumuman, tahapan seleksi, pengunggahan & pengunduhan berkas, konfigurasi web, serta langkah pendaftaran.

---

## 2. Stack Teknologi
Aplikasi ini dibangun menggunakan teknologi berikut:
- **Runtime:** Node.js
- **Framework:** Express.js (v5)
- **Database ORM:** Sequelize (v6) dengan PostgreSQL (`pg` v8) sebagai database engine.
- **Autentikasi & Keamanan:**
  - JSON Web Tokens (`jsonwebtoken`) untuk pengamanan endpoint terlindung.
  - `bcryptjs` untuk enkripsi data password.
  - Implementasi kolom `uuid` (UUIDv4) pada routing publik & privat untuk menggantikan integer ID agar mencegah *ID enumeration attacks*.
- **Library Lainnya:**
  - `multer` untuk pengunggahan file.
  - `exceljs` untuk export data ke format Excel.
  - `dotenv` untuk pengelolaan environment variables.
  - `firebase-admin`, `ldapjs`, `axios`.

---

## 3. Konfigurasi Lingkungan (`.env`)
Untuk menjalankan proyek secara lokal atau deployment, buat file `.env` di direktori root dengan parameter berikut:

```env
PORT=8080
DB_HOST=[DB_HOST_IP_OR_DOMAIN]
DB_PORT=[DB_PORT]
DB_USER=[DB_USERNAME]
DB_PASSWORD=[DB_PASSWORD]
DB_NAME=[DB_DATABASE_NAME]
JWT_SECRET=[JWT_SECRET_KEY]
```

---

## 4. Keamanan & Migrasi UUID
Untuk meningkatkan aspek keamanan (*security*), seluruh identitas data utama yang diekspos melalui API tidak menggunakan auto-incrementing integer ID.

### Detail Perubahan
Setiap model Sequelize sekarang dilengkapi dengan kolom `uuid` otomatis berformat UUIDv4:
```javascript
uuid: {
  type: Sequelize.UUID,
  defaultValue: Sequelize.UUIDV4,
  allowNull: false,
  unique: true
}
```

### Sinkronisasi Database
Jika Anda menggunakan database PostgreSQL dengan schema yang sudah ada, Anda mungkin perlu melakukan sinkronisasi untuk menambahkan kolom baru tersebut secara aman:
1. Ubah sementara baris sinkronisasi di `server.js`:
   ```javascript
   db.sequelize.sync({ alter: true }); // Mengubah tabel tanpa menghapus data
   ```
2. Atau jalankan perintah migrasi SQL jika data di production sudah sangat kritikal.

---

## 5. Struktur Proyek
Aplikasi dibagi menjadi modul-modul berikut di dalam direktori `app/`:
```
api_pansel/
├── app/
│   ├── config/       # Konfigurasi database
│   ├── controllers/  # Logika bisnis dan penanganan request
│   ├── middleware/   # Middleware autentikasi JWT
│   ├── models/       # Definisi model Sequelize (User, Formasi, dll.)
│   ├── routes/       # Definisi rute Express.js
│   └── utils/        # Fungsi utility
├── server.js         # Entrypoint aplikasi utama
└── prd.md            # Dokumen pengembangan ini
```

---

## 6. Struktur Rute & Endpoint API
Setiap entitas utama memiliki operasi CRUD yang berjalan di atas Express dengan format endpoint sebagai berikut:

### Autentikasi (`/api/auth`)
- `POST /api/auth/register` - Pendaftaran pengguna baru
- `POST /api/auth/login` - Login pengguna untuk mendapatkan JWT `x-access-token`

### Manajemen Data JPT (Menggunakan `:uuid`)
Endpoint CRUD berikut menggunakan path parameter `:uuid` untuk keamanan tinggi:

| Entitas | Endpoint Publik (GET) | Endpoint Terproteksi (POST/PUT/DELETE) |
|---|---|---|
| **User** | `/api/user`, `/api/user/:uuid` | `/api/user` (POST), `/api/user/:uuid` (PUT/DELETE) |
| **Formasi** | `/api/formasi/active` | `/api/formasi` (POST/GET), `/api/formasi/:uuid` (GET/PUT/DELETE) |
| **Jadwal** | `/api/jadwal`, `/api/jadwal/:uuid` | `/api/jadwal` (POST), `/api/jadwal/:uuid` (PUT/DELETE) |
| **Pengumuman**| `/api/pengumuman`, `/api/pengumuman/:uuid`, `/api/pengumuman/active` | `/api/pengumuman` (POST), `/api/pengumuman/:uuid` (PUT/DELETE) |
| **Tahapan** | `/api/tahapan`, `/api/tahapan/:uuid`, `/api/tahapan/active` | `/api/tahapan` (POST), `/api/tahapan/:uuid` (PUT/DELETE) |
| **Unduh Berkas**| `/api/unduh_berkas`, `/api/unduh_berkas/:uuid`, `/api/unduh_berkas/active` | `/api/unduh_berkas` (POST), `/api/unduh_berkas/:uuid` (PUT/DELETE) |
| **Langkah Daftar**| `/api/daftar_step`, `/api/daftar_step/:uuid`, `/api/daftar_step/active` | `/api/daftar_step` (POST), `/api/daftar_step/:uuid` (PUT/DELETE) |
| **Web Config** | `/api/web_config`, `/api/web_config/:uuid` | `/api/web_config` (POST), `/api/web_config/:uuid` (PUT/DELETE) |

*Catatan: Semua endpoint terproteksi memerlukan header `x-access-token` yang berisi token JWT.*

---

## 7. Cara Menjalankan Aplikasi
1. Install dependencies:
   ```bash
   npm install
   ```
2. Jalankan server dalam mode development menggunakan `nodemon`:
   ```bash
   npx nodemon server
   ```
3. Jalankan server dalam mode production:
   ```bash
   node server.js
   ```
