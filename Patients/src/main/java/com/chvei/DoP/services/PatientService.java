package com.chvei.DoP.services;

import com.chvei.DoP.entity.Patient;
import com.chvei.DoP.repositories.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {
    private PatientRepository patientRepository;

    public PatientService() {
    }

    @Autowired
    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public Patient getPatientById(Long id) {
        return patientRepository.findById(id).orElseThrow();
    }

    public List<Patient> getAllPatient() {
        return patientRepository.findAll();
    }

    public Long savePatient(Patient patient) {
        Long id = patientRepository.save(patient).getId();
        return id;
    }

    public Long updatePatient(Patient patient) {
        Long id = patientRepository.save(patient).getId();
        return id;
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}
