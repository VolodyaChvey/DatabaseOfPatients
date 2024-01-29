package com.chvei.DoP.controllers;

import com.chvei.DoP.entity.Diagnosis;
import com.chvei.DoP.services.DiagnosisService;
import com.chvei.DoP.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
