package com.chvei.DoP.services;

import com.chvei.DoP.DTO.VisitDTO;

import java.util.List;

public interface VisitService {
    int getCountByPatientID(Long id);
    List<VisitDTO> getFirstTenVisitsByPatientIdDesc(Long id);
    List<VisitDTO> getFirstFiveVisitsByPatientIdAsc(Long id);
    List<VisitDTO> getVisitsByPatientId(Long id);
    VisitDTO getVisitById (Long id);
    List<VisitDTO> getAllVisits();
    VisitDTO saveVisit (VisitDTO visitDTO);
    VisitDTO updateVisit (VisitDTO visitDTO);
    boolean deleteVisit (Long id);
}
