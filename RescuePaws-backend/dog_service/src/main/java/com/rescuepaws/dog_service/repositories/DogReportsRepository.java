package com.rescuepaws.dog_service.repositories;

import com.rescuepaws.dog_service.mdel.DogReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DogReportsRepository extends JpaRepository<DogReport,Long> {
    List<DogReport>findByDogId(Long dogId);
    Optional<DogReport>findByDogIdAndUserId(Long dogId, Long userId);
}


