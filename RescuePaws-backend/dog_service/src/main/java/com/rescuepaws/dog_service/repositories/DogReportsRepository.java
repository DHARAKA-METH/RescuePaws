package com.rescuepaws.dog_service.repositories;

import com.rescuepaws.dog_service.mdel.DogReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DogReportsRepository extends JpaRepository<DogReport,Long> {
    List<DogReport>findByDogId(Long dogId);
}
