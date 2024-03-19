package com.chvei.DoP.repositories;

import com.chvei.DoP.entity.Visit;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface VisitRepository extends JpaRepository<Visit, Long> {
    List<Visit> findByPatient_Id(Long id, Sort sort);

    List<Visit> findFirst10ByPatient_IdOrderByCreatedDesc(Long id);

    int countAllByPatient_Id(Long id);

    Visit findByCreated(LocalDate localDate);

    boolean existsByCreated(LocalDate localDate);

    boolean existsByCreatedAndPatient_Id(LocalDate localDate, Long id);

    List<Visit> findByPatient_IdAndCreatedBetween(Long id, LocalDate start, LocalDate end, Sort sort);
}
