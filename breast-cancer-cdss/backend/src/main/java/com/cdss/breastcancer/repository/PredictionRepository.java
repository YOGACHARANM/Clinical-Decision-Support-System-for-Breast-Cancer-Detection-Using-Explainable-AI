package com.cdss.breastcancer.repository;

import com.cdss.breastcancer.model.Prediction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PredictionRepository extends JpaRepository<Prediction, Long> {
    List<Prediction> findByPatient_PatientId(String patientId);

    List<Prediction> findByDoctor_DoctorId(String doctorId);
}
