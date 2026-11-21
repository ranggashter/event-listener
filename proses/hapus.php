<?php
header('Content-Type: application/json');
require '../koneksi.php';

$id = $_POST['id'] ?? '';

if ($id === '') {
    echo json_encode(['status' => 'error', 'message' => 'ID siswa tidak valid!']);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM siswa WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(['status' => 'success', 'message' => 'Data siswa berhasil dihapus!']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Gagal menghapus data: ' . $e->getMessage()]);
}
?>