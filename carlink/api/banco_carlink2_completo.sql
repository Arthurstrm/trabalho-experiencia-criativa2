DROP DATABASE IF EXISTS carlink;
CREATE DATABASE carlink;
USE carlink;

CREATE TABLE Marca (
    id_marca INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50)
);

CREATE TABLE Modelo (
    id_modelo INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    fk_id_marca INT,
    FOREIGN KEY (fk_id_marca) REFERENCES Marca(id_marca)
);

CREATE TABLE Cargo (
    id_cargo INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    acesso INT
);

CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    genero VARCHAR(50),
    dataNascimento DATE,
    cpf VARCHAR(14) UNIQUE,
    email VARCHAR(100),  
    telefone VARCHAR(20),
    senha VARCHAR(255),
    imagemPerfil LONGBLOB
);

CREATE TABLE Funcionario (
    id_funcionario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    genero VARCHAR(50),
    cpf VARCHAR(14) UNIQUE,
    dataNascimento DATE,
    telefone VARCHAR(20),
    email VARCHAR(100),
    cargo INT,
    FOREIGN KEY (cargo) REFERENCES Cargo(id_cargo)
);

CREATE TABLE Carro (
    id_carro INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_modelo INT,
    ano DATE,
    placa VARCHAR(8),
    cor VARCHAR(50),
    renavam VARCHAR(11),
    chassi VARCHAR(17),
    motor VARCHAR(50),
    potencia VARCHAR(10),
    preco DECIMAL(10,2),
    imagem VARCHAR(500),
    descricao VARCHAR(100),
    fk_id_usuario INT,
    FOREIGN KEY (fk_id_modelo) REFERENCES Modelo(id_modelo),
    FOREIGN KEY (fk_id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE VENDA (
    id_venda INT AUTO_INCREMENT PRIMARY KEY,
    horario TIME,
    total DECIMAL(10,2),
    fk_id_carro INT,
    fk_id_usuario INT,
    fk_id_compra INT,
    FOREIGN KEY (fk_id_carro) REFERENCES Carro(id_carro),
    FOREIGN KEY (fk_id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE COMPRA (
    id_compra INT AUTO_INCREMENT PRIMARY KEY,
    horario TIME,
    fk_id_carro INT,
    fk_id_usuario INT,
    fk_id_venda INT,
    FOREIGN KEY (fk_id_carro) REFERENCES Carro(id_carro),
    FOREIGN KEY (fk_id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (fk_id_venda) REFERENCES VENDA(id_venda)
);

CREATE TABLE ATENDE (
    id_atendimento INT AUTO_INCREMENT PRIMARY KEY,
    FK_Funcionario_id INT,
    FK_Usuario_id_usuario INT,
    FOREIGN KEY (FK_Funcionario_id) REFERENCES Funcionario(id_funcionario) ON DELETE SET NULL,
    FOREIGN KEY (FK_Usuario_id_usuario) REFERENCES Usuario(id_usuario) ON DELETE SET NULL
);

INSERT INTO Marca (nome) VALUES
('Acura'),
('Alfa Romeo'),
('Audi'),
('BMW'),
('Buick'),
('BYD'),
('Cadillac'),
('Chevrolet'),
('Chrysler'),
('Citroën'),
('Dodge'),
('Fiat'),
('Ford'),
('GMC'),
('Honda'),
('Hyundai'),
('Infiniti'),
('Jaguar'),
('Jeep'),
('Kia'),
('Land Rover'),
('Lexus'),
('Mazda'),
('Mercedes-Benz'),
('Mini'),
('Mitsubishi'),
('Nissan'),
('Peugeot'),
('Porsche'),
('Ram'),
('Renault'),
('Subaru'),
('Suzuki'),
('Tesla'),
('Toyota'),
('Volkswagen'),
('Volvo');

INSERT INTO Modelo (nome, fk_id_marca) VALUES
-- Acura (id_marca: 1)
('MDX', 1),
('RDX', 1),
('TLX', 1),

-- Alfa Romeo (id_marca: 2)
('Giulia', 2),
('Stelvio', 2),

-- Audi (id_marca: 3)
('A3', 3),
('A4', 3),
('Q5', 3),

-- BMW (id_marca: 4)
('Série 3', 4),
('X5', 4),
('X3', 4),

-- Buick (id_marca: 5)
('Encore', 5),
('Enclave', 5),

-- BYD (id_marca: 6)
('Han', 6),
('Dolphin', 6),
('Song Plus', 6),

-- Cadillac (id_marca: 7)
('Escalade', 7),
('XT5', 7),

-- Chevrolet (id_marca: 8)
('Onix', 8),
('Cruze', 8),
('S10', 8),

-- Chrysler (id_marca: 9)
('300', 9),
('Pacifica', 9),

-- Citroën (id_marca: 10)
('C4 Cactus', 10),
('C3', 10),

-- Dodge (id_marca: 11)
('Charger', 11),
('Durango', 11),

-- Fiat (id_marca: 12)
('Mobi', 12),
('Argo', 12),
('Toro', 12),

-- Ford (id_marca: 13)
('Fiesta', 13),
('Ranger', 13),
('Mustang', 13),

-- GMC (id_marca: 14)
('Sierra', 14),
('Yukon', 14),

-- Honda (id_marca: 15)
('Civic', 15),
('HR-V', 15),
('CR-V', 15),

-- Hyundai (id_marca: 16)
('HB20', 16),
('Creta', 16),
('Tucson', 16),

-- Infiniti (id_marca: 17)
('Q50', 17),
('QX60', 17),

-- Jaguar (id_marca: 18)
('F-Pace', 18),
('XE', 18),

-- Jeep (id_marca: 19)
('Renegade', 19),
('Compass', 19),
('Wrangler', 19),

-- Kia (id_marca: 20)
('Sportage', 20),
('Seltos', 20),
('Carnival', 20),

-- Land Rover (id_marca: 21)
('Range Rover Evoque', 21),
('Discovery Sport', 21),

-- Lexus (id_marca: 22)
('RX', 22),
('ES', 22),

-- Mazda (id_marca: 23)
('CX-5', 23),
('3', 23),

-- Mercedes-Benz (id_marca: 24)
('Classe C', 24),
('GLC', 24),

-- Mini (id_marca: 25)
('Cooper', 25),
('Countryman', 25),

-- Mitsubishi (id_marca: 26)
('Outlander', 26),
('L200', 26),

-- Nissan (id_marca: 27)
('Kicks', 27),
('Sentra', 27),

-- Peugeot (id_marca: 28)
('208', 28),
('2008', 28),

-- Porsche (id_marca: 29)
('Cayenne', 29),
('Macan', 29),

-- Ram (id_marca: 30)
('1500', 30),
('2500', 30),

-- Renault (id_marca: 31)
('Kwid', 31),
('Duster', 31),
('Sandero', 31),

-- Subaru (id_marca: 32)
('Forester', 32),
('Outback', 32),

-- Suzuki (id_marca: 33)
('Jimny', 33),
('Vitara', 33),

-- Tesla (id_marca: 34)
('Model 3', 34),
('Model Y', 34),

-- Toyota (id_marca: 35)
('Corolla', 35),
('Hilux', 35),
('RAV4', 35),

-- Volkswagen (id_marca: 36)
('Gol', 36),
('T-Cross', 36),
('Saveiro', 36),

-- Volvo (id_marca: 37)
('XC60', 37),
('XC90', 37);

INSERT INTO Cargo (nome, acesso) VALUES
('admin', 1),
('gerente', 2),
('atendente', 3);

INSERT INTO Usuario (nome, genero, dataNascimento, cpf, email, telefone, senha) VALUES
('Carlink', 'Masculino', '1990-01-01', '12345678901', 'carlink@carlink.com', '11987654321', '$2b$10$fTKCqCYvJr9Ad2VAHvlw8OPo2dsSfAbaiAOxoNmWmpIk1JVQvAzBK');

