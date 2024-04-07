package com.chvei.DoP.repositories;

import com.chvei.DoP.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    List<Patient> findByRegistrationIsNotNull();
    List<Patient> findAllByVisits_createdBetween(LocalDate dateStart,LocalDate dateEnd);
    @Query("select p from Patient p where p.registration = :registration")
    List<Patient> findAllWithRegistrationBefore(@Param("registration") LocalDate registration);

}
