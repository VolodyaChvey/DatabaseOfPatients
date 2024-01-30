package com.chvei.DoP.controllers;

import com.chvei.DoP.DTO.DiagnosisDTO;
import com.chvei.DoP.entity.Diagnosis;
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
    public DiagnosisDTO getDiagnosisById(@PathVariable Long id) {
        return diagnosisService.getDiagnosisDTOById(id);
    }
    @GetMapping
    public List<DiagnosisDTO> getAllDiagnosis(){
        return diagnosisService.getAllDiagnosisDTO();
    }
    @PostMapping
    public DiagnosisDTO createDiagnosis(@RequestBody DiagnosisDTO diagnosisDTO){
        return diagnosisService.saveDiagnosis(diagnosisDTO);
    }
    @PutMapping("/{id}")
    public DiagnosisDTO updateDiagnosis(@RequestBody DiagnosisDTO diagnosisDTO){
        return diagnosisService.updateDiagnosis(diagnosisDTO);
    }
    @DeleteMapping("/{id}")
    public void deleteDiagnosis(@PathVariable Long id){
        diagnosisService.deleteDiagnosis(id);
    }

    @GetMapping("/patientId/{id}")
    public DiagnosisDTO getDiagnosisByPatientId(@PathVariable Long id){
        return diagnosisService.getDiagnosisDTOByPatientId(id);
    }
}
