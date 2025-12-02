@echo off
echo ===================================
echo BookSwap Hub - Database Setup
echo ===================================
echo.
echo This will create the database and user for BookSwap Hub.
echo You will be prompted for your MySQL root password.
echo.
pause
echo.
echo Running database setup...
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -uroot -p < setup-database.sql
echo.
if %ERRORLEVEL% EQU 0 (
    echo ===================================
    echo Database setup completed successfully!
    echo ===================================
    echo.
    echo You can now start the backend server.
) else (
    echo ===================================
    echo ERROR: Database setup failed!
    echo ===================================
    echo.
    echo Please check your MySQL root password and try again.
)
echo.
pause
