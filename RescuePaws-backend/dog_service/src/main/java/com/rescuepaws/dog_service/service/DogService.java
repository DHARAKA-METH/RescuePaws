package com.rescuepaws.dog_service.service;

import com.rescuepaws.dog_service.exception.ExceptionHandle;
import com.rescuepaws.dog_service.exception.ResourceNotFoundException;
import com.rescuepaws.dog_service.mdel.Dog;
import com.rescuepaws.dog_service.mdel.DogImage;
import com.rescuepaws.dog_service.mdel.DogReport;
import com.rescuepaws.dog_service.repositories.DogImagesRepository;
import com.rescuepaws.dog_service.repositories.DogReportsRepository;
import com.rescuepaws.dog_service.repositories.DogRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
public class DogService {

    private final DogRepository dogRepository;
    private final DogImagesRepository dogImagesRepository;
    private final DogReportsRepository dogReportsRepository;
    private final CloudinaryService cloudinaryService;

    public DogService(
            DogRepository dogRepository,
            DogImagesRepository dogImagesRepository,
            DogReportsRepository dogReportsRepository,
            CloudinaryService cloudinaryService
    ) {
        this.dogRepository = dogRepository;
        this.dogImagesRepository = dogImagesRepository;
        this.dogReportsRepository = dogReportsRepository;
        this.cloudinaryService = cloudinaryService;
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


    public List<Dog> getAllDogs() {

        try {

            return dogRepository.findAll();

        } catch (Exception e) {

            throw new ExceptionHandle("Something went wrong" + e.getMessage());
        }
    }


    public Dog getDogById(Long id) {

        return dogRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Dog not found with id: " + id));
    }

}