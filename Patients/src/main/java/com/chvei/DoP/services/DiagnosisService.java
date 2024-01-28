package com.chvei.DoP.services;

import com.chvei.DoP.entity.Diagnosis;
import com.chvei.DoP.entity.patternsDiseases.Patterns;

import java.util.List;

public interface DiagnosisService {
    Diagnosis getDiagnosisById(Long id);
    Diagnosis getDiagnosisByPatientId(Long id);
    List<Diagnosis> getAllDiagnosis();
    Diagnosis saveDiagnosis (Diagnosis diagnosis);
    Diagnosis updateDiagnosis (Diagnosis diagnosis);
    void deleteDiagnosis(Long id);
}
