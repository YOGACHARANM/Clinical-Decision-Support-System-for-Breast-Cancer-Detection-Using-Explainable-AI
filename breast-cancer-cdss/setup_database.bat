@echo off
echo Setting up Breast Cancer CDSS Database...
echo.
echo Please enter your MySQL root password when prompted:
mysql -u root -p < database/schema.sql
echo.
if %errorlevel% equ 0 (
    echo Database setup completed successfully!
) else (
    echo Error setting up database. Please check your password and try again.
)
pause
