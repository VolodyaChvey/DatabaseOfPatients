package com.chvei.DoP.services.diseasesServices.diseaseServiseImp;

import com.chvei.DoP.entity.patternsDiseases.PropertyDisease;
import com.chvei.DoP.repositories.diseasesRepositories.PropertyDiseaseRepository;
import com.chvei.DoP.services.diseasesServices.PropertyDiseaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class PropertyDiseaseServiceImp implements PropertyDiseaseService {
    private final Logger logger = Logger.getLogger(PropertyDiseaseServiceImp.class.getName());
    private PropertyDiseaseRepository propertyDiseaseRepository;

    public PropertyDiseaseServiceImp() {
    }

    @Autowired
    public PropertyDiseaseServiceImp(PropertyDiseaseRepository propertyDiseaseRepository) {
        this.propertyDiseaseRepository = propertyDiseaseRepository;
    }

    @Override
    public PropertyDisease getPropertyDiseaseById(Long id) {
        return propertyDiseaseRepository.findById(id).orElseThrow();
    }

    @Override
    public List<PropertyDisease> getAllPropertyDisease() {
        return propertyDiseaseRepository.findAll();
    }

    @Override
    public PropertyDisease savePropertyDisease(PropertyDisease propertyDisease) {
        getAllPropertyDisease().stream().map(PropertyDisease::getName).toList().contains(propertyDisease.getName());
        PropertyDisease propertyDisease1 = propertyDiseaseRepository.save(propertyDisease);
        logger.log(Level.INFO, "PropertyDisease " + propertyDisease1.getName() + " created");
        return propertyDisease1;
    }

    @Override
    public PropertyDisease updatePropertyDisease(PropertyDisease propertyDisease) {
        PropertyDisease propertyDisease1 = propertyDiseaseRepository.save(propertyDisease);
        logger.log(Level.INFO, "PropertyDisease " + propertyDisease1.getName() + " updated");
        return propertyDisease1;
    }

    @Override
    public void deletePropertyDisease(Long id) {
        propertyDiseaseRepository.deleteById(id);
        logger.log(Level.INFO, "PropertyDisease with id " + id + " deleted");
    }
}
