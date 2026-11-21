 <!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manajemen Data Siswa — AJAX & PHP</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Manajemen Data Siswa</h1>
            <p>Aplikasi CRUD Interaktif dengan PHP Native & Fetch API</p>
        </header>

        <!-- Notifikasi JSON Response -->
        <div id="alert-box" class="alert hidden"></div>

        <div class="main-grid">
            <!-- Bagian Form Input / Edit -->
            <section class="card form-section">
                <h2 id="form-title">Tambah Data Siswa</h2>
                <form id="form-siswa" novalidate>
                    <input type="hidden" id="siswa-id" name="id">

                    <div class="form-group">
                        <label for="nis">NIS</label>
                        <input type="text" id="nis" name="nis" placeholder="Contoh: 2026004" autocomplete="off">
                        <small class="error-msg" id="error-nis"></small>
                    </div>

                    <div class="form-group">
                        <label for="nama">Nama Lengkap</label>
                        <input type="text" id="nama" name="nama" placeholder="Masukkan nama siswa" autocomplete="off">
                        <small class="error-msg" id="error-nama"></small>
                    </div>

                    <div class="form-group">
                        <label for="kelas">Kelas</label>
                        <select id="kelas" name="kelas">
                            <option value="">-- Pilih Kelas --</option>
                            <option value="X">X</option>
                            <option value="XI">XI</option>
                            <option value="XII">XII</option>
                        </select>
                        <small class="error-msg" id="error-kelas"></small>
                    </div>

                    <div class="form-group">
                        <label for="jurusan">Jurusan</label>
                        <select id="jurusan" name="jurusan">
                            <option value="">-- Pilih Jurusan --</option>
                            <option value="RPL">Rekayasa Perangkat Lunak (RPL)</option>
                            <option value="TKJ">Teknik Komputer & Jaringan (TKJ)</option>
                            <option value="DKV">Desain Komunikasi Visual (DKV)</option>
                        </select>
                        <small class="error-msg" id="error-jurusan"></small>
                    </div>

                    <div class="form-actions">
                        <button type="submit" id="btn-submit" class="btn btn-primary">Simpan Data</button>
                        <button type="button" id="btn-batal" class="btn btn-secondary hidden">Batal Edit</button>
                    </div>
                </form>
            </section>

            <!-- Bagian Tabel & Pencarian -->
            <section class="card table-section">
                <div class="table-header">
                    <h2>Daftar Siswa</h2>
                    <input type="text" id="search-input" placeholder="Cari NIS, Nama, atau Jurusan...">
                </div>

                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>NIS</th>
                                <th>Nama</th>
                                <th>Kelas</th>
                                <th>Jurusan</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="tabel-siswa">
                            <!-- Data dimuat otomatis via AJAX -->
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </div>

    <script src="js/script.js"></script>
</body>
</html>