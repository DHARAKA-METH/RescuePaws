package com.rescuepaws.dog_service.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DogRequest {

    private String type;
    private String description;
    private String place;
    private Double latitude;
    private Double longitude;
    private String status;
    private String age;
    private String gender;


}
