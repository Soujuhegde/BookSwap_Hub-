-- BookSwap Hub Database Setup Script
-- Run this script as MySQL root user

-- Create database
CREATE DATABASE IF NOT EXISTS bookswap_db;

-- Create dedicated user for the application
CREATE USER IF NOT EXISTS 'bookswap_user'@'localhost' IDENTIFIED BY 'bookswap_password_2024';

-- Grant all privileges on the bookswap_db database to the user
GRANT ALL PRIVILEGES ON bookswap_db.* TO 'bookswap_user'@'localhost';

-- Flush privileges to ensure the changes take effect
FLUSH PRIVILEGES;

-- Verify the setup
USE bookswap_db;
SELECT 'Database setup completed successfully!' AS Status;
