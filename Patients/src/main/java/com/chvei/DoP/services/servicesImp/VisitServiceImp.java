package com.chvei.DoP.services.servicesImp;

import com.chvei.DoP.DTO.VisitDTO;
import com.chvei.DoP.entity.Patient;
import com.chvei.DoP.entity.Visit;
import com.chvei.DoP.exceptions.ResourceNotFoundException;
import com.chvei.DoP.exceptions.UnacceptableActionException;
import com.chvei.DoP.repositories.VisitRepository;
import com.chvei.DoP.services.PatientService;
import com.chvei.DoP.services.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class VisitServiceImp implements VisitService {
    private final Logger logger = Logger.getLogger(VisitServiceImp.class.getName());
    private final Sort descending = Sort.by(Sort.Direction.DESC, "created");
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
    public int getCountByPatientID(Long id) {
        return visitRepository.countAllByPatient_Id(id);
    }

    @Override
    public List<VisitDTO> getFirstTenVisitsByPatientIdDesc(Long id) {
        return visitRepository.findFirst10ByPatient_IdOrderByCreatedDesc(id)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Override
    public List<VisitDTO> getFirstFiveVisitsByPatientIdAsc(Long id) {
        return visitRepository.findFirst5ByPatient_IdOrderByCreatedAsc(id)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Override
    public List<VisitDTO> getVisitsByPatientId(Long id) {
        return visitRepository.findByPatient_Id(id, descending)
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
    public VisitDTO getVisitByPatientIdByRegistration(Long id) {
        return toDTO(visitRepository.findByPatient_idByCreated(id));
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
        if (visitRepository.existsByCreatedAndPatient_Id(visitDTO.getCreated(), visitDTO.getPatientId())) {
            throw new UnacceptableActionException("На дату " + visitDTO.getCreated().toString() + " визит уже существует");
        }
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
        logger.log(Level.INFO, "Visit to " + patient.getLastName() + " " + visit2.getCreated() + " update");
        return toDTO(visit2);
    }

    @Override
    public boolean deleteVisit(Long id) {
        Visit visit = visitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Visit with id " + id + " not found"));
        if (visit.isRegistration()) {
            throw new UnacceptableActionException("The visit cannot be deleted because he is responsible for registering the patient");
        }
        Patient patient = patientService.getPatientById(visit.getPatient().getId());
        patient.removeVisit(visit);
        visitRepository.deleteById(id);
        boolean delete = visitRepository.existsById(id);
        if (!delete) {
            logger.log(Level.INFO, "Visit to " + patient.getLastName() + " " + visit.getCreated() + " delete");
        }
        return delete;
    }

    public VisitDTO toDTO(Visit visit) {
        VisitDTO visitDTO = new VisitDTO();
        visitDTO.setId(visit.getId());
        visitDTO.setText(visit.getText());
        visitDTO.setPatientId(visit.getPatient().getId());
        visitDTO.setCreated(visit.getCreated());
        visitDTO.setRegistration(visit.isRegistration());
        return visitDTO;
    }

    public Visit toEntity(VisitDTO visitDTO) {
        Visit visit = new Visit();
        visit.setId(visitDTO.getId());
        visit.setCreated(visitDTO.getCreated());
        visit.setText(visitDTO.getText());
        visit.setPatient(patientService.getPatientById(visitDTO.getPatientId()));
        visit.setRegistration(visitDTO.isRegistration());
        return visit;
    }
}
