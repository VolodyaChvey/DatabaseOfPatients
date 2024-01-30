package com.chvei.DoP.services;

import com.chvei.DoP.DTO.DiagnosisDTO;

import java.util.List;

public interface DiagnosisService {
    DiagnosisDTO getDiagnosisDTOById(Long id);
    DiagnosisDTO getDiagnosisDTOByPatientId(Long id);
    List<DiagnosisDTO> getAllDiagnosisDTO();
    DiagnosisDTO saveDiagnosis (DiagnosisDTO diagnosisDTO);
    DiagnosisDTO updateDiagnosis (DiagnosisDTO diagnosisDTO);
    void deleteDiagnosis(Long id);
}
