package com.chvei.DoP.services.servicesImp;

import com.chvei.DoP.entity.Patient;
import com.chvei.DoP.exceptions.ResourceNotFoundException;
import com.chvei.DoP.exceptions.UnacceptableActionException;
import com.chvei.DoP.repositories.PatientRepository;

import java.util.logging.Level;
import java.util.logging.Logger;

import com.chvei.DoP.repositories.VisitRepository;
import com.chvei.DoP.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImp implements PatientService {
    private final Logger logger = Logger.getLogger(PatientServiceImp.class.getName());
    private PatientRepository patientRepository;
    private VisitRepository visitRepository;

    public PatientServiceImp() {
    }

    @Autowired
    public PatientServiceImp(PatientRepository patientRepository, VisitRepository visitRepository) {
        this.patientRepository = patientRepository;
        this.visitRepository = visitRepository;
    }

    @Override
    public List<Patient> getAllPatientsByMainDisease(String name) {
        return null;
    }

    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient with id " + id + " not found"));
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

    public boolean deletePatient(Long id) {
        patientRepository.deleteById(id);
        boolean delete = patientRepository.existsById(id);
        if (!delete) {
            logger.log(Level.INFO, "Patient with id " + id + " deleted");
        }
        return delete;
    }

    @Override
    public Patient registration(Patient patient) {
        if (visitRepository.existsByCreatedAndPatient_Id(patient.getRegistration(), patient.getId())) {
            throw new UnacceptableActionException("The patient has already been registered");
        }
        return null;
    }
}
