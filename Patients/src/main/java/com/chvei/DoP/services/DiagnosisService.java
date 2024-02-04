package com.chvei.DoP.services;

import com.chvei.DoP.DTO.DiagnosisDTO;
import com.chvei.DoP.entity.Diagnosis;

import java.util.List;

public interface DiagnosisService {
    Diagnosis getDiagnosisById(Long id);
    Diagnosis getDiagnosisByPatientId(Long id);
    List<Diagnosis> getAllDiagnosisDTO();
    DiagnosisDTO saveDiagnosis (DiagnosisDTO diagnosisDTO);
    DiagnosisDTO updateDiagnosis (DiagnosisDTO diagnosisDTO);
    void deleteDiagnosis(Long id);

}
