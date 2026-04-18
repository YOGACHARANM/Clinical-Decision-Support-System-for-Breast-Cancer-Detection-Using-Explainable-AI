package com.cdss.breastcancer.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "medical_reports")
@Data
public class MedicalReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @Column(columnDefinition = "TEXT") // Store JSON string of feature values
    private String clinicalFeatures;

    @Column(nullable = false)
    private String predictionResult; // "Benign" or "Malignant"

    private Double confidenceScore;

    @Column(nullable = false)
    private String riskLevel; // "Low", "Moderate", "High"

    @Column(columnDefinition = "TEXT")
    private String doctorNotes;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
