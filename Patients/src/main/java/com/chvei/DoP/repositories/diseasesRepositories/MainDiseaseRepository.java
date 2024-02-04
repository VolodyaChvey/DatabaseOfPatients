package com.chvei.DoP.repositories.diseasesRepositories;

import com.chvei.DoP.entity.patternsDiseases.MainDisease;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MainDiseaseRepository extends JpaRepository<MainDisease,Long> {

}
