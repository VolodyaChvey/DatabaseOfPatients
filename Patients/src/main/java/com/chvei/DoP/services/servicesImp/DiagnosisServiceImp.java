package com.chvei.DoP.services.servicesImp;

import com.chvei.DoP.DTO.DiagnosisDTO;
import com.chvei.DoP.entity.Diagnosis;
import com.chvei.DoP.repositories.DiagnosisRepository;
import com.chvei.DoP.repositories.PatientRepository;
import com.chvei.DoP.services.DiagnosisService;
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

    public DiagnosisServiceImp() {
    }

    @Autowired
    public DiagnosisServiceImp(DiagnosisRepository diagnosisRepository, PatientRepository patientRepository) {
        this.diagnosisRepository = diagnosisRepository;
        this.patientRepository = patientRepository;
    }

    @Override
    public DiagnosisDTO getDiagnosisDTOById(Long id) {
        Diagnosis diagnosis = diagnosisRepository.findById(id).orElseThrow();
        return toDTO(diagnosis);
    }

    @Override
    public DiagnosisDTO getDiagnosisDTOByPatientId(Long id) {
        Diagnosis diagnosis = diagnosisRepository.findByPatient_Id(id).orElseThrow();
        return toDTO(diagnosis);
    }

    @Override
    public List<DiagnosisDTO> getAllDiagnosisDTO() {
        List<Diagnosis> diagnosisList = diagnosisRepository.findAll();
        List<DiagnosisDTO> diagnosisDTOList = new ArrayList<>();
        for (Diagnosis diagnosis : diagnosisList) {
            diagnosisDTOList.add(toDTO(diagnosis));
        }
        return diagnosisDTOList;
    }

    @Override
    public DiagnosisDTO saveDiagnosis(DiagnosisDTO diagnosisDTO) {
        Diagnosis diagnosis1 = diagnosisRepository.save(toEntity(diagnosisDTO));
        logger.log(Level.INFO, "Diagnosis " + diagnosis1.getMainDisease().getName() + " created");
        return toDTO(diagnosis1);
    }

    @Override
    public DiagnosisDTO updateDiagnosis(DiagnosisDTO diagnosisDTO) {
        Diagnosis diagnosis1 = diagnosisRepository.save(toEntity(diagnosisDTO));
        logger.log(Level.INFO, "Diagnosis " + diagnosis1.getMainDisease().getName() + " updated");
        return toDTO(diagnosis1);
    }

    @Override
    public void deleteDiagnosis(Long id) {
        diagnosisRepository.deleteById(id);
        logger.log(Level.INFO, "Diagnosis with id " + id + " deleted");
    }

    public DiagnosisDTO toDTO(Diagnosis diagnosis) {
        DiagnosisDTO diagnosisDTO = new DiagnosisDTO();
        diagnosisDTO.setId(diagnosis.getId());
        diagnosisDTO.setPatientId(diagnosis.getPatient().getId());
        diagnosisDTO.setMainDisease(diagnosis.getMainDisease());
        diagnosisDTO.setProperties(diagnosis.getProperties());
        diagnosisDTO.setComplications(diagnosis.getComplications());
        return diagnosisDTO;
    }

    public Diagnosis toEntity(DiagnosisDTO diagnosisDTO) {
        Diagnosis diagnosis = new Diagnosis();
        diagnosis.setId((null == diagnosisDTO.getId()) ? diagnosisDTO.getId() : null);
        diagnosis.setPatient(patientRepository.findById(diagnosisDTO.getPatientId()).orElseThrow());
        diagnosis.setMainDisease(diagnosisDTO.getMainDisease());
        diagnosis.setProperties(diagnosisDTO.getProperties());
        diagnosis.setComplications(diagnosisDTO.getComplications());
        return diagnosis;
    }
}
