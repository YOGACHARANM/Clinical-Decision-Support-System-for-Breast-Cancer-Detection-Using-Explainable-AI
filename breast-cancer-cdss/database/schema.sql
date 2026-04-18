-- Database Schema for Breast Cancer CDSS
CREATE DATABASE IF NOT EXISTS breast_cancer_cdss;
USE breast_cancer_cdss;

DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS predictions;
DROP TABLE IF EXISTS medical_records;
DROP TABLE IF EXISTS doctors;
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS users;

-- Users Table
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('PATIENT', 'DOCTOR') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Patients Table
CREATE TABLE patients (
    patient_id VARCHAR(20) PRIMARY KEY, -- P-000001
    user_id BIGINT UNIQUE NOT NULL,
    full_name VARCHAR(200) NOT NULL,
    date_of_birth DATE NOT NULL,
    -- age INT GENERATED ALWAYS AS (YEAR(CURDATE()) - YEAR(date_of_birth)) STORED,
    gender VARCHAR(20) NOT NULL,
    blood_group VARCHAR(5),
    phone VARCHAR(20),
    address TEXT,
    emergency_contact_name VARCHAR(200),
    emergency_contact_phone VARCHAR(20),
    medical_history TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Doctors Table
CREATE TABLE doctors (
    doctor_id VARCHAR(20) PRIMARY KEY, -- D-000001
    user_id BIGINT UNIQUE NOT NULL,
    full_name VARCHAR(200) NOT NULL,
    medical_license VARCHAR(100) NOT NULL,
    specialization VARCHAR(100),
    years_experience INT,
    hospital_affiliation VARCHAR(200),
    phone VARCHAR(20),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Medical Records Table
CREATE TABLE medical_records (
    record_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    patient_id VARCHAR(20) NOT NULL,
    recorded_by VARCHAR(20) NOT NULL, -- doctor_id
    record_date DATE NOT NULL,
    diagnosis TEXT,
    treatment TEXT,
    notes TEXT,
    attachments JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (recorded_by) REFERENCES doctors(doctor_id),
    INDEX idx_patient_id (patient_id)
);

-- Predictions Table
CREATE TABLE predictions (
    prediction_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    patient_id VARCHAR(20) NOT NULL,
    doctor_id VARCHAR(20) NOT NULL,
    
    -- Clinical Features (TOP 10)
    concave_points_worst DECIMAL(10,4),
    texture_mean DECIMAL(10,4),
    compactness_se DECIMAL(10,4),
    perimeter_worst DECIMAL(10,4),
    area_se DECIMAL(10,4),
    texture_worst DECIMAL(10,4),
    symmetry_worst DECIMAL(10,4),
    compactness_mean DECIMAL(10,4),
    concave_points_mean DECIMAL(10,4),
    smoothness_mean DECIMAL(10,4),
    
    -- Results
    prediction_result ENUM('BENIGN', 'MALIGNANT') NOT NULL,
    confidence_score DECIMAL(5,4) NOT NULL,
    
    -- XAI Outputs (Stored as JSON)
    shap_values JSON,
    lime_explanation JSON,
    feature_importance JSON,
    
    -- Metadata
    model_version VARCHAR(50) DEFAULT 'AdaBoost-v1.0',
    prediction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    doctor_notes TEXT,
    
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id),
    INDEX idx_patient_id (patient_id),
    INDEX idx_date (prediction_date)
);

-- Audit Logs
CREATE TABLE audit_logs (
    log_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id VARCHAR(50),
    ip_address VARCHAR(45),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);
