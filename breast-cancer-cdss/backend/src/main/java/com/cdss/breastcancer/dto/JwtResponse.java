package com.cdss.breastcancer.dto;

import lombok.Data;

@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String email;
    private String role;
    private String entityId;
    private String fullName;
    private String medicalLicense;
    private String specialization;
    private String joinedDate;

    public JwtResponse(String accessToken, Long id, String email, String role, String entityId,
            String fullName, String medicalLicense, String specialization, String joinedDate) {
        this.token = accessToken;
        this.id = id;
        this.email = email;
        this.role = role;
        this.entityId = entityId;
        this.fullName = fullName;
        this.medicalLicense = medicalLicense;
        this.specialization = specialization;
        this.joinedDate = joinedDate;
    }
}
