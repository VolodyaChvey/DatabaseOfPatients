package com.chvei.DoP.DTO;

import com.chvei.DoP.entity.patternsDiseases.ComplicationDisease;
import com.chvei.DoP.entity.patternsDiseases.MainDisease;
import com.chvei.DoP.entity.patternsDiseases.PropertyDisease;

import java.util.ArrayList;
import java.util.List;

public class Patterns {
    private List<MainDisease> mainDisease = new ArrayList<>();
    private List<PropertyDisease> properties = new ArrayList<>();
    private List<ComplicationDisease> complications =new ArrayList<>();

    public List<MainDisease> getMainDisease() {
        return mainDisease;
    }

    public void setMainDisease(List<MainDisease> mainDisease) {
        this.mainDisease = mainDisease;
    }

    public List<PropertyDisease> getProperties() {
        return properties;
    }

    public void setProperties(List<PropertyDisease> properties) {
        this.properties = properties;
    }

    public List<ComplicationDisease> getComplications() {
        return complications;
    }

    public void setComplications(List<ComplicationDisease> complications) {
        this.complications = complications;
    }

    @Override
    public String toString() {
        return "Patterns{" +
                "mainDisease=" + mainDisease +
                ", properties=" + properties +
                ", complications=" + complications +
                '}';
    }
}
