# Database Setup Instructions

## Quick Setup (Recommended)

Open a new command prompt or terminal window and run:

```bash
cd "C:\Users\Sadguru\OneDrive\Documents\MINI PROJECT 25\BOOKSWAP_HUB\backend"
mysql -uroot -p < setup-database.sql
```

When prompted, enter your MySQL root password.

## What this does:
1. Creates a database named `bookswap_db`
2. Creates a dedicated user `bookswap_user` with password `bookswap_password_2024`
3. Grants all necessary privileges

## After running the setup:
The application will automatically connect using the new database user credentials.

## Alternative: Manual Setup

If you prefer, you can also run these commands in MySQL Workbench or any MySQL client:

```sql
CREATE DATABASE IF NOT EXISTS bookswap_db;
CREATE USER IF NOT EXISTS 'bookswap_user'@'localhost' IDENTIFIED BY 'bookswap_password_2024';
GRANT ALL PRIVILEGES ON bookswap_db.* TO 'bookswap_user'@'localhost';
FLUSH PRIVILEGES;
```

## Troubleshooting

If you don't remember your MySQL root password:
1. You can reset it using MySQL documentation
2. Or you can modify the connection settings in the `.env` file to use existing credentials
