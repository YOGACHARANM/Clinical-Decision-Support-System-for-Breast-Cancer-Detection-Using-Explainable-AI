package com.cdss.breastcancer.service;

import com.cdss.breastcancer.dto.*;
import com.cdss.breastcancer.model.*;
import com.cdss.breastcancer.repository.*;
import com.cdss.breastcancer.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtTokenProvider jwtUtils;

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateToken(authentication);

        // Get User details
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
        String role = user.getRole().name();
        String entityId = "";

        String fullName = "";
        String medicalLicense = null;
        String specialization = null;
        String joinedDate = user.getCreatedAt() != null ? user.getCreatedAt().toLocalDate().toString() : "N/A";

        // Include P-ID or D-ID & details
        if (user.getRole() == com.cdss.breastcancer.model.Role.PATIENT) {
            java.util.Optional<Patient> patientOpt = patientRepository.findByUser_UserId(user.getUserId());
            if (patientOpt.isPresent()) {
                entityId = patientOpt.get().getPatientId();
                fullName = patientOpt.get().getFullName();
            } else {
                entityId = "Unknown";
            }
        } else if (user.getRole() == com.cdss.breastcancer.model.Role.DOCTOR) {
            java.util.Optional<Doctor> doctorOpt = doctorRepository.findByUser_UserId(user.getUserId());
            if (doctorOpt.isPresent()) {
                Doctor d = doctorOpt.get();
                entityId = d.getDoctorId();
                fullName = d.getFullName();
                medicalLicense = d.getMedicalLicense();
                specialization = d.getSpecialization();
            } else {
                entityId = "Unknown";
            }
        }

        return new JwtResponse(jwt,
                user.getUserId(),
                user.getEmail(),
                role,
                entityId,
                fullName,
                medicalLicense,
                specialization,
                joinedDate);
    }

    @Transactional
    public void registerPatient(PatientSignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        // Create User account
        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setPasswordHash(encoder.encode(signUpRequest.getPassword()));
        user.setRole(com.cdss.breastcancer.model.Role.PATIENT);
        User savedUser = userRepository.save(user);

        // Generate Patient ID
        String lastId = patientRepository.findLastPatientId();
        String newId = generateNextId(lastId, "P-");

        // Create Patient profile
        Patient patient = new Patient();
        patient.setPatientId(newId);
        patient.setUser(savedUser);
        patient.setFullName(signUpRequest.getFullName());
        patient.setDateOfBirth(signUpRequest.getDateOfBirth());
        patient.setBloodGroup(signUpRequest.getBloodGroup());
        patient.setPhone(signUpRequest.getPhone());
        patient.setAddress(signUpRequest.getAddress());
        patient.setGender(signUpRequest.getGender());
        patient.setEmergencyContactName(signUpRequest.getEmergencyContactName());
        patient.setEmergencyContactPhone(signUpRequest.getEmergencyContactPhone());

        patientRepository.save(patient);
    }

    @Transactional
    public void registerDoctor(DoctorSignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        // Create User account
        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setPasswordHash(encoder.encode(signUpRequest.getPassword()));
        user.setRole(com.cdss.breastcancer.model.Role.DOCTOR);
        User savedUser = userRepository.save(user);

        // Generate Doctor ID
        String lastId = doctorRepository.findLastDoctorId();
        String newId = generateNextId(lastId, "D-");

        // Create Doctor profile
        Doctor doctor = new Doctor();
        doctor.setDoctorId(newId);
        doctor.setUser(savedUser);
        doctor.setFullName(signUpRequest.getFullName());
        doctor.setMedicalLicense(signUpRequest.getMedicalLicense());
        doctor.setSpecialization(signUpRequest.getSpecialization());
        doctor.setYearsExperience(signUpRequest.getYearsExperience());
        doctor.setHospitalAffiliation(signUpRequest.getHospitalAffiliation());
        doctor.setPhone(signUpRequest.getPhone());
        doctor.setIsVerified(false); // Default to unverified

        doctorRepository.save(doctor);
    }

    private String generateNextId(String lastId, String prefix) {
        if (lastId == null) {
            return prefix + "000001";
        }

        // Extract number P-000001 -> 1
        int number = Integer.parseInt(lastId.substring(2));
        int nextNumber = number + 1;

        return String.format("%s%06d", prefix, nextNumber);
    }
}
