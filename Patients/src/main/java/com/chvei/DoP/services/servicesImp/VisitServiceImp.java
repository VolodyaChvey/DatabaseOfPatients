package com.chvei.DoP.services.servicesImp;

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
    public List<Visit> getVisitsByPatientId(Long id) {
        return visitRepository.findByPatient_Id(id);
    }

    @Override
    public Visit getVisitById(Long id) {
        return visitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Visit with id " + id + " not found"));
    }

    @Override
    public List<Visit> getAllVisits() {
        return visitRepository.findAll();
    }

    @Override
    public Visit saveVisit(Visit visit) {
        Patient patient = patientService.getPatientById(visit.getPatient().getId());
        Visit visit1 = visitRepository.save(visit);
        patient.addVisit(visit1);
        logger.log(Level.INFO, "Visit to " + patient.getLastName() + " " + visit1.getDate() + " saved");
        return visit1;
    }

    @Override
    public Visit updateVisit(Visit visit) {
        Patient patient = patientService.getPatientById(visit.getPatient().getId());
        Visit visit1 = getVisitById(visit.getId());
        patient.removeVisit(visit1);
        Visit visit2 = visitRepository.save(visit);
        patient.addVisit(visit2);
        logger.log(Level.INFO, "Visit to " + patient.getLastName() + " " + visit1.getDate() + " update");
        return visit2;
    }

    @Override
    public void deleteVisit(Long id) {
        Visit visit = getVisitById(id);
        Patient patient = patientService.getPatientById(visit.getPatient().getId());
        patient.removeVisit(visit);
        visitRepository.deleteById(id);
        logger.log(Level.INFO, "Visit to " + patient.getLastName() + " " + visit.getDate() + " delete");
    }
}
