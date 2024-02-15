package com.chvei.DoP.controllers;

import com.chvei.DoP.entity.patternsDiseases.ComplicationDisease;
import com.chvei.DoP.entity.patternsDiseases.MainDisease;
import com.chvei.DoP.DTO.Patterns;
import com.chvei.DoP.entity.patternsDiseases.PropertyDisease;
import com.chvei.DoP.services.DiseaseService;
import com.chvei.DoP.services.diseasesServices.ComplicationDiseaseService;
import com.chvei.DoP.services.diseasesServices.MainDiseaseService;
import com.chvei.DoP.services.diseasesServices.PropertyDiseaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/diseases")
public class DiseaseController {
    private MainDiseaseService mainDiseaseService;
    private PropertyDiseaseService propertyDiseaseService;
    private ComplicationDiseaseService complicationDiseaseService;
    private DiseaseService diseaseService;

    public DiseaseController() {
    }

    @Autowired
    public DiseaseController(MainDiseaseService mainDiseaseService, PropertyDiseaseService propertyDiseaseService, ComplicationDiseaseService complicationDiseaseService, DiseaseService diseaseService) {
        this.mainDiseaseService = mainDiseaseService;
        this.propertyDiseaseService = propertyDiseaseService;
        this.complicationDiseaseService = complicationDiseaseService;
        this.diseaseService = diseaseService;
    }

    @GetMapping("/ActualMainDiseases")
    public List<MainDisease> getAllActualMainDiseases() {
        return diseaseService.getAllActualMainDisease();
    }

    @GetMapping
    public Patterns getAllPatternsDisease() {
        return mainDiseaseService.getPatterns();
    }

    @GetMapping("/mainDiseases")
    public List<MainDisease> getAllMainDisease() {
        return mainDiseaseService.getAllMainDisease();
    }

    @GetMapping("/mainDiseases/{id}")
    public MainDisease getMainDiseaseById(@PathVariable Long id) {
        return mainDiseaseService.getMainDiseaseById(id);
    }

    @PostMapping("/mainDiseases")
    public MainDisease createMainDisease(@RequestBody MainDisease mainDisease) {
        return mainDiseaseService.saveMainDisease(mainDisease);
    }

    @PutMapping("/mainDiseases/{id}")
    public MainDisease updateMainDisease(@RequestBody MainDisease mainDisease) {
        return mainDiseaseService.updateMainDisease(mainDisease);
    }

    @DeleteMapping("/mainDiseases/{id}")
    public void deleteMainDisease(@PathVariable Long id) {
        mainDiseaseService.deleteMainDisease(id);
    }

    @GetMapping("/properties")
    public List<PropertyDisease> getAllPropertyDisease() {
        return propertyDiseaseService.getAllPropertyDisease();
    }

    @GetMapping("/properties/{id}")
    public PropertyDisease getPropertyDiseaseById(@PathVariable Long id) {
        return propertyDiseaseService.getPropertyDiseaseById(id);
    }

    @PostMapping("/properties")
    public PropertyDisease createPropertyDisease(@RequestBody PropertyDisease propertyDisease) {
        return propertyDiseaseService.savePropertyDisease(propertyDisease);
    }

    @PutMapping("/properties/{id}")
    public PropertyDisease updatePropertyDisease(@RequestBody PropertyDisease propertyDisease) {
        return propertyDiseaseService.updatePropertyDisease(propertyDisease);
    }

    @DeleteMapping("/properties/{id}")
    public void deletePropertyDisease(@PathVariable Long id) {
        propertyDiseaseService.deletePropertyDisease(id);
    }

    @GetMapping("/complications")
    public List<ComplicationDisease> getAllComplicationDisease() {
        return complicationDiseaseService.getAllComplicationDisease();
    }

    @GetMapping("/complications/{id}")
    public ComplicationDisease getComplicationDiseaseById(@PathVariable Long id) {
        return complicationDiseaseService.getComplicationDiseaseById(id);
    }

    @PostMapping("/complications")
    public ComplicationDisease createComplicationDisease(@RequestBody ComplicationDisease complicationDisease) {
        return complicationDiseaseService.saveComplicationDisease(complicationDisease);
    }

    @PutMapping("/complications/{id}")
    public ComplicationDisease updateComplicationDisease(@RequestBody ComplicationDisease complicationDisease) {
        return complicationDiseaseService.updateComplicationDisease(complicationDisease);
    }

    @DeleteMapping("/complications/{id}")
    public void deleteComplicationDisease(@PathVariable Long id) {
        complicationDiseaseService.deleteComplicationDisease(id);
    }
}
