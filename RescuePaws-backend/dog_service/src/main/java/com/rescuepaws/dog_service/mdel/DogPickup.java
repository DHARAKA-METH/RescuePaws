package com.rescuepaws.dog_service.mdel;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
@Entity
@Data
public class DogPickup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String username;

    private LocalDateTime pickedAt;

    @ManyToOne
    @JoinColumn(name = "dog_id")
    private Dog dog;
}
