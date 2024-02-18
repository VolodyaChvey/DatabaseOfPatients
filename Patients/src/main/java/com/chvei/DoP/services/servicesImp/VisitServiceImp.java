package com.chvei.DoP.services.servicesImp;

import com.chvei.DoP.entity.Patient;
import com.chvei.DoP.entity.Visit;
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
    private final Logger logger = Logger.getLogger(PatientServiceImp.class.getName());
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
    public Visit getVisitById(Long id) {
        return visitRepository.findById(id).orElseThrow();
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
        logger.log(Level.INFO,"Visit to "+patient.getLastName()+" " +visit1.getDate()+ " saved");
        return visit1;
    }

    @Override
    public Visit updateVisit(Visit visit) {
        return null;
    }

    @Override
    public void deleteVisit(Long id) {

    }
}
