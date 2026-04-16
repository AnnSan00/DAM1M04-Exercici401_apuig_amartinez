CREATE DATABASE minierp_db;
USE minierp_db;

-- Tabla de productos
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de clientes
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de ventas
CREATE TABLE sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(50),
    total DECIMAL(10, 2) DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Detalle de cada venta (líneas de factura)
CREATE TABLE sale_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sale_id INT,
    product_id INT,
    qty INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    line_total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Ejemplo para productos (repite hasta tener 25)
INSERT INTO products (name, category, price, stock) VALUES 
('Teclado Mecánico', 'Periféricos', 85.50, 15),
('Ratón Gaming', 'Periféricos', 45.00, 3), -- Saldrá en rojo (stock bajo)
('Monitor 24"', 'Pantallas', 150.00, 20),
-- ... añade 22 más
('Alfombrilla XL', 'Accesorios', 15.00, 0); -- Saldrá en rojo (crítico)

-- Ejemplo para clientes (repite hasta tener 25)
INSERT INTO customers (name, email, phone) VALUES 
('Joan Garcia', 'joan@email.com', '600123456'),
('Maria Lopez', 'maria@email.com', '611987654');