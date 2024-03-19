package com.chvei.DoP.controllers;

import com.chvei.DoP.DTO.VisitDTO;
import com.chvei.DoP.entity.Visit;
import com.chvei.DoP.services.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/visits")
public class VisitController {
    private VisitService visitService;

    public VisitController() {
    }

    @Autowired
    public VisitController(VisitService visitService) {
        this.visitService = visitService;
    }

    @GetMapping("/{id}")
    public VisitDTO getVisitById(@PathVariable Long id) {
        return visitService.getVisitById(id);
    }

    @GetMapping
    public List<VisitDTO> getAllVisit() {
        return visitService.getAllVisits();
    }

    @PostMapping
    public VisitDTO createVisit(@RequestBody VisitDTO visitDTO) {
        return visitService.saveVisit(visitDTO);
    }

    @PutMapping("/{id}")
    public VisitDTO updateVisit(@RequestBody VisitDTO visitDTO) {
        return visitService.updateVisit(visitDTO);
    }

    @DeleteMapping("/{id}")
    public boolean deleteVisit(@PathVariable Long id) {
      return  visitService.deleteVisit(id);
    }

    @GetMapping("/patient/{patientId}")
    public List<VisitDTO> getVisitsByPatientId(@PathVariable Long patientId) {
        return visitService.getVisitsByPatientId(patientId);
    }

    @GetMapping("/patient/lastTen/{patientId}")
    public List<VisitDTO> getLastTenVisitsByPatientId(@PathVariable Long patientId) {
        return visitService.getFirstTenVisitsByPatientIdDesc(patientId);
    }
    @GetMapping("/patient/count/{patientId}")
    public int getCountByPatientId(@PathVariable Long patientId){
        return visitService.getCountByPatientID(patientId);
    }
}
