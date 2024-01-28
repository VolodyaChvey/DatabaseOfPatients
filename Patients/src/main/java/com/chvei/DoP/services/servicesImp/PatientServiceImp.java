package com.chvei.DoP.services;

import com.chvei.DoP.entity.Patient;
import com.chvei.DoP.repositories.PatientRepository;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImp implements PatientService{
    private final Logger logger = Logger.getLogger(PatientServiceImp.class.getName());
    private PatientRepository patientRepository;

    public PatientServiceImp() {
    }

    @Autowired
    public PatientServiceImp(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public Patient getPatientById(Long id) {
        return patientRepository.findById(id).orElseThrow();
    }

    public List<Patient> getAllPatient() {
        return patientRepository.findAll();
    }

    public Patient savePatient(Patient patient) {
        Long id = patientRepository.save(patient).getId();
        logger.log(Level.INFO, "Patient with Id" + id + " saved");
        return patientRepository.findById(id).orElseThrow();
    }

    public Patient updatePatient(Patient patient) {
        Patient upPatient = patientRepository.save(patient);
        logger.log(Level.INFO, "Patient with Id " + upPatient.getId() + " updated");
        return upPatient;
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}
