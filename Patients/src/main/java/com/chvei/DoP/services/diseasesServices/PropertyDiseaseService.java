package com.chvei.DoP.services.diseasesServices;

import com.chvei.DoP.entity.patternsDiseases.PropertyDisease;

import java.util.List;

public interface PropertyDiseaseService {
    PropertyDisease getPropertyDiseaseById(Long id);
    List<PropertyDisease> getAllPropertyDisease();
    PropertyDisease savePropertyDisease(PropertyDisease propertyDisease);
    PropertyDisease updatePropertyDisease(PropertyDisease propertyDisease);
    void deletePropertyDisease (Long id);
}
