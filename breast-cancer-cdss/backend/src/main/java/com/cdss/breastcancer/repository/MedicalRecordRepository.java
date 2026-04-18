package com.cdss.breastcancer.repository;

import com.cdss.breastcancer.model.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {
    List<MedicalRecord> findByPatient_PatientId(String patientId);
}
