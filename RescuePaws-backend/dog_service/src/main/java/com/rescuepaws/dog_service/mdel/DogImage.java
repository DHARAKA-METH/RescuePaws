package com.rescuepaws.dog_service.mdel;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "dog_images")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DogImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "dog_id")
    @JsonBackReference
    private Dog dog;
}