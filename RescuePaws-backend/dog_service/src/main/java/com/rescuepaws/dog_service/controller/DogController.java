package com.rescuepaws.dog_service.controller;

import com.rescuepaws.dog_service.dto.ApiResponse;
import com.rescuepaws.dog_service.dto.DogRequest;
import com.rescuepaws.dog_service.mdel.Dog;
import com.rescuepaws.dog_service.mdel.DogPickup;
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

        try {
            // Convert JSON string to DogRequest object
            DogRequest request = new com.fasterxml.jackson.databind.ObjectMapper().readValue(dogJson, DogRequest.class);

            Long userId = Long.valueOf(requestHeader.getAttribute("userId").toString());
            String username = (String) requestHeader.getAttribute("username");

//            System.out.println("User images" + images);
//            System.out.println("Dog Request: " + request);

            // Convert DogRequest → Dog
            Dog dog = new Dog();
            dog.setType(request.getType());
            dog.setDescription(request.getDescription());
            dog.setLatitude(request.getLatitude());
            dog.setLongitude(request.getLongitude());


            Dog newDog = dogService.reportDog(dog, images, userId, username);


            ApiResponse<Dog> response = new ApiResponse<>(true, "Dog created successfully!", newDog);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            ApiResponse<Dog> response = new ApiResponse<>(false, "Failed to create dog: " + e.getMessage(), null);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }


    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<ApiResponse<Dog>> updateDog(
            @PathVariable Long id,
            HttpServletRequest requestHeader,
            @RequestPart("dog") String dogJson,
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) {

        try {

            DogRequest request =
                    new com.fasterxml.jackson.databind.ObjectMapper()
                            .readValue(dogJson, DogRequest.class);

            Long userId = Long.valueOf(requestHeader.getAttribute("userId").toString());

            Dog updatedDog = dogService.updateDog(id, request, images, userId);

            ApiResponse<Dog> response =
                    new ApiResponse<>(true, "Dog updated successfully!", updatedDog);

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {

            ApiResponse<Dog> response =
                    new ApiResponse<>(false, "Update failed: " + e.getMessage(), null);

            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping
    public ResponseEntity<ApiResponse<List<Dog>>> getAllDogs() {

        try {

            List<Dog> dogs = dogService.getAllDogs();

            ApiResponse<List<Dog>> response =
                    new ApiResponse<>(true, "Dogs fetched successfully", dogs);

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {

            ApiResponse<List<Dog>> response =
                    new ApiResponse<>(false, "Something went wrong: " + e.getMessage(), null);

            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Dog>> getDogById(@PathVariable Long id) {
        try {

            Dog dog = dogService.getDogById(id);
            ApiResponse<Dog> response = new ApiResponse<>(true, "Dog retrieved successfully!", dog);

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            ApiResponse<Dog> response = new ApiResponse<>(false, "Failed to get Dog: " + e.getMessage(), null);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteDog(
            @PathVariable Long id,
            HttpServletRequest request
    ) {

        try {

            Long userId = Long.valueOf(request.getAttribute("userId").toString());

            Dog dog = dogService.getDogById(id);

            // Check if logged user reported this dog
            if (!dogService.isReportedByUser(id, userId)) {

                ApiResponse<String> response =
                        new ApiResponse<>(false, "You can delete only your own report", null);

                return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
            }

            // Delete dog
            dogService.removeDog(id);

            ApiResponse<String> response =
                    new ApiResponse<>(true, "Dog deleted successfully", null);

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {

            ApiResponse<String> response =
                    new ApiResponse<>(false, "Something went wrong! " + e.getMessage(), null);

            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{id}/pickup")
    public ResponseEntity<ApiResponse<DogPickup>> pickDog(
            @PathVariable("id") Long dogId,
            HttpServletRequest request

    ) {
        try {
            Long userId = Long.valueOf(request.getAttribute("userId").toString());
            String username = request.getAttribute("username").toString();

            DogPickup pickup = dogService.pickUpDog(dogId, userId, username);

            ApiResponse<DogPickup> response = new ApiResponse<>(true, "Dog picked successfully", pickup);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false,
                            "Pickup failed: " + e.getMessage(),
                            null));


        }


    }


}