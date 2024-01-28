package com.chvei.DoP.services.diseasesServices;

import com.chvei.DoP.entity.patternsDiseases.ComplicationDisease;

import java.util.List;

public interface ComplicationDiseaseService {
    ComplicationDisease getComplicationDiseaseById(Long id);
    List<ComplicationDisease> getAllComplicationDisease();
    ComplicationDisease saveComplicationDisease(ComplicationDisease propertyDisease);
    ComplicationDisease updateComplicationDisease(ComplicationDisease propertyDisease);
    void deleteComplicationDisease (Long id);
}
