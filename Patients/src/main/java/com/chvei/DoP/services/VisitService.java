package com.chvei.DoP.services;

import com.chvei.DoP.entity.Visit;

import java.util.List;

public interface VisitService {
    List<Visit> getVisitsByPatientId(Long id);
    Visit getVisitById (Long id);
    List<Visit> getAllVisits();
    Visit saveVisit (Visit visit);
    Visit updateVisit (Visit visit);
    void deleteVisit (Long id);
}
