@echo off
echo Starting Breast Cancer CDSS System...

:: 1. Start Backend (Spring Boot)
echo Starting Backend Server...
start "Backend Service" cmd /k "cd backend && mvnw spring-boot:run"

:: 2. Start ML Service (Flask)
echo Starting ML Service...
start "ML Service" cmd /k "cd ml-service && python app/main.py"

:: 3. Start Frontend (React/Vite)
echo Starting Frontend Client...
start "Frontend Client" cmd /k "cd frontend && npm run dev"

echo All services are starting in separate windows.
echo - Backend: http://localhost:8080
echo - ML Service: http://localhost:5000
echo - Frontend: http://localhost:5173 (or similar)
pause
