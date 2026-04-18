package com.cdss.breastcancer.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "doctors")
public class Doctor {
    @Id
    private String doctorId; // D-000001

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String medicalLicense;

    private String specialization;
    private Integer yearsExperience;
    private String hospitalAffiliation;
    private String phone;

    private Boolean isVerified;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
}
