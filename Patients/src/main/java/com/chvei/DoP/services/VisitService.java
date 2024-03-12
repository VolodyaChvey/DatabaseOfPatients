package com.chvei.DoP.services;

import com.chvei.DoP.DTO.VisitDTO;
import com.chvei.DoP.entity.Visit;

import java.util.List;

public interface VisitService {
    List<VisitDTO> getVisitsByPatientId(Long id);
    VisitDTO getVisitById (Long id);
    List<VisitDTO> getAllVisits();
    VisitDTO saveVisit (VisitDTO visitDTO);
    VisitDTO updateVisit (VisitDTO visitDTO);
    void deleteVisit (Long id);
}
