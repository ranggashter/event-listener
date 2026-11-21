CREATE DATABASE IF NOT EXISTS db_siswa;
USE db_siswa;

CREATE TABLE siswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nis VARCHAR(20) NOT NULL UNIQUE,
    nama VARCHAR(100) NOT NULL,
    kelas VARCHAR(20) NOT NULL,
    jurusan VARCHAR(50) NOT NULL
);

INSERT INTO siswa (nis, nama, kelas, jurusan) VALUES 
('2026001', 'Ahmad Fauzi', 'XII', 'RPL'),
('2026002', 'Siti Aminah', 'XI', 'TKJ'),
('2026003', 'Budi Santoso', 'X', 'DKV');