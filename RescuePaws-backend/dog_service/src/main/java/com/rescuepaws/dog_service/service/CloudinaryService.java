package com.rescuepaws.dog_service.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {
    private final Cloudinary cloudinary;

    private CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadImage(MultipartFile file) {
        try {
            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.emptyMap()

            );
            return uploadResult.get("secure_url").toString();
        } catch (IOException e) {
            throw new RuntimeException("Image upload failed", e);

        }
    }


    // delete umage by public id

    public void deleteImage(String publicId)throws Exception {
        cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }

    // Helper to extract public ID from URL
     public String extractPublicId(String imageUrl) {
         // Example: https://res.cloudinary.com/demo/image/upload/v1234567890/sample.jpg
         // Returns: sample
         String[] parts = imageUrl.split("/");
         String filename = parts[parts.length - 1];
         return filename.substring(0, filename.lastIndexOf('.'));

     }

}
