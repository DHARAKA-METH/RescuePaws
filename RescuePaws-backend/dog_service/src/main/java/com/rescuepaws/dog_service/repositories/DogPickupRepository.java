package com.rescuepaws.dog_service.repositories;

import com.rescuepaws.dog_service.mdel.DogPickup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DogPickupRepository extends JpaRepository<DogPickup,Long> {

    boolean existsByDog_Id(Long dogId);
    void deleteByDogId(Long dogId);

}
