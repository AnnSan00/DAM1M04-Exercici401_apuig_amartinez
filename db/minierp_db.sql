-- ==========================================
-- MINI ERP - BASE DE DATOS COMPLETA
-- DAM1 - Exercici 401
-- ==========================================

-- Eliminar si existe
DROP DATABASE IF EXISTS minierp;

-- Crear base de datos
CREATE DATABASE minierp;
USE minierp;


-- ==========================================
-- TABLA PRODUCTOS
-- ==========================================

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ==========================================
-- TABLA CLIENTES
-- ==========================================

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ==========================================
-- TABLA VENTAS
-- ==========================================

CREATE TABLE sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    sale_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);


-- ==========================================
-- TABLA DETALLE DE VENTAS
-- ==========================================

CREATE TABLE sale_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sale_id INT,
    product_id INT,
    qty INT,
    unit_price DECIMAL(10,2),
    line_total DECIMAL(10,2),

    FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);


-- ==========================================
-- DATOS DE PRUEBA - PRODUCTOS (30)
-- ==========================================

INSERT INTO products (name, category, price, stock, active) VALUES
('Patates', 'Alimentació', 1.50, 50, 1),
('Tomàquets', 'Alimentació', 2.20, 30, 1),
('Llet', 'Làctics', 0.95, 10, 1),
('Formatge', 'Làctics', 3.50, 5, 1),
('Pasta', 'Alimentació', 1.20, 100, 1),
('Arròs', 'Alimentació', 1.10, 80, 1),
('Oli d’oliva', 'Alimentació', 6.50, 20, 1),
('Pa', 'Forn', 1.00, 15, 1),
('Croissant', 'Forn', 1.30, 8, 1),
('Cafè', 'Begudes', 4.00, 12, 1),

('Tè', 'Begudes', 2.50, 25, 1),
('Sucre', 'Alimentació', 1.00, 40, 1),
('Sal', 'Alimentació', 0.80, 60, 1),
('Cervesa', 'Begudes', 1.50, 70, 1),
('Aigua', 'Begudes', 0.60, 200, 1),
('Xocolata', 'Dolços', 2.00, 35, 1),
('Galetes', 'Dolços', 1.80, 45, 1),
('Iogurt', 'Làctics', 0.70, 25, 1),
('Mantega', 'Làctics', 2.30, 10, 1),
('Ous', 'Alimentació', 2.50, 30, 1),

('Pollastre', 'Carn', 5.50, 20, 1),
('Vedella', 'Carn', 7.00, 15, 1),
('Salmó', 'Peix', 9.00, 10, 1),
('Tonyina', 'Peix', 3.20, 40, 1),
('Poma', 'Fruita', 1.90, 60, 1),
('Plàtan', 'Fruita', 1.30, 70, 1),
('Taronja', 'Fruita', 1.50, 80, 1),
('Kiwi', 'Fruita', 2.20, 25, 1),
('Pinya', 'Fruita', 3.00, 10, 1),
('Maduixa', 'Fruita', 2.80, 15, 1);


-- ==========================================
-- DATOS DE PRUEBA - CLIENTES (25)
-- ==========================================

INSERT INTO customers (name, email, phone) VALUES
('Joan Pérez', 'joan@test.com', '600111111'),
('Maria López', 'maria@test.com', '600222222'),
('Carlos Ruiz', 'carlos@test.com', '600333333'),
('Anna Torres', 'anna@test.com', '600444444'),
('David García', 'david@test.com', '600555555'),

('Laura Sánchez', 'laura@test.com', '600666666'),
('Pedro Martín', 'pedro@test.com', '600777777'),
('Sofía Romero', 'sofia@test.com', '600888888'),
('Miguel Díaz', 'miguel@test.com', '600999999'),
('Elena Navarro', 'elena@test.com', '611000000'),

('Luis Ortega', 'luis@test.com', '611111111'),
('Carmen Vega', 'carmen@test.com', '611222222'),
('Pablo Gil', 'pablo@test.com', '611333333'),
('Lucía León', 'lucia@test.com', '611444444'),
('Raúl Castro', 'raul@test.com', '611555555'),

('Paula Molina', 'paula@test.com', '611666666'),
('Jorge Herrera', 'jorge@test.com', '611777777'),
('Irene Peña', 'irene@test.com', '611888888'),
('Adrián Cruz', 'adrian@test.com', '611999999'),
('Clara Flores', 'clara@test.com', '622000000'),

('Hugo Ramos', 'hugo@test.com', '622111111'),
('Sara Ortiz', 'sara@test.com', '622222222'),
('Álvaro Núñez', 'alvaro@test.com', '622333333'),
('Noa Iglesias', 'noa@test.com', '622444444'),
('Daniel Soto', 'daniel@test.com', '622555555');


-- ==========================================
-- DATOS DE PRUEBA - VENTAS (simples)
-- ==========================================

INSERT INTO sales (customer_id, total) VALUES
(1, 15.50),
(2, 22.30),
(3, 9.80),
(4, 35.00),
(5, 12.60),
(6, 45.20),
(7, 18.75),
(8, 27.40),
(9, 6.90),
(10, 55.00);


-- ==========================================
-- DATOS DE PRUEBA - DETALLE VENTAS
-- ==========================================

INSERT INTO sale_items (sale_id, product_id, qty, unit_price, line_total) VALUES
(1, 1, 5, 1.50, 7.50),
(1, 3, 2, 0.95, 1.90),
(2, 2, 3, 2.20, 6.60),
(2, 10, 2, 4.00, 8.00),
(3, 5, 4, 1.20, 4.80),
(4, 7, 2, 6.50, 13.00),
(5, 8, 5, 1.00, 5.00),
(6, 14, 10, 1.50, 15.00),
(7, 16, 3, 2.00, 6.00),
(8, 20, 2, 2.50, 5.00);