package com.cdss.breastcancer.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "predictions")
public class Prediction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long predictionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    // Clinical Features (Top 10)
    private BigDecimal concavePointsWorst;
    private BigDecimal textureMean;
    private BigDecimal compactnessSe;
    private BigDecimal perimeterWorst;
    private BigDecimal areaSe;
    private BigDecimal textureWorst;
    private BigDecimal symmetryWorst;
    private BigDecimal compactnessMean;
    private BigDecimal concavePointsMean;
    private BigDecimal smoothnessMean;

    @Enumerated(EnumType.STRING)
    private PredictionResult predictionResult;

    private BigDecimal confidenceScore;

    @Column(columnDefinition = "JSON")
    private String shapValues;

    @Column(columnDefinition = "JSON")
    private String limeExplanation;

    @Column(columnDefinition = "JSON")
    private String featureImportance;

    private String modelVersion;
    private LocalDateTime predictionDate;

    @Column(columnDefinition = "TEXT")
    private String doctorNotes;

    @PrePersist
    protected void onCreate() {
        predictionDate = LocalDateTime.now();
    }
}

enum PredictionResult {
    BENIGN, MALIGNANT
}
