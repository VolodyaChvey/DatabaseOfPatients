package com.chvei.DoP.services;

import com.chvei.DoP.DTO.DiagnosisDTO;
import com.chvei.DoP.entity.Diagnosis;

import java.util.List;

public interface DiagnosisService {
    DiagnosisDTO getDiagnosisDTOById(Long id);
    DiagnosisDTO getDiagnosisDTOByPatientId(Long id);
    List<Diagnosis> getAllDiagnosisDTO();
    DiagnosisDTO saveDiagnosis (DiagnosisDTO diagnosisDTO);
    DiagnosisDTO updateDiagnosis (DiagnosisDTO diagnosisDTO);
    void deleteDiagnosis(Long id);
}
