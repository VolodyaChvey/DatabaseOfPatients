package com.chvei.DoP.repositories;

import com.chvei.DoP.entity.Diagnosis;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DiagnosisRepository extends JpaRepository<Diagnosis, Long> {
    Optional<Diagnosis> findByPatient_Id(Long id);
}
