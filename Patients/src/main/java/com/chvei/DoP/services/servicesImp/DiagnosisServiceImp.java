package com.chvei.DoP.services.servicesImp;

import com.chvei.DoP.entity.Diagnosis;
import com.chvei.DoP.repositories.DiagnosisRepository;
import com.chvei.DoP.services.DiagnosisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class DiagnosisServiceImp implements DiagnosisService {
    private final Logger logger = Logger.getLogger(DiagnosisServiceImp.class.getName());
    private DiagnosisRepository diagnosisRepository;

    public DiagnosisServiceImp() {
    }

    @Autowired
    public DiagnosisServiceImp(DiagnosisRepository diagnosisRepository) {
        this.diagnosisRepository = diagnosisRepository;
    }

    @Override
    public Diagnosis getDiagnosisById(Long id) {
        return diagnosisRepository.findById(id).orElseThrow();
    }

    @Override
    public Diagnosis getDiagnosisByPatientId(Long id) {
        return diagnosisRepository.findByPatient_Id(id).orElseThrow();
    }

    @Override
    public List<Diagnosis> getAllDiagnosis() {
        return diagnosisRepository.findAll();
    }

    @Override
    public Diagnosis saveDiagnosis(Diagnosis diagnosis) {
        System.out.println(diagnosis);
        Diagnosis diagnosis1 = diagnosisRepository.save(diagnosis);
        System.out.println(diagnosis1);
        logger.log(Level.INFO, "Diagnosis " + diagnosis1.getMainDisease() + " created");
        return diagnosis1;
    }

    @Override
    public Diagnosis updateDiagnosis(Diagnosis diagnosis) {
        Diagnosis diagnosis1 = diagnosisRepository.save(diagnosis);
        logger.log(Level.INFO, "Diagnosis " + diagnosis1.getMainDisease() + " updated");
        return diagnosis1;
    }

    @Override
    public void deleteDiagnosis(Long id) {
        diagnosisRepository.deleteById(id);
        logger.log(Level.INFO, "Diagnosis with id " + id + " deleted");
    }
}
