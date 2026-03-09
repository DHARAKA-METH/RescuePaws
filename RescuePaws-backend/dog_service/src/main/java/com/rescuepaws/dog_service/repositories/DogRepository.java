package com.rescuepaws.dog_service.repositories;

import com.rescuepaws.dog_service.mdel.Dog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DogRepository extends JpaRepository<Dog,Long> {
}
