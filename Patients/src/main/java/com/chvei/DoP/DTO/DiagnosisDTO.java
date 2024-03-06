package com.chvei.DoP.DTO;

import com.chvei.DoP.entity.Patient;
import com.chvei.DoP.entity.patternsDiseases.ComplicationDisease;
import com.chvei.DoP.entity.patternsDiseases.MainDisease;
import com.chvei.DoP.entity.patternsDiseases.PropertyDisease;

import java.util.ArrayList;
import java.util.List;

public class DiagnosisDTO {
    private Long id;
    private Long patientId;
    private String code;
    private MainDisease mainDisease;
    private List<PropertyDisease> properties = new ArrayList<>();
    private List<ComplicationDisease> complications = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public MainDisease getMainDisease() {
        return mainDisease;
    }

    public void setMainDisease(MainDisease mainDisease) {
        this.mainDisease = mainDisease;
    }

    public List<PropertyDisease> getProperties() {
        return properties;
    }

    public void setProperties(List<PropertyDisease> properties) {
        this.properties = properties;
    }

    public List<ComplicationDisease> getComplications() {
        return complications;
    }

    public void setComplications(List<ComplicationDisease> complications) {
        this.complications = complications;
    }

    @Override
    public String toString() {
        return "DiagnosisDTO{" +
                "id=" + id +
                ", patientId=" + patientId +
                ", code='" + code + '\'' +
                ", mainDisease=" + mainDisease +
                ", properties=" + properties +
                ", complications=" + complications +
                '}';
    }
}

