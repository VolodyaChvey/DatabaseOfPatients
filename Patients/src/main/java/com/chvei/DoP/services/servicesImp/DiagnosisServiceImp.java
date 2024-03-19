package com.chvei.DoP.services.servicesImp;

import com.chvei.DoP.DTO.DiagnosisDTO;
import com.chvei.DoP.entity.Diagnosis;
import com.chvei.DoP.entity.Patient;
import com.chvei.DoP.entity.patternsDiseases.MainDisease;
import com.chvei.DoP.exceptions.ResourceNotFoundException;
import com.chvei.DoP.repositories.DiagnosisRepository;
import com.chvei.DoP.repositories.PatientRepository;
import com.chvei.DoP.services.DiagnosisService;
import com.chvei.DoP.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service

public class DiagnosisServiceImp implements DiagnosisService {
    private final Logger logger = Logger.getLogger(DiagnosisServiceImp.class.getName());
    private DiagnosisRepository diagnosisRepository;
    private PatientRepository patientRepository;
    private PatientService patientService;

    public DiagnosisServiceImp() {
    }

    @Autowired
    public DiagnosisServiceImp(DiagnosisRepository diagnosisRepository, PatientRepository patientRepository, PatientService patientService) {
        this.diagnosisRepository = diagnosisRepository;
        this.patientRepository = patientRepository;
        this.patientService = patientService;
    }

    @Override
    public Diagnosis getDiagnosisById(Long id) {
        return diagnosisRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Diagnosis with id " + id + " not found"));
    }

    @Override
    public Diagnosis getDiagnosisByPatientId(Long id) {
        return diagnosisRepository.findByPatient_id(id)
                .orElseThrow(() -> new ResourceNotFoundException("Diagnosis with patient_id " + id + " not found"));
    }

    @Override
    public List<Diagnosis> getAllDiagnosesByMainDiseaseName(String name) {
        return diagnosisRepository.findDistinctByMainDisease_name(name);
    }

    @Override
    public List<Diagnosis> getAllDiagnoses() {
        return diagnosisRepository.findAll();
    }

    @Override
    public Diagnosis saveDiagnosis(DiagnosisDTO diagnosisDTO) {
        Diagnosis diagnosis= toEntity(diagnosisDTO);
        diagnosis.getPatient().setDiagnosis(diagnosis);
        diagnosis.getMainDisease().addDiagnosis(diagnosis);
        Diagnosis diagnosis1 = diagnosisRepository.save(diagnosis);
        logger.log(Level.INFO, "Diagnosis " + diagnosis1.getMainDisease().getName() + " created");
        return diagnosis1;
    }

    @Override
    public Diagnosis updateDiagnosis(Diagnosis diagnosis) {
        Diagnosis diagnosis1 = getDiagnosisById(diagnosis.getId());
        diagnosis1.getMainDisease().removeDiagnosis(diagnosis1);
        diagnosis.getMainDisease().addDiagnosis(diagnosis);
        Diagnosis diagnosis2 = diagnosisRepository.save(diagnosis);
        logger.log(Level.INFO, "Diagnosis " + diagnosis2.getMainDisease().getName() + " updated");
        return diagnosis2;
    }

    @Override
    public boolean deleteDiagnosis(Long id) {
        Diagnosis diagnosis = getDiagnosisById(id);
        diagnosis.getMainDisease().removeDiagnosis(diagnosis);
        diagnosisRepository.deleteById(id);
        logger.log(Level.INFO, "Diagnosis with id " + id + " deleted");
        return diagnosisRepository.existsById(id);
    }

    public DiagnosisDTO toDTO(Diagnosis diagnosis) {
        DiagnosisDTO diagnosisDTO = new DiagnosisDTO();
        diagnosisDTO.setId(diagnosis.getId());
        diagnosisDTO.setPatientId(diagnosis.getPatient().getId());
        diagnosisDTO.setCode(diagnosisDTO.getCode());
        diagnosisDTO.setMainDisease(diagnosis.getMainDisease());
        diagnosisDTO.setProperties(diagnosis.getProperties());
        diagnosisDTO.setComplications(diagnosis.getComplications());
        return diagnosisDTO;
    }

    public Diagnosis toEntity(DiagnosisDTO diagnosisDTO) {
        Diagnosis diagnosis = new Diagnosis();
        diagnosis.setId(diagnosisDTO.getId());
        diagnosis.setPatient(patientRepository.findById(diagnosisDTO.getPatientId()).orElseThrow());
        diagnosis.setCode(diagnosisDTO.getCode());
        diagnosis.setMainDisease(diagnosisDTO.getMainDisease());
        diagnosis.setProperties(diagnosisDTO.getProperties());
        diagnosis.setComplications(diagnosisDTO.getComplications());
        return diagnosis;
    }
}
