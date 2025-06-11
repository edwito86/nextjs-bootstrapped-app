-- Create database if not exists
CREATE DATABASE IF NOT EXISTS empresa_sac;
USE empresa_sac;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    worker_key VARCHAR(50) UNIQUE NOT NULL,
    fingerprint_data TEXT,
    roles JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    stock INT NOT NULL DEFAULT 0,
    cost DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Stock movements table
CREATE TABLE IF NOT EXISTS stock_movements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_cost DECIMAL(10,2) NOT NULL,
    movement_type ENUM('IN', 'OUT') NOT NULL,
    reference_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Product assignments table
CREATE TABLE IF NOT EXISTS product_assignments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_cost DECIMAL(10,2) NOT NULL,
    cost_center VARCHAR(100),
    receipt_code VARCHAR(50) UNIQUE NOT NULL,
    signature_image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert sample admin user
INSERT INTO users (name, worker_key, roles) VALUES 
('Admin', 'ADMIN001', '["admin"]');

-- Insert sample warehouse user
INSERT INTO users (name, worker_key, roles) VALUES 
('Almacenero', 'ALM001', '["warehouse"]');

-- Insert sample worker
INSERT INTO users (name, worker_key, roles) VALUES 
('Trabajador', 'TRB001', '["worker"]');
