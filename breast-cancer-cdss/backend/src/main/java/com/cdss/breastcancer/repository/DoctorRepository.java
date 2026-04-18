package com.cdss.breastcancer.repository;

import com.cdss.breastcancer.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, String> {
    Optional<Doctor> findByUser_UserId(Long userId);

    @Query("SELECT d.doctorId FROM Doctor d ORDER BY d.doctorId DESC LIMIT 1")
    String findLastDoctorId();
}
