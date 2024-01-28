package com.chvei.DoP.entity;

import com.chvei.DoP.entity.patternsDiseases.ComplicationDisease;
import com.chvei.DoP.entity.patternsDiseases.MainDisease;
import com.chvei.DoP.entity.patternsDiseases.PropertyDisease;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Diagnosis {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "MAIN-DISEASE_ID")
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

    public Diagnosis() {
    }

    @Autowired
    public Diagnosis(MainDisease mainDisease, List<PropertyDisease> properties, List<ComplicationDisease> complications) {
        this.mainDisease = mainDisease;
        this.properties = properties;
        this.complications = complications;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
                ", mainDisease=" + mainDisease +
                ", properties=" + properties +
                ", complications=" + complications +
                '}';
    }
}
