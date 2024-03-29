package com.chvei.DoP.entity;

import com.chvei.DoP.entity.patternsDiseases.ComplicationDisease;
import com.chvei.DoP.entity.patternsDiseases.MainDisease;
import com.chvei.DoP.entity.patternsDiseases.PropertyDisease;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Diagnosis {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private  String code;
    @OneToOne(mappedBy = "diagnosis")
    @JsonIgnore
    private Patient patient;
    @ManyToOne
    @JoinColumn(name = "mean-disease_id", nullable = false)
    private MainDisease mainDisease;
    @ManyToMany
    @JoinTable(name = "diagnosis_property-disease",
            joinColumns = @JoinColumn(name = "diagnosis_id"),
            inverseJoinColumns = @JoinColumn(name = "property-disease_id"))
    private List<PropertyDisease> properties = new ArrayList<>();
    @ManyToMany
    @JoinTable(name = "diagnosis_complication-disease",
            joinColumns = @JoinColumn(name = "diagnosis_id"),
            inverseJoinColumns = @JoinColumn(name = "complication-disease_id"))
    private List<ComplicationDisease> complications = new ArrayList<>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
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
        return "Diagnosis{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", mainDisease=" + mainDisease +
                ", properties=" + properties +
                ", complications=" + complications +
                '}';
    }
}
