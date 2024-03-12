package com.chvei.DoP.services.servicesImp;

import com.chvei.DoP.DTO.VisitDTO;
import com.chvei.DoP.entity.Patient;
import com.chvei.DoP.entity.Visit;
import com.chvei.DoP.exceptions.ResourceNotFoundException;
import com.chvei.DoP.repositories.VisitRepository;
import com.chvei.DoP.services.PatientService;
import com.chvei.DoP.services.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class VisitServiceImp implements VisitService {
    private final Logger logger = Logger.getLogger(VisitServiceImp.class.getName());
    private VisitRepository visitRepository;
    private PatientService patientService;

    public VisitServiceImp() {
    }

    @Autowired
    public VisitServiceImp(VisitRepository visitRepository, PatientService patientService) {
        this.visitRepository = visitRepository;
        this.patientService = patientService;
    }

    @Override
    public List<VisitDTO> getVisitsByPatientId(Long id) {
        return visitRepository.findByPatient_Id(id)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Override
    public VisitDTO getVisitById(Long id) {
        Visit visit = visitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Visit with id " + id + " not found"));
        return toDTO(visit);
    }

    @Override
    public List<VisitDTO> getAllVisits() {
        return visitRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Override
    public VisitDTO saveVisit(VisitDTO visitDTO) {
        Patient patient = patientService.getPatientById(visitDTO.getPatientId());
        Visit visit = visitRepository.save(toEntity(visitDTO));
        patient.addVisit(visit);
        logger.log(Level.INFO, "Visit to " + patient.getLastName() + " " + visit.getCreated() + " saved");
        return toDTO(visit);
    }

    @Override
    public VisitDTO updateVisit(VisitDTO visitDTO) {
        Patient patient = patientService.getPatientById(visitDTO.getPatientId());
        Visit visit1 = visitRepository.findById(visitDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Visit with id " + visitDTO.getId() + " not found"));
        patient.removeVisit(visit1);
        Visit visit2 = visitRepository.save(toEntity(visitDTO));
        patient.addVisit(visit2);
        logger.log(Level.INFO, "Visit to " + patient.getLastName() + " " + visit1.getCreated() + " update");
        return toDTO(visit2);
    }

    @Override
    public void deleteVisit(Long id) {
        Visit visit = visitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Visit with id " + id + " not found"));
        Patient patient = patientService.getPatientById(visit.getPatient().getId());
        patient.removeVisit(visit);
        visitRepository.deleteById(id);
        logger.log(Level.INFO, "Visit to " + patient.getLastName() + " " + visit.getCreated() + " delete");
    }

    public VisitDTO toDTO(Visit visit) {
        VisitDTO visitDTO = new VisitDTO();
        visitDTO.setId(visit.getId());
        visitDTO.setText(visit.getText());
        visitDTO.setPatientId(visit.getPatient().getId());
        visitDTO.setCreated(visit.getCreated());
        return visitDTO;
    }

    public Visit toEntity(VisitDTO visitDTO) {
        Visit visit = new Visit();
        visit.setId(visitDTO.getId());
        visit.setCreated(visitDTO.getCreated());
        visit.setText(visitDTO.getText());
        visit.setPatient(patientService.getPatientById(visitDTO.getPatientId()));
        return visit;
    }
}
