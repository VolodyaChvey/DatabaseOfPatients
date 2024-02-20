package com.chvei.DoP.controllers;

import com.chvei.DoP.entity.Visit;
import com.chvei.DoP.services.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("*/visits")
public class VisitController {
    private VisitService visitService;

    public VisitController() {
    }

    @Autowired
    public VisitController(VisitService visitService) {
        this.visitService = visitService;
    }

    @GetMapping("/{id}")
    public Visit getVisitById(@PathVariable Long id) {
        return visitService.getVisitById(id);
    }

    @GetMapping
    public List<Visit> getAllVisit() {
        return visitService.getAllVisits();
    }

    @PostMapping
    public Visit createVisit(@RequestBody Visit visit) {
        return visitService.saveVisit(visit);
    }

    @PutMapping("/{id}")
    public Visit updateVisit(@RequestBody Visit visit) {
        return visitService.updateVisit(visit);
    }

    @DeleteMapping("/{id}")
    public void deleteVisit(@PathVariable Long id) {
        visitService.deleteVisit(id);
    }
}
