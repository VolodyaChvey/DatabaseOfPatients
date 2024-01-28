package com.chvei.DoP.services.diseasesServices;

import com.chvei.DoP.entity.patternsDiseases.MainDisease;
import com.chvei.DoP.entity.patternsDiseases.Patterns;

import java.util.List;

public interface MainDiseaseService {
    Patterns getPatterns();
    MainDisease getMainDiseaseById(Long id);
    List<MainDisease> getAllMainDisease();
    MainDisease saveMainDisease(MainDisease mainDisease);
    MainDisease updateMainDisease(MainDisease mainDisease);
    void deleteMainDisease(Long id);
}
