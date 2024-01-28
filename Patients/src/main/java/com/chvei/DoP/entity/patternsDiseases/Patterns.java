package com.chvei.DoP.entity.patternsDiseases;

import java.util.ArrayList;
import java.util.List;

public class Patterns {
    private List<MainDisease> main = new ArrayList<>();
    private List<PropertyDisease> properties = new ArrayList<>();
    private List<ComplicationDisease> complications =new ArrayList<>();

    public List<MainDisease> getMain() {
        return main;
    }

    public void setMain(List<MainDisease> main) {
        this.main = main;
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
                "main=" + main +
                ", properties=" + properties +
                ", complications=" + complications +
                '}';
    }
}
