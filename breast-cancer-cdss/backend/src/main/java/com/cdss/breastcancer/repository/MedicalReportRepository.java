package com.cdss.breastcancer.repository;

import com.cdss.breastcancer.model.MedicalReport;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MedicalReportRepository extends JpaRepository<MedicalReport, Long> {
    List<MedicalReport> findByPatient_PatientIdOrderByCreatedAtDesc(String patientId);
}
