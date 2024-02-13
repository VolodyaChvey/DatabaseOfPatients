package com.chvei.DoP.controllers;

import com.chvei.DoP.DTO.DiagnosisDTO;
import com.chvei.DoP.entity.Diagnosis;
import com.chvei.DoP.entity.patternsDiseases.MainDisease;
import com.chvei.DoP.services.DiagnosisService;
import com.chvei.DoP.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/diagnoses")
public class DiagnosisController {
    private DiagnosisService diagnosisService;

    public DiagnosisController() {
    }

    @Autowired
    public DiagnosisController(DiagnosisService diagnosisServiceImp) {
        this.diagnosisService = diagnosisServiceImp;
    }

    @GetMapping("/{id}")
    public Diagnosis getDiagnosisById(@PathVariable Long id) {
        return diagnosisService.getDiagnosisById(id);
    }

    @GetMapping
    public List<Diagnosis> getAllDiagnosis() {
        return diagnosisService.getAllDiagnoses();
    }

    @PostMapping
    public Diagnosis createDiagnosis(@RequestBody Diagnosis diagnosis) {
        return diagnosisService.saveDiagnosis(diagnosis);
    }

    @PutMapping("/{id}")
    public Diagnosis updateDiagnosis(@RequestBody Diagnosis diagnosis) {
        return diagnosisService.updateDiagnosis(diagnosis);
    }

    @DeleteMapping("/{id}")
    public void deleteDiagnosis(@PathVariable Long id) {
        diagnosisService.deleteDiagnosis(id);
    }

    @GetMapping("/patientId/{id}")
    public Diagnosis getDiagnosisByPatientId(@PathVariable Long id) {
        return diagnosisService.getDiagnosisByPatientId(id);
    }

    @GetMapping("/mainDiseaseName/{name}")
    public List<Diagnosis> getDiagnosesByMainDiseaseName(@PathVariable String name) {
        return diagnosisService.getAllDiagnosesByMainDiseaseName(name);
    }

}
