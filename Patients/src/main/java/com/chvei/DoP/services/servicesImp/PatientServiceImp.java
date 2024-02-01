package com.chvei.DoP.services.servicesImp;

import com.chvei.DoP.entity.Patient;
import com.chvei.DoP.repositories.PatientRepository;

import java.util.logging.Level;
import java.util.logging.Logger;

import com.chvei.DoP.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImp implements PatientService {
    private final Logger logger = Logger.getLogger(PatientServiceImp.class.getName());
    private PatientRepository patientRepository;

    public PatientServiceImp() {
    }

    @Autowired
    public PatientServiceImp(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public Patient getPatientById(Long id) {
        return  patientRepository.findById(id).orElseThrow();
    }

    public List<Patient> getAllPatient() {
        return patientRepository.findAll();
    }

    public Patient savePatient(Patient patient) {
        Patient patient1 = patientRepository.save(patient);
        logger.log(Level.INFO, "Patient " + patient1.getLastName() + " saved");
        return patient1;
    }

    public Patient updatePatient(Patient patient) {
        Patient upPatient = patientRepository.save(patient);
        logger.log(Level.INFO, "Patient " + upPatient.getLastName() + " updated");
        return upPatient;
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
        logger.log(Level.INFO, "Patient with id " + id + " deleted");
    }
}
