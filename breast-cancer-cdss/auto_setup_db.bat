@echo off
echo Running Database Setup...
mysql -u root -pPani@284 < database/schema.sql
if %errorlevel% neq 0 (
    echo Error executing SQL script. Please check your credentials.
    pause
    exit /b %errorlevel%
)
echo Database setup completed successfully.
pause
