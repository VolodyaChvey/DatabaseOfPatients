package com.chvei.DoP.services;

import com.chvei.DoP.DTO.DiagnosisDTO;
import com.chvei.DoP.entity.Diagnosis;

import java.util.List;

public interface DiagnosisService {
    Diagnosis getDiagnosisById(Long id);
    Diagnosis getDiagnosisByPatientId(Long id);
    List<Diagnosis> getAllDiagnosesByMainDiseaseName(String name);
    List<Diagnosis> getAllDiagnoses();
    DiagnosisDTO saveDiagnosis (DiagnosisDTO diagnosisDTO);
    DiagnosisDTO updateDiagnosis (DiagnosisDTO diagnosisDTO);
    void deleteDiagnosis(Long id);

}
