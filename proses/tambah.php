<?php
header('Content-Type: application/json');
require '../koneksi.php';

$nis     = trim($_POST['nis'] ?? '');
$nama    = trim($_POST['nama'] ?? '');
$kelas   = trim($_POST['kelas'] ?? '');
$jurusan = trim($_POST['jurusan'] ?? '');

if ($nis === '' || $nama === '' || $kelas === '' || $jurusan === '') {
    echo json_encode(['status' => 'error', 'message' => 'Semua kolom wajib diisi!']);
    exit;
}

try {
    // Cek duplikasi NIS
    $cek = $pdo->prepare("SELECT id FROM siswa WHERE nis = ?");
    $cek->execute([$nis]);
    if ($cek->rowCount() > 0) {
        echo json_encode(['status' => 'error', 'message' => 'NIS sudah terdaftar!']);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO siswa (nis, nama, kelas, jurusan) VALUES (?, ?, ?, ?)");
    $stmt->execute([$nis, $nama, $kelas, $jurusan]);

    echo json_encode(['status' => 'success', 'message' => 'Data siswa berhasil ditambahkan!']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Gagal menyimpan data: ' . $e->getMessage()]);
}
?>