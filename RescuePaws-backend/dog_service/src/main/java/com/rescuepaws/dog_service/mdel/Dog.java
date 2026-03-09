package com.rescuepaws.dog_service.mdel;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

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

    @OneToMany(mappedBy = "dog", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<DogImage> images;

    @OneToMany(mappedBy = "dog", cascade = CascadeType.ALL)
    private List<DogReport> reports;
}