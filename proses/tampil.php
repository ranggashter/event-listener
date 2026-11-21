<?php
header('Content-Type: application/json');
require '../koneksi.php';

$keyword = isset($_GET['q']) ? trim($_GET['q']) : '';

try {
    if ($keyword !== '') {
        $stmt = $pdo->prepare("SELECT * FROM siswa WHERE nis LIKE :kw OR nama LIKE :kw OR jurusan LIKE :kw ORDER BY id DESC");
        $stmt->execute(['kw' => "%$keyword%"]);
    } else {
        $stmt = $pdo->query("SELECT * FROM siswa ORDER BY id DESC");
    }

    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['status' => 'success', 'data' => $data]);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Gagal memuat data: ' . $e->getMessage()]);
}
?>