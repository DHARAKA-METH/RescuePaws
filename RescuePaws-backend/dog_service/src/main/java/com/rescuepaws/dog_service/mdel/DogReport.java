package com.rescuepaws.dog_service.mdel;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "dog_reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DogReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;  // from JWT token
    private String reporterName;

    @ManyToOne
    @JoinColumn(name = "dog_id")
    @JsonBackReference
    private Dog dog;
}