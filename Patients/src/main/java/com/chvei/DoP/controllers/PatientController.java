package com.chvei.DoP.controllers;

import com.chvei.DoP.entity.Patient;
import com.chvei.DoP.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {
    private PatientService patientService;

    public PatientController() {
    }

    @Autowired
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping("/{id}")
    public Patient getPtientById(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatient();
    }

    @PostMapping
    public Long createPatient(@RequestBody Patient patient) {
        return patientService.savePatient(patient);
    }

    @PutMapping("/{id}")
    public Long updatePatient(@RequestBody Patient patient) {
        return patientService.updatePatient(patient);
    }

    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
    }
}
