package com.rescuepaws.dog_service.repositories;

import com.rescuepaws.dog_service.mdel.DogImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DogImagesRepository extends JpaRepository<DogImage,Long> {
    List<DogImage> findByDogId(Long dogId);
}
