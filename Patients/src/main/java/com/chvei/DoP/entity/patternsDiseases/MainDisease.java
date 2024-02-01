package com.chvei.DoP.entity.patternsDiseases;

import com.chvei.DoP.entity.Diagnosis;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class MainDisease extends Disease {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;

    @OneToMany(mappedBy = "mainDisease",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Diagnosis> diagnoses = new ArrayList<>();

    public void addDiagnosis (Diagnosis diagnosis){
        diagnoses.add(diagnosis);
        diagnosis.setMainDisease(this);
    }
    public void removeDiagnosis(Diagnosis diagnosis){
        diagnoses.remove(diagnosis);
        diagnosis.setMainDisease(null);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Diagnosis> getDiagnoses() {
        return diagnoses;
    }

    public void setDiagnoses(List<Diagnosis> diagnoses) {
        this.diagnoses = diagnoses;
    }

    @Override
    public String toString() {
        return "MainDisease{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
