CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Aktivitas(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    aktivitas VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO Aktivitas (aktivitas)
VALUES ("Sangat Ringan (Tidak banyak bergerak)"),
("Ringan (Melakukan aktivitas fisik ringan sepanjang hari)"),
("Sedang (Melakukan aktivitas fisik sedang sepanjang hari)"),
("Aktif (Melakukan aktifitis berat beberapa kali seminggu)"),
("Sangat Aktif (Melakukan pekerjaan fisik berat)");

CREATE TABLE Profile (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    tanggal_lahir DATE NOT NULL,
    usia INT(3) NOT NULL,
    tinggi INT(3) NOT NULL,
    berat INT(3) NOT NULL,
    jeniskelamin BOOLEAN NOT NULL,
    ibm VARCHAR(50) NOT NULL,
    aktivitas_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (aktivitas_id) REFERENCES Aktivitas(id)
); 

CREATE TABLE Tujuan_Diet(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    tujuan VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO Tujuan_Diet (tujuan)
VALUES ("Menurunkan Berat Badan"),
("Mempertahankan Berat Badan"),
("Menaikan Berat Badan");

CREATE TABLE Preferensi_diet (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    preferensi VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO Preferensi_diet (preferensi)
VALUES ("Tinggi Kalori"),
("Tinggi Protein"), ("Tinggi Lemak"),
("Tinggi Karbohidrat"), ("Rendah Kalori"),
("Rendah Protein"), ("Rendah Lemak"),
("Rendah Karbohidrat");

CREATE TABLE Preferensi_diet_detail (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    profile_id INT NOT NULL,
    preferensi_diet_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (profile_id) REFERENCES Profile(id),
    FOREIGN KEY (preferensi_diet_id) REFERENCES Preferensi_diet(id)
);

CREATE TABLE Bahan_makanan (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    bahan VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO Bahan_makanan (bahan) 
VALUES ("Daging Ayam"), ("Daging Sapi"),
("Daging Kambing"), ("Daging Bebek"),
("Ikan "), ("Udang"), ("Kepiting"),
("Lobster"), ("Cumi-cumi"), ("Tahu"),
("Tempe"), ("Kacang Kedelai"), ("Kacang Merah");

CREATE TABLE Bahan_makanan_detail (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    profile_id INT NOT NULL,
    bahan_makanan_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (profile_id) REFERENCES Profile(id),
    FOREIGN KEY (bahan_makanan_id) REFERENCES Bahan_makanan(id)
);

CREATE TABLE Level_memasak (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    level VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO Level_memasak (level)
VALUES ("Mudah"),
("Sedang"), ("Sulit");

CREATE TABLE Waktu_memasak (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    waktu VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO Waktu_memasak (waktu)
VALUES ("30 Menit"), ("45 Menit"),
("60 Menit"), ("90 Menit"), ("120 Menit");

CREATE TABLE Waktu_memasak_detail(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    profile_id INT NOT NULL,
    waktu_memasak_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (profile_id) REFERENCES Profile(id),
    FOREIGN KEY (waktu_memasak_id) REFERENCES Waktu_memasak(id)
);

CREATE TABLE Menu (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nama VARCHAR(100) NOT NULL,
    kalori INT(5) NOT NULL,
    detail TEXT NOT NULL,
    gambar VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);