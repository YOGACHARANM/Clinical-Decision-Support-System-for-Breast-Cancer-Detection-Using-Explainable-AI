package com.cdss.breastcancer.controller;

import com.cdss.breastcancer.dto.PatientSummaryDTO;
import com.cdss.breastcancer.model.Patient;
import com.cdss.breastcancer.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    PatientRepository patientRepository;

    @GetMapping
    public List<PatientSummaryDTO> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(patient -> new PatientSummaryDTO(
                        patient.getPatientId(),
                        patient.getFullName(),
                        patient.getGender(),
                        patient.getDateOfBirth()))
                .collect(Collectors.toList());
    }
}
