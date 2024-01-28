package com.chvei.DoP.services.diseasesServices.diseaseServiseImp;

import com.chvei.DoP.entity.patternsDiseases.ComplicationDisease;
import com.chvei.DoP.repositories.diseasesRepositories.ComplicationDiseaseRepository;
import com.chvei.DoP.services.diseasesServices.ComplicationDiseaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class ComplicationDiseaseServiceImp implements ComplicationDiseaseService {
    private final Logger logger = Logger.getLogger(ComplicationDiseaseServiceImp.class.getName());
    private ComplicationDiseaseRepository complicationDiseaseRepository;

    public ComplicationDiseaseServiceImp() {
    }

    @Autowired
    public ComplicationDiseaseServiceImp(ComplicationDiseaseRepository complicationDiseaseRepository) {
        this.complicationDiseaseRepository = complicationDiseaseRepository;
    }

    @Override
    public ComplicationDisease getComplicationDiseaseById(Long id) {
        return complicationDiseaseRepository.findById(id).orElseThrow();
    }

    @Override
    public List<ComplicationDisease> getAllComplicationDisease() {
        return complicationDiseaseRepository.findAll();
    }

    @Override
    public ComplicationDisease saveComplicationDisease(ComplicationDisease complicationDisease) {
        ComplicationDisease complicationDisease1 = complicationDiseaseRepository.save(complicationDisease);
        logger.log(Level.INFO, "ComplicationDisease " + complicationDisease1.getName() + " created");
        return complicationDisease1;
    }

    @Override
    public ComplicationDisease updateComplicationDisease(ComplicationDisease complicationDisease) {
        ComplicationDisease complicationDisease1 = complicationDiseaseRepository.save(complicationDisease);
        logger.log(Level.INFO, "ComplicationDisease " + complicationDisease1.getName() + " updated");
        return complicationDisease1;
    }

    @Override
    public void deleteComplicationDisease(Long id) {
        complicationDiseaseRepository.deleteById(id);
        logger.log(Level.INFO, "ComplicationDisease with id " + id + " deleted");
    }
}
