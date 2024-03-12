package com.chvei.DoP.DTO;

import java.time.LocalDate;

public class VisitDTO {
    private Long id;
    private Long patientId;
    private String text;
    private LocalDate created;

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

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDate getCreated() {
        return created;
    }

    public void setCreated(LocalDate created) {
        this.created = created;
    }

    @Override
    public String toString() {
        return "VisitDTO{" +
                "id=" + id +
                ", patientId=" + patientId +
                ", text='" + text + '\'' +
                ", created=" + created +
                '}';
    }
}
