package com.chvei.DoP.services;

import com.chvei.DoP.entity.Disease;
import com.chvei.DoP.repositories.DiseaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiseaseService {
    private DiseaseRepository diseaseRepository;

    public DiseaseService() {
    }

    @Autowired
    public DiseaseService(DiseaseRepository diseaseRepository) {
        this.diseaseRepository = diseaseRepository;
    }

    public Disease getDiseaseById(Long id) {
        return diseaseRepository.findById(id).orElseThrow();
    }

    public List<Disease> getAllDiseases() {
        return diseaseRepository.findAll();
    }

    public Long saveDisease(Disease disease) {
        Long id = diseaseRepository.save(disease).getId();
        return id;
    }

    public Long updateDisease(Disease disease) {
        Long id = diseaseRepository.saveAndFlush(disease).getId();
        return id;
    }

    public void deleteDisease(Long id) {
        diseaseRepository.deleteById(id);
    }
}
