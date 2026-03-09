package com.rescuepaws.dog_service.controller;

import com.rescuepaws.dog_service.dto.ApiResponse;
import com.rescuepaws.dog_service.dto.DogRequest;
import com.rescuepaws.dog_service.mdel.Dog;
import com.rescuepaws.dog_service.service.DogService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/dogs")
public class DogController {

    private final DogService dogService;

    public DogController(DogService dogService) {
        this.dogService = dogService;
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<ApiResponse<Dog>> reportDog(
            HttpServletRequest requestHeader,
            @RequestPart("dog") String dogJson, // JSON as string
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) {

       try{
           // Convert JSON string to DogRequest object
           DogRequest request = new com.fasterxml.jackson.databind.ObjectMapper().readValue(dogJson, DogRequest.class);

           Long userId = Long.valueOf(requestHeader.getAttribute("userId").toString());
           String username = (String) requestHeader.getAttribute("username");

           System.out.println("User images"+ images);
           System.out.println("Dog Request: " + request);

           // Convert DogRequest → Dog
           Dog dog = new Dog();
           dog.setType(request.getType());
           dog.setDescription(request.getDescription());
           dog.setLatitude(request.getLatitude());
           dog.setLongitude(request.getLongitude());


          Dog newDog = dogService.reportDog(dog,images,userId,username);


           ApiResponse<Dog> response = new ApiResponse<>(true, "Dog created successfully!", newDog);
           return new ResponseEntity<>(response, HttpStatus.CREATED);
       }catch (Exception e){
           e.printStackTrace();
           ApiResponse<Dog> response = new ApiResponse<>(false, "Failed to create dog: " + e.getMessage(), null);
           return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
       }
    }


}