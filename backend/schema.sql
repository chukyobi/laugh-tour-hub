
-- Create database
CREATE DATABASE IF NOT EXISTS ticketing;
USE ticketing;

-- Create shows table
CREATE TABLE IF NOT EXISTS shows (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    time VARCHAR(10) NOT NULL,
    city VARCHAR(100) NOT NULL,
    venue VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create ticket_types table
CREATE TABLE IF NOT EXISTS ticket_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    available BOOLEAN NOT NULL DEFAULT TRUE,
    code VARCHAR(10) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create seats table
CREATE TABLE IF NOT EXISTS seats (
    id VARCHAR(20) PRIMARY KEY,
    show_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'available',
    type VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (show_id) REFERENCES shows(id) ON DELETE CASCADE
);

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    show_id INT NOT NULL,
    customer_id INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (show_id) REFERENCES shows(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    ticket_type_id INT NOT NULL,
    seat_id VARCHAR(20),
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (ticket_type_id) REFERENCES ticket_types(id) ON DELETE CASCADE,
    FOREIGN KEY (seat_id) REFERENCES seats(id) ON DELETE SET NULL
);

-- Create sponsors table
CREATE TABLE IF NOT EXISTS sponsors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    logo VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data

-- Sample shows
INSERT INTO shows (date, time, city, venue, address, status) VALUES
('2023-06-12', '8:00 PM', 'New York, NY', 'Comedy Cellar', '117 MacDougal St, New York, NY 10012', 'Sold Out'),
('2023-06-18', '7:30 PM', 'Boston, MA', 'Wilbur Theatre', '246 Tremont St, Boston, MA 02116', 'Available'),
('2023-06-24', '8:30 PM', 'Chicago, IL', 'The Laugh Factory', '3175 N Broadway, Chicago, IL 60657', 'Available'),
('2023-07-02', '7:00 PM', 'Austin, TX', 'Cap City Comedy', '8120 Research Blvd #100, Austin, TX 78758', 'Few Left'),
('2023-07-08', '9:00 PM', 'Los Angeles, CA', 'The Comedy Store', '8433 Sunset Blvd, Los Angeles, CA 90069', 'Available'),
('2023-07-15', '8:00 PM', 'Seattle, WA', 'The Paramount Theatre', '911 Pine St, Seattle, WA 98101', 'Available');

-- Sample ticket types
INSERT INTO ticket_types (name, price, available, code, description) VALUES
('Regular Admission', 45.00, TRUE, 'REG', NULL),
('VIP Package', 95.00, TRUE, 'VIP', 'Includes meet & greet and signed merchandise'),
('Table for 5', 225.00, TRUE, 'T5', 'Reserved table for 5 people (includes 5 tickets)'),
('Table for 10', 400.00, TRUE, 'T10', 'Reserved table for 10 people (includes 10 tickets)');

-- Sample sponsors
INSERT INTO sponsors (name, logo) VALUES
('Acme Inc', 'https://placehold.co/200x100/242424/white?text=ACME'),
('TechCorp', 'https://placehold.co/200x100/242424/white?text=TECHCORP'),
('Global Media', 'https://placehold.co/200x100/242424/white?text=GLOBAL'),
('Sound Systems', 'https://placehold.co/200x100/242424/white?text=SOUND'),
('Stage Pro', 'https://placehold.co/200x100/242424/white?text=STAGE'),
('Beverage Co', 'https://placehold.co/200x100/242424/white?text=BEVERAGE');

-- Sample seats (for show ID 2)
-- VIP seats
INSERT INTO seats (id, show_id, name, status, type) VALUES
('VP-1', 2, 'Seat 1', 'available', 'VIP'),
('VP-2', 2, 'Seat 2', 'available', 'VIP'),
('VP-3', 2, 'Seat 3', 'taken', 'VIP'),
('VP-4', 2, 'Seat 4', 'available', 'VIP'),
('VP-5', 2, 'Seat 5', 'available', 'VIP'),
('VP-6', 2, 'Seat 6', 'available', 'VIP'),
('VP-7', 2, 'Seat 7', 'taken', 'VIP'),
('VP-8', 2, 'Seat 8', 'available', 'VIP');

-- Regular seats
INSERT INTO seats (id, show_id, name, status, type) VALUES
('REG-1', 2, 'Seat 1', 'available', 'REG'),
('REG-2', 2, 'Seat 2', 'available', 'REG'),
('REG-3', 2, 'Seat 3', 'taken', 'REG'),
('REG-4', 2, 'Seat 4', 'available', 'REG'),
('REG-5', 2, 'Seat 5', 'available', 'REG'),
('REG-6', 2, 'Seat 6', 'available', 'REG'),
('REG-7', 2, 'Seat 7', 'taken', 'REG'),
('REG-8', 2, 'Seat 8', 'available', 'REG');

-- Tables for 5
INSERT INTO seats (id, show_id, name, status, type) VALUES
('T5-A', 2, 'Table A', 'available', 'T5'),
('T5-B', 2, 'Table B', 'available', 'T5'),
('T5-C', 2, 'Table C', 'taken', 'T5'),
('T5-D', 2, 'Table D', 'available', 'T5');

-- Tables for 10
INSERT INTO seats (id, show_id, name, status, type) VALUES
('T10-A', 2, 'Table A', 'available', 'T10'),
('T10-B', 2, 'Table B', 'available', 'T10'),
('T10-C', 2, 'Table C', 'taken', 'T10');
