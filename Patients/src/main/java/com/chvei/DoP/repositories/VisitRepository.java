package com.chvei.DoP.repositories;

import com.chvei.DoP.entity.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VisitRepository extends JpaRepository<Visit, Long> {
    List<Visit> findByPatient_Id(Long id);
}
