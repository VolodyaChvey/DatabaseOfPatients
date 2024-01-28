package com.chvei.DoP.services;

import com.chvei.DoP.entity.Patient;

import java.util.List;

public interface PatientService {
    Patient getPatientById(Long id);

    List<Patient> getAllPatient();

    Patient savePatient(Patient patient);

    Patient updatePatient(Patient patient);

    void deletePatient(Long id);
}
