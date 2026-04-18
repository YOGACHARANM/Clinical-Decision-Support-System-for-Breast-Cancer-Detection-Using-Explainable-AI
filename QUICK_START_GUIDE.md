# Quick Start Guide
## Breast Cancer CDSS Project Setup

---

## 📁 Project Folder Structure

```
breast-cancer-cdss/
├── frontend/                       # React Application
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── assets/
│   │       └── images/
│   ├── src/
│   │   ├── components/            # Reusable components
│   │   │   ├── common/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── Loading.jsx
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── SignupForm.jsx
│   │   │   ├── patient/
│   │   │   │   ├── PatientDashboard.jsx
│   │   │   │   ├── MedicalRecords.jsx
│   │   │   │   └── PredictionHistory.jsx
│   │   │   └── doctor/
│   │   │       ├── DoctorDashboard.jsx
│   │   │       ├── PatientList.jsx
│   │   │       ├── PredictionInterface.jsx
│   │   │       ├── XAIVisualizations.jsx
│   │   │       └── Analytics.jsx
│   │   ├── pages/                 # Page components
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── PatientDashboard.jsx
│   │   │   └── DoctorDashboard.jsx
│   │   ├── services/              # API services
│   │   │   ├── api.js             # Axios instance
│   │   │   ├── authService.js
│   │   │   ├── patientService.js
│   │   │   └── predictionService.js
│   │   ├── context/               # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/                 # Custom hooks
│   │   │   ├── useAuth.js
│   │   │   └── useApi.js
│   │   ├── utils/                 # Utility functions
│   │   │   ├── constants.js
│   │   │   └── validators.js
│   │   ├── styles/                # CSS files
│   │   │   ├── index.css
│   │   │   ├── variables.css      # CSS custom properties
│   │   │   └── components/
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── README.md
│
├── backend/                        # Spring Boot Application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/cdss/breastcancer/
│   │   │   │       ├── BreastCancerCdssApplication.java
│   │   │   │       ├── config/
│   │   │   │       │   ├── SecurityConfig.java
│   │   │   │       │   ├── CorsConfig.java
│   │   │   │       │   └── JwtConfig.java
│   │   │   │       ├── controller/
│   │   │   │       │   ├── AuthController.java
│   │   │   │       │   ├── UserController.java
│   │   │   │       │   ├── PatientController.java
│   │   │   │       │   └── PredictionController.java
│   │   │   │       ├── model/
│   │   │   │       │   ├── User.java
│   │   │   │       │   ├── Patient.java
│   │   │   │       │   ├── MedicalRecord.java
│   │   │   │       │   └── Prediction.java
│   │   │   │       ├── repository/
│   │   │   │       │   ├── UserRepository.java
│   │   │   │       │   ├── PatientRepository.java
│   │   │   │       │   ├── MedicalRecordRepository.java
│   │   │   │       │   └── PredictionRepository.java
│   │   │   │       ├── service/
│   │   │   │       │   ├── AuthService.java
│   │   │   │       │   ├── UserService.java
│   │   │   │       │   ├── PatientService.java
│   │   │   │       │   ├── PredictionService.java
│   │   │   │       │   └── MLServiceClient.java
│   │   │   │       ├── dto/
│   │   │   │       │   ├── LoginRequest.java
│   │   │   │       │   ├── SignupRequest.java
│   │   │   │       │   ├── JwtResponse.java
│   │   │   │       │   └── PredictionRequest.java
│   │   │   │       ├── security/
│   │   │   │       │   ├── JwtTokenProvider.java
│   │   │   │       │   ├── JwtAuthenticationFilter.java
│   │   │   │       │   └── UserDetailsServiceImpl.java
│   │   │   │       └── exception/
│   │   │   │           ├── GlobalExceptionHandler.java
│   │   │   │           └── CustomExceptions.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── db/migration/
│   │   │           └── V1__initial_schema.sql
│   │   └── test/
│   ├── pom.xml
│   └── README.md
│
├── ml-service/                     # Python ML Service
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                # Flask/FastAPI app
│   │   ├── model/
│   │   │   ├── __init__.py
│   │   │   ├── adaboost_model.py
│   │   │   └── model.pkl          # Trained model
│   │   ├── explainers/
│   │   │   ├── __init__.py
│   │   │   ├── shap_explainer.py
│   │   │   └── lime_explainer.py
│   │   ├── utils/
│   │   │   ├── __init__.py
│   │   │   └── preprocessor.py
│   │   └── routes/
│   │       ├── __init__.py
│   │       └── prediction.py
│   ├── notebooks/
│   │   └── model_training.ipynb   # Jupyter notebook for training
│   ├── data/
│   │   └── breast_cancer.csv      # Dataset
│   ├── tests/
│   ├── requirements.txt
│   ├── Dockerfile
│   └── README.md
│
├── database/
│   ├── schema.sql
│   ├── seed_data.sql
│   └── README.md
│
├── docs/
│   ├── API_Documentation.md
│   ├── User_Manual.md
│   └── Deployment_Guide.md
│
├── .gitignore
└── README.md
```

---

## 🚀 Setup Instructions

### **1. Frontend Setup (React)**

```bash
# Navigate to project root
cd breast-cancer-cdss

# Create React app
npx create-react-app frontend
cd frontend

# Install dependencies
npm install react-router-dom axios recharts react-hook-form yup

# Additional UI libraries
npm install @headlessui/react @heroicons/react

# For state management (optional)
npm install @reduxjs/toolkit react-redux

# Start development server
npm start
```

**Environment Variables (frontend/.env):**
```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_ML_SERVICE_URL=http://localhost:5000
```

---

### **2. Backend Setup (Spring Boot)**

**Using Spring Initializr (https://start.spring.io/):**
- **Project:** Maven
- **Language:** Java
- **Spring Boot:** 3.2.x
- **Java Version:** 17 or 21
- **Dependencies:**
  - Spring Web
  - Spring Security
  - Spring Data JPA
  - MySQL Driver
  - Lombok
  - Validation
  - Spring Boot DevTools

**Or via command line:**
```bash
# Using Spring CLI
spring init \
  --dependencies=web,security,data-jpa,mysql,lombok,validation \
  --type=maven-project \
  --java-version=17 \
  --group=com.cdss \
  --artifact=breastcancer \
  --name=BreastCancerCDSS \
  backend

cd backend

# Add JWT dependency to pom.xml manually
# <dependency>
#   <groupId>io.jsonwebtoken</groupId>
#   <artifactId>jjwt-api</artifactId>
#   <version>0.11.5</version>
# </dependency>
# <dependency>
#   <groupId>io.jsonwebtoken</groupId>
#   <artifactId>jjwt-impl</artifactId>
#   <version>0.11.5</version>
# </dependency>
# <dependency>
#   <groupId>io.jsonwebtoken</groupId>
#   <artifactId>jjwt-jackson</artifactId>
#   <version>0.11.5</version>
# </dependency>

# Run the application
./mvnw spring-boot:run
```

**Application Properties (backend/src/main/resources/application.properties):**
```properties
# Server Configuration
server.port=8080
spring.application.name=breast-cancer-cdss

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/breast_cancer_cdss
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
jwt.secret=your-256-bit-secret-key-here-make-it-long-and-secure
jwt.expiration=86400000

# ML Service Configuration
ml.service.url=http://localhost:5000

# CORS Configuration
cors.allowed-origins=http://localhost:3000

# Multipart file upload
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

# Logging
logging.level.com.cdss.breastcancer=DEBUG
```

---

### **3. ML Service Setup (Python)**

```bash
# Navigate to ml-service directory
cd ml-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install flask flask-cors scikit-learn pandas numpy shap lime matplotlib seaborn joblib

# Or using requirements.txt
pip install -r requirements.txt
```

**requirements.txt:**
```txt
Flask==3.0.0
flask-cors==4.0.0
scikit-learn==1.3.2
pandas==2.1.4
numpy==1.26.2
shap==0.43.0
lime==0.2.0.1
matplotlib==3.8.2
seaborn==0.13.0
joblib==1.3.2
gunicorn==21.2.0
python-dotenv==1.0.0
```

**Environment Variables (ml-service/.env):**
```env
FLASK_APP=app/main.py
FLASK_ENV=development
MODEL_PATH=app/model/model.pkl
SCALER_PATH=app/model/scaler.pkl
PORT=5000
```

**Run the service:**
```bash
python app/main.py
# or
flask run
```

---

### **4. Database Setup (MySQL)**

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE breast_cancer_cdss;

# Create user and grant privileges
CREATE USER 'cdss_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON breast_cancer_cdss.* TO 'cdss_user'@'localhost';
FLUSH PRIVILEGES;

# Exit MySQL
exit;

# Import schema (if you have a schema.sql file)
mysql -u root -p breast_cancer_cdss < database/schema.sql
```

---

## 🔧 Development Workflow

### **1. Start All Services**

**Terminal 1 - Frontend:**
```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

**Terminal 2 - Backend:**
```bash
cd backend
./mvnw spring-boot:run
# Runs on http://localhost:8080
```

**Terminal 3 - ML Service:**
```bash
cd ml-service
source venv/bin/activate  # or venv\Scripts\activate on Windows
python app/main.py
# Runs on http://localhost:5000
```

**Terminal 4 - MySQL:**
```bash
# Make sure MySQL service is running
# Windows: Start MySQL service from Services
# macOS: brew services start mysql
# Linux: sudo systemctl start mysql
```

### **2. Testing APIs**

**Using Postman or curl:**

```bash
# Health Check - ML Service
curl http://localhost:5000/health

# Health Check - Backend
curl http://localhost:8080/api/health

# Signup
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@example.com",
    "password": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe",
    "role": "DOCTOR",
    "phone": "+1234567890"
  }'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@example.com",
    "password": "SecurePass123!"
  }'

# Get current user (requires JWT token)
curl http://localhost:8080/api/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📦 Git Setup

```bash
# Initialize Git repository
git init

# Create .gitignore
cat > .gitignore << EOL
# Node modules
frontend/node_modules/
frontend/build/

# Python
ml-service/venv/
ml-service/__pycache__/
ml-service/*.pyc
ml-service/.env

# Java
backend/target/
backend/.mvn/
backend/mvnw
backend/mvnw.cmd

# IDE
.idea/
.vscode/
*.iml

# Environment variables
.env
.env.local

# Database
*.db
*.sqlite

# Logs
*.log

# OS
.DS_Store
Thumbs.db

# Model files (large files - use Git LFS)
ml-service/app/model/*.pkl
EOL

# Add all files
git add .

# Initial commit
git commit -m "Initial project setup"

# Add remote repository
git remote add origin https://github.com/yourusername/breast-cancer-cdss.git

# Push to GitHub
git push -u origin main
```

---

## 🧪 Testing Checklist

### **Frontend Testing**
- [ ] All pages load without errors
- [ ] Login/Signup forms validate correctly
- [ ] Protected routes redirect to login
- [ ] API calls work (check Network tab)
- [ ] Responsive design works on mobile
- [ ] Forms submit data correctly

### **Backend Testing**
- [ ] Application starts without errors
- [ ] Database connection successful
- [ ] All endpoints return correct status codes
- [ ] JWT authentication works
- [ ] Role-based authorization enforced
- [ ] Validation works on all endpoints

### **ML Service Testing**
- [ ] Service starts successfully
- [ ] Model loads correctly
- [ ] Prediction endpoint returns results
- [ ] SHAP values generated
- [ ] LIME explanations generated
- [ ] Response time < 2 seconds

### **Integration Testing**
- [ ] Frontend can authenticate with backend
- [ ] Backend can communicate with ML service
- [ ] Data flows correctly through all layers
- [ ] XAI visualizations render correctly

---

## 🐛 Common Issues & Solutions

### **Issue 1: CORS Error**
**Error:** "Access to fetch at 'http://localhost:8080' from origin 'http://localhost:3000' has been blocked by CORS policy"

**Solution:**
Add CORS configuration in Spring Boot (see SecurityConfig.java)

### **Issue 2: Database Connection Failed**
**Error:** "Communications link failure"

**Solution:**
- Check MySQL is running: `sudo systemctl status mysql` (Linux) or check Services (Windows)
- Verify credentials in application.properties
- Ensure database exists: `SHOW DATABASES;`

### **Issue 3: JWT Token Not Working**
**Error:** "Token expired" or "Invalid token"

**Solution:**
- Check system time is correct
- Verify JWT secret matches in application.properties
- Ensure token is sent in Authorization header: `Bearer {token}`

### **Issue 4: ML Model Not Loading**
**Error:** "Model file not found"

**Solution:**
- Ensure model.pkl exists in ml-service/app/model/
- Train the model first using the Jupyter notebook
- Check file permissions

### **Issue 5: Port Already in Use**
**Error:** "Port 3000/8080/5000 is already in use"

**Solution:**
```bash
# Find and kill process using the port
# Windows:
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:8080 | xargs kill -9
```

---

## 📚 Next Steps

1. **Complete Database Schema:** Implement all tables as per the project plan
2. **Develop Authentication:** Build JWT authentication system
3. **Train ML Model:** Use Wisconsin Breast Cancer dataset
4. **Build Frontend Components:** Start with Header, Footer, and authentication pages
5. **Integrate Services:** Connect frontend to backend, backend to ML service
6. **Implement XAI:** Add SHAP and LIME visualizations
7. **Testing:** Write unit tests and integration tests
8. **Deployment:** Deploy to production environment

---

## 🎓 Resources

**Official Documentation:**
- React: https://react.dev
- Spring Boot: https://spring.io/projects/spring-boot
- Flask: https://flask.palletsprojects.com
- MySQL: https://dev.mysql.com/doc

**Learning Platforms:**
- Frontend: https://www.youtube.com/watch?v=w7ejDZ8SWv8 (React Full Course)
- Spring Boot: https://www.baeldung.com/spring-boot
- ML with Python: https://scikit-learn.org/stable/tutorial/index.html

**Helpful Tools:**
- Postman: For API testing
- MySQL Workbench: Database management
- VS Code Extensions: ES7 React/Redux, Java Extension Pack, Python

---

**Good luck with your project! 🚀**

Remember: Start small, test often, and build incrementally. Focus on getting one feature working completely before moving to the next.
