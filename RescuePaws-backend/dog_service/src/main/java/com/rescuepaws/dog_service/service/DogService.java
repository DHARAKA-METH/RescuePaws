package com.rescuepaws.dog_service.service;

import com.rescuepaws.dog_service.dto.DogRequest;
import com.rescuepaws.dog_service.exception.ExceptionHandle;
import com.rescuepaws.dog_service.exception.ResourceNotFoundException;
import com.rescuepaws.dog_service.mdel.Dog;
import com.rescuepaws.dog_service.mdel.DogImage;
import com.rescuepaws.dog_service.mdel.DogPickup;
import com.rescuepaws.dog_service.mdel.DogReport;
import com.rescuepaws.dog_service.repositories.DogImagesRepository;
import com.rescuepaws.dog_service.repositories.DogPickupRepository;
import com.rescuepaws.dog_service.repositories.DogReportsRepository;
import com.rescuepaws.dog_service.repositories.DogRepository;
import jakarta.persistence.Entity;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class DogService {

    private final DogRepository dogRepository;
    private final DogImagesRepository dogImagesRepository;
    private final DogReportsRepository dogReportsRepository;
    private final CloudinaryService cloudinaryService;
    private final DogPickupRepository dogPickupRepository;

    public DogService(
            DogRepository dogRepository,
            DogImagesRepository dogImagesRepository,
            DogReportsRepository dogReportsRepository,
            CloudinaryService cloudinaryService,
            DogPickupRepository dogPickupRepository) {
        this.dogRepository = dogRepository;
        this.dogImagesRepository = dogImagesRepository;
        this.dogReportsRepository = dogReportsRepository;
        this.cloudinaryService = cloudinaryService;
        this.dogPickupRepository = dogPickupRepository;
    }

    @Transactional
    public Dog reportDog(Dog dog, List<MultipartFile> images, Long userId, String reporterName) {

        try {

            dog.setStatus("REPORTED");

            Dog savedDog = dogRepository.save(dog);

            List<DogImage> dogImages = new ArrayList<>();

            if (images != null && !images.isEmpty()) {

                for (MultipartFile file : images) {

                    if (file.isEmpty()) {
                        continue;
                    }

                    try {

                        String imageUrl = cloudinaryService.uploadImage(file);

                        DogImage image = new DogImage();
                        image.setImageUrl(imageUrl);
                        image.setDog(savedDog);

                        dogImagesRepository.save(image);
                        dogImages.add(image);

                    } catch (Exception e) {

                        throw new ExceptionHandle("Image upload failed: " + file.getOriginalFilename());
                    }
                }
            }

            savedDog.setImages(dogImages);

            DogReport report = new DogReport();
            report.setDog(savedDog);
            report.setUserId(userId);
            report.setReporterName(reporterName);

            dogReportsRepository.save(report);
            List<DogReport> reports = new ArrayList<>();
            reports.add(report);
            savedDog.setReports(reports);


            return savedDog;

        } catch (Exception e) {

            throw new ExceptionHandle("Failed to report dog: " + e.getMessage());
        }
    }

    @Transactional
    public DogPickup pickUpDog(Long dogId, Long userId, String username) {

        Dog dog = dogRepository.findById(dogId)
                .orElseThrow(() -> new ResourceNotFoundException("Dog not found"));

        // Check if already picked
        if (dogPickupRepository.findByDogId(dogId).isPresent()) {
            throw new ExceptionHandle("Dog already picked");
        }

        dog.setStatus("RESCUED");
        dogRepository.save(dog);

        DogPickup pickup = new DogPickup();
        pickup.setDog(dog);
        pickup.setUserId(userId);
        pickup.setUsername(username);
        pickup.setPickedAt(LocalDateTime.now());

        return dogPickupRepository.save(pickup);

    }


    @Transactional
    public Dog updateDog(Long dogId, DogRequest request,
                         List<MultipartFile> images,
                         Long userId) {

        Dog dog = dogRepository.findById(dogId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Dog not found"));

        // Check if user is reporter
        DogReport report = dogReportsRepository.findByDogIdAndUserId(dogId, userId)
                .orElseThrow(() ->
                        new ExceptionHandle("You can update only your report"));

        // Update fields
        dog.setType(request.getType());
        dog.setDescription(request.getDescription());
        dog.setLatitude(request.getLatitude());
        dog.setLongitude(request.getLongitude());

        Dog updatedDog = dogRepository.save(dog);

        // Upload new images if provided
        if (images != null && !images.isEmpty()) {

            List<DogImage> dogImages = new ArrayList<>();

            for (MultipartFile file : images) {

                if (file.isEmpty()) continue;

                try {

                    String imageUrl = cloudinaryService.uploadImage(file);

                    DogImage image = new DogImage();
                    image.setDog(updatedDog);
                    image.setImageUrl(imageUrl);

                    dogImagesRepository.save(image);
                    dogImages.add(image);

                } catch (Exception e) {

                    throw new ExceptionHandle("Image upload failed: " + file.getOriginalFilename());
                }
            }

            updatedDog.getImages().addAll(dogImages);
        }

        return updatedDog;
    }


    public List<Dog> getAllDogs() {

        try {

            return dogRepository.findAll();

        } catch (Exception e) {

            throw new ExceptionHandle("Something went wrong" + e.getMessage());
        }
    }


    @Transactional
    public Dog getDogById(Long id) {

        return dogRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Dog not found with id: " + id));
    }


    public void removeDog(Long dogId) {
        try {
            Dog dog = dogRepository.findById(dogId)
                    .orElseThrow(() -> new ResourceNotFoundException("Dog not found with id: " + dogId));


            // Delete all images from Cloudinary and database
            List<DogImage> images = dogImagesRepository.findByDogId(dogId);
            if (images != null && !images.isEmpty()) {
                for (DogImage image : images) {
                    try {
                        String publicId = cloudinaryService.extractPublicId(image.getImageUrl());
                        cloudinaryService.deleteImage(publicId);
                    } catch (Exception e) {
                        System.out.println("Failed to delete image from Cloudinary: " + image.getImageUrl());
                    }
                }
                dogImagesRepository.deleteAll(images);
            }

            // Delete all reports
            List<DogReport> reports = dogReportsRepository.findByDogId(dogId);
            if (reports != null && !reports.isEmpty()) {
                dogReportsRepository.deleteAll(reports);
            }

            // delete dog
            dogRepository.delete(dog);

        } catch (Exception e) {
            throw new ExceptionHandle("Failed to delete dog with id : " + dogId + e.getMessage());
        }
    }

    public boolean isReportedByUser(Long dogId, Long userId) {
        List<DogReport> reports = dogReportsRepository.findByDogId(dogId);
        for (DogReport report : reports) {
            if (report.getUserId().equals(userId)) {
                return true;
            }
        }
        return false;
    }

}