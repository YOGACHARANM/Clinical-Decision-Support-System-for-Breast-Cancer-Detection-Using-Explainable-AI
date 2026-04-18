package com.cdss.breastcancer.controller;

import com.cdss.breastcancer.model.Doctor;
import com.cdss.breastcancer.model.MedicalReport;
import com.cdss.breastcancer.model.Patient;
import com.cdss.breastcancer.repository.DoctorRepository;
import com.cdss.breastcancer.repository.MedicalReportRepository;
import com.cdss.breastcancer.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/reports")
public class MedicalReportController {

    @Autowired
    MedicalReportRepository reportRepository;

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    DoctorRepository doctorRepository;

    @PostMapping
    public ResponseEntity<?> createReport(@RequestBody Map<String, Object> payload) {
        String patientId = (String) payload.get("patientId");
        String doctorId = (String) payload.get("doctorId");

        Optional<Patient> patientOpt = patientRepository.findById(patientId);
        Optional<Doctor> doctorOpt = doctorRepository.findById(doctorId);

        if (patientOpt.isEmpty() || doctorOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid Patient or Doctor ID");
        }

        MedicalReport report = new MedicalReport();
        report.setPatient(patientOpt.get());
        report.setDoctor(doctorOpt.get());
        report.setClinicalFeatures((String) payload.get("clinicalFeatures")); // Assuming JSON string
        report.setPredictionResult((String) payload.get("predictionResult"));
        report.setConfidenceScore(Double.valueOf(payload.get("confidenceScore").toString()));
        report.setRiskLevel((String) payload.get("riskLevel"));
        report.setDoctorNotes((String) payload.get("doctorNotes"));

        reportRepository.save(report);

        return ResponseEntity.ok("Report saved successfully");
    }

    @GetMapping("/patient/{patientId}")
    public List<MedicalReport> getPatientReports(@PathVariable String patientId) {
        return reportRepository.findByPatient_PatientIdOrderByCreatedAtDesc(patientId);
    }
}
