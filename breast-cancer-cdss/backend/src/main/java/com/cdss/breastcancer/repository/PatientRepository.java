package com.cdss.breastcancer.repository;

import com.cdss.breastcancer.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, String> {
    Optional<Patient> findByUser_UserId(Long userId);

    @Query("SELECT p.patientId FROM Patient p ORDER BY p.patientId DESC LIMIT 1")
    String findLastPatientId();
}
