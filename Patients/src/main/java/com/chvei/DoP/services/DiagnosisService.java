package com.chvei.DoP.services;

import com.chvei.DoP.DTO.DiagnosisDTO;
import com.chvei.DoP.entity.Diagnosis;

import java.util.List;

public interface DiagnosisService {
    Diagnosis getDiagnosisById(Long id);
    Diagnosis getDiagnosisByPatientId(Long id);
    List<Diagnosis> getAllDiagnosesByMainDiseaseName(String name);
    List<Diagnosis> getAllDiagnoses();
    Diagnosis saveDiagnosis (Diagnosis diagnosis);
    Diagnosis updateDiagnosis (Diagnosis diagnosis);
    void deleteDiagnosis(Long id);

}
