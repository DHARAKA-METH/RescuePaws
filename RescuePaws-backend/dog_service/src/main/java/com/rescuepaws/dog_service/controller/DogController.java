package com.rescuepaws.dog_service.controller;

import com.rescuepaws.dog_service.dto.ApiResponse;
import com.rescuepaws.dog_service.dto.DogRequest;
import com.rescuepaws.dog_service.mdel.Dog;
import com.rescuepaws.dog_service.mdel.DogPickup;
import com.rescuepaws.dog_service.service.DogService;
import com.fasterxml.jackson.databind.ObjectMapper;
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
    private final ObjectMapper objectMapper;

    public DogController(DogService dogService) {
        this.dogService = dogService;
        this.objectMapper = new ObjectMapper();
    }

    // ------------------ Report a dog ------------------
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<ApiResponse<Dog>> reportDog(
            HttpServletRequest request,
            @RequestPart("dog") String dogJson,
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) {
        try {
            // Parse JSON
            DogRequest requestDto = objectMapper.readValue(dogJson, DogRequest.class);

            // Get user info from headers
            String userIdHeader = request.getHeader("X-UserId");
            String username = request.getHeader("X-Username");

            if (userIdHeader == null || username == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse<>(false, "Missing user headers from API Gateway", null));
            }

            Long userId = Long.parseLong(userIdHeader);

            // Convert DogRequest → Dog entity
            Dog dog = new Dog();
            dog.setType(requestDto.getType());
            dog.setDescription(requestDto.getDescription());
            dog.setLatitude(requestDto.getLatitude());
            dog.setLongitude(requestDto.getLongitude());

            Dog newDog = dogService.reportDog(dog, images, userId, username);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>(true, "Dog created successfully!", newDog));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, "Failed to create dog: " + e.getMessage(), null));
        }
    }

    // ------------------ Update dog ------------------
    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<ApiResponse<Dog>> updateDog(
            @PathVariable Long id,
            HttpServletRequest request,
            @RequestPart("dog") String dogJson,
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) {
        try {
            DogRequest requestDto = objectMapper.readValue(dogJson, DogRequest.class);

            String userIdHeader = request.getHeader("X-UserId");
            if (userIdHeader == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse<>(false, "Missing user headers from API Gateway", null));
            }
            Long userId = Long.parseLong(userIdHeader);

            Dog updatedDog = dogService.updateDog(id, requestDto, images, userId);

            return ResponseEntity.ok(new ApiResponse<>(true, "Dog updated successfully!", updatedDog));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, "Update failed: " + e.getMessage(), null));
        }
    }

    // ------------------ Get all dogs ------------------
    @GetMapping
    public ResponseEntity<ApiResponse<List<Dog>>> getAllDogs() {
        try {
            List<Dog> dogs = dogService.getAllDogs();
            return ResponseEntity.ok(new ApiResponse<>(true, "Dogs fetched successfully", dogs));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "Something went wrong: " + e.getMessage(), null));
        }
    }

    // ------------------ Get dog by ID ------------------
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Dog>> getDogById(@PathVariable Long id) {
        try {
            Dog dog = dogService.getDogById(id);
            return ResponseEntity.ok(new ApiResponse<>(true, "Dog retrieved successfully!", dog));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, "Failed to get Dog: " + e.getMessage(), null));
        }
    }



    // ------------------ Delete dog ------------------
    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Dog>> updateDogStatus(
            @PathVariable("id") Long dogId,
            @RequestPart("dog") String dogJson,
            HttpServletRequest request
    ) {
        try {
            String userIdHeader = request.getHeader("X-UserId");
            String role = request.getHeader("X-Role");
            DogRequest requestDto = objectMapper.readValue(dogJson, DogRequest.class);

            if (userIdHeader == null || role == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse<>(false, "Missing user headers from API Gateway", null));
            }

            Long userId = Long.parseLong(userIdHeader);

            Dog updatedStatus =dogService.updateDogStatus(dogId, userId, role,requestDto);

            return ResponseEntity.ok(new ApiResponse<>(true, "Dog Status Update successfully", updatedStatus));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "Dog Status Update Failed! " + e.getMessage(), null));
        }
    }





    // ------------------ Delete dog ------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteDog(
            @PathVariable("id") Long dogId,
            HttpServletRequest request
    ) {
        try {
            String userIdHeader = request.getHeader("X-UserId");
            String role = request.getHeader("X-Role");

            if (userIdHeader == null || role == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse<>(false, "Missing user headers from API Gateway", null));
            }

            Long userId = Long.parseLong(userIdHeader);

            dogService.removeDog(dogId, userId, role);

            return ResponseEntity.ok(new ApiResponse<>(true, "Dog deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "Something went wrong Dog deleted Failed! " + e.getMessage(), null));
        }
    }

    // ------------------ Pick up dog ------------------
    @PostMapping("/{id}/pickup")
    public ResponseEntity<ApiResponse<DogPickup>> pickDog(
            @PathVariable("id") Long dogId,
            HttpServletRequest request
    ) {
        try {
            String userIdHeader = request.getHeader("X-UserId");
            String username = request.getHeader("X-Username");

            if (userIdHeader == null || username == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse<>(false, "Missing user headers from API Gateway", null));
            }

            Long userId = Long.parseLong(userIdHeader);

            DogPickup pickup = dogService.pickUpDog(dogId, userId, username);

            return ResponseEntity.ok(new ApiResponse<>(true, "Dog picked successfully", pickup));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, "Pickup failed: " + e.getMessage(), null));
        }
    }
}