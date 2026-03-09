package com.rescuepaws.dog_service.repositories;

import com.rescuepaws.dog_service.mdel.DogImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DogImagesRepository extends JpaRepository<DogImage,Long> {
}
