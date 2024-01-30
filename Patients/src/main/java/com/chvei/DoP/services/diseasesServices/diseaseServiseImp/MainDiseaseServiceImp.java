package com.chvei.DoP.services.diseasesServices.diseaseServiseImp;

import com.chvei.DoP.entity.patternsDiseases.MainDisease;
import com.chvei.DoP.DTO.Patterns;
import com.chvei.DoP.repositories.diseasesRepositories.MainDiseaseRepository;
import com.chvei.DoP.services.diseasesServices.ComplicationDiseaseService;
import com.chvei.DoP.services.diseasesServices.MainDiseaseService;
import com.chvei.DoP.services.diseasesServices.PropertyDiseaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class MainDiseaseServiceImp implements MainDiseaseService {
    private final Logger logger = Logger.getLogger(MainDiseaseServiceImp.class.getName());
    private MainDiseaseRepository mainDiseaseRepository;
    private PropertyDiseaseService propertyDiseaseService;
    private ComplicationDiseaseService complicationDiseaseService;

    public MainDiseaseServiceImp() {
    }

    @Autowired
    public MainDiseaseServiceImp(MainDiseaseRepository mainDiseaseRepository, PropertyDiseaseService propertyDiseaseService, ComplicationDiseaseService complicationDiseaseService) {
        this.mainDiseaseRepository = mainDiseaseRepository;
        this.propertyDiseaseService = propertyDiseaseService;
        this.complicationDiseaseService = complicationDiseaseService;
    }

    @Override
    public Patterns getPatterns() {
        Patterns patterns = new Patterns();
        patterns.setMain(getAllMainDisease());
        patterns.setProperties(propertyDiseaseService.getAllPropertyDisease());
        patterns.setComplications(complicationDiseaseService.getAllComplicationDisease());
        logger.log(Level.INFO, "Patterns created");
        return patterns;
    }

    @Override
    public MainDisease getMainDiseaseById(Long id) {
        return mainDiseaseRepository.findById(id).orElseThrow();
    }

    @Override
    public List<MainDisease> getAllMainDisease() {
        return mainDiseaseRepository.findAll();
    }

    @Override
    public MainDisease saveMainDisease(MainDisease mainDisease) {
        MainDisease mainDisease1 = mainDiseaseRepository.save(mainDisease);
        logger.log(Level.INFO, "MainDisease  " + mainDisease1.getName() + " created");
        return mainDisease1;
    }

    @Override
    public MainDisease updateMainDisease(MainDisease mainDisease) {
        MainDisease mainDisease1 = mainDiseaseRepository.save(mainDisease);
        logger.log(Level.INFO, "MainDisease " + mainDisease1.getName() + " updated");
        return mainDisease1;
    }

    @Override
    public void deleteMainDisease(Long id) {
        mainDiseaseRepository.deleteById(id);
        logger.log(Level.INFO, "MainDisease with id " + id + " deleted");
    }
}
