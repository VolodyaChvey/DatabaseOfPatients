package com.chvei.DoP.services.servicesImp;

import com.chvei.DoP.entity.patternsDiseases.MainDisease;
import com.chvei.DoP.repositories.diseasesRepositories.MainDiseaseRepository;
import com.chvei.DoP.services.DiseaseService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class DiseaseServiceImp implements DiseaseService {
    private MainDiseaseRepository mainDiseaseRepository;

    public DiseaseServiceImp() {
    }

    public DiseaseServiceImp(MainDiseaseRepository mainDiseaseRepository) {
        this.mainDiseaseRepository = mainDiseaseRepository;
    }

    @Override
    public List<MainDisease> getAllActualMainDisease() {
        List<MainDisease> diseaseList = mainDiseaseRepository.findAll();
        return new ArrayList<>();
    }
}
