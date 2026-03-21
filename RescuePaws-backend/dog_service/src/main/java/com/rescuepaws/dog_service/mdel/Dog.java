package com.rescuepaws.dog_service.mdel;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "dogs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Dog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private String description;
    private String place;
    private Double latitude;
    private Double longitude;
    private String status; // e.g., REPORTED, RESCUED, PICKED_UP
    @Column(nullable = false, updatable = false)
    private LocalDateTime created_at;
//    @Column(nullable = false)
//    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        created_at = LocalDateTime.now();
       // updatedAt = LocalDateTime.now();
    }

//    @PreUpdate
//    public void onUpdate() {
//        updatedAt = LocalDateTime.now();
//    }

    @OneToMany(mappedBy = "dog", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<DogImage> images;

    @OneToMany(mappedBy = "dog", cascade = CascadeType.ALL)
    private List<DogReport> reports;
}