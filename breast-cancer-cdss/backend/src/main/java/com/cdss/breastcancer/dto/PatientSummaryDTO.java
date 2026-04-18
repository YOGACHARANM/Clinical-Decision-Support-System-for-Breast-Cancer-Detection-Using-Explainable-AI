package com.cdss.breastcancer.dto;

import lombok.Data;
import java.sql.Date;
import java.time.LocalDate;
import java.time.Period;

@Data
public class PatientSummaryDTO {
    private String id;
    private String name;
    private String gender;
    private int age;

    public PatientSummaryDTO(String id, String name, String gender, Date dateOfBirth) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.age = calculateAge(dateOfBirth);
    }

    private int calculateAge(Date dateOfBirth) {
        if (dateOfBirth == null)
            return 0;
        return Period.between(dateOfBirth.toLocalDate(), LocalDate.now()).getYears();
    }
}
