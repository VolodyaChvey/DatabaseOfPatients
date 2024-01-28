package com.chvei.DoP.services.diseasesServices;

import com.chvei.DoP.entity.patternsDiseases.MainDisease;
import com.chvei.DoP.repositories.diseasesRepositories.MainDiseaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class MainDiseaseServiceImp implements MainDiseaseService{
    private final Logger logger = Logger.getLogger(MainDiseaseServiceImp.class.getName());
    private MainDiseaseRepository mainDiseaseRepository;

    public MainDiseaseServiceImp() {}

    @Autowired
    public MainDiseaseServiceImp(MainDiseaseRepository mainDiseaseRepository) {
        this.mainDiseaseRepository = mainDiseaseRepository;
    }


    @Override
    public MainDisease getMainDiseaseById(Long id) {
        return null;
    }

    @Override
    public List<MainDisease> getAllMainDisease() {
        return null;
    }

    @Override
    public MainDisease saveMainDisease(MainDisease mainDisease) {
        return null;
    }

    @Override
    public MainDisease updateMainDisease(MainDisease mainDisease) {
        return null;
    }

    @Override
    public void deleteMainDisease(Long id) {

    }
}
