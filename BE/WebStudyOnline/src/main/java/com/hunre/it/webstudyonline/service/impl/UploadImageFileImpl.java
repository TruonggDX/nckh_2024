package com.hunre.it.webstudyonline.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.EagerTransformation;
import com.cloudinary.utils.ObjectUtils;
import com.hunre.it.webstudyonline.model.dto.ImageDto;
import com.hunre.it.webstudyonline.service.UploadImageFile;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class UploadImageFileImpl implements UploadImageFile {
    @Autowired
    private Cloudinary cloudinary;


    @Override
    public ImageDto uploadImage(MultipartFile file) throws IOException {
        assert file.getOriginalFilename() != null;
        String publicValue = generatePublicValue(file.getOriginalFilename());
        String extension = getFileName(file.getOriginalFilename())[1];
        File fileUpload = convert(file);
        var uploadResult = cloudinary.uploader().upload(fileUpload, ObjectUtils.asMap("public_id", publicValue));
        cleanDisk(fileUpload);

        ImageDto imageDTO = new ImageDto();
        imageDTO.setUrl(uploadResult.get("url").toString());
        imageDTO.setPublicId(uploadResult.get("public_id").toString());
        imageDTO.setType(file.getContentType());

        return imageDTO;
    }
    @Override
    public ImageDto uploadvideo(MultipartFile file)  {
        assert file.getOriginalFilename() != null;
        String publicValue = generatePublicValue(file.getOriginalFilename());
        File fileUpload = null;
        try {
            fileUpload = convert(file);
            var uploadResult =  cloudinary.uploader().upload(fileUpload,
                    ObjectUtils.asMap("resource_type", "video",
                            "public_id", publicValue,
                            "eager", Arrays.asList(
                                    new EagerTransformation().width(300).height(300).crop("pad").audioCodec("none"),
                                    new EagerTransformation().width(160).height(100).crop("crop").gravity("south").audioCodec("none")),
                            "eager_async", true,
                            "eager_notification_url", "https://mysite.example.com/notify_endpoint"));

            ImageDto imageDTO = new ImageDto();
            imageDTO.setUrl(uploadResult.get("url").toString());
            imageDTO.setPublicId(uploadResult.get("public_id").toString());
            imageDTO.setType(file.getContentType());
            return imageDTO;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
    @Override
    public void deleteImage(String publicId) {
        try {
            Map<String, String> params = ObjectUtils.asMap("public_id", publicId);
            cloudinary.uploader().destroy(publicId, params);
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi xóa hình ảnh từ Cloudinary", e);
        }
    }
    @Override
    public void deleteVideo(String publicId) {
        try {
            cloudinary.uploader().destroy(publicId,
                    ObjectUtils.asMap("resource_type","video"));
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi xóa hình ảnh từ Cloudinary", e);
        }
    }
    private File convert(MultipartFile file) throws IOException {
        assert file.getOriginalFilename() != null;
        File convFile = new File(StringUtils.join(generatePublicValue(file.getOriginalFilename()), getFileName(file.getOriginalFilename())[1]));
        try (InputStream is = file.getInputStream()) {
            Files.copy(is, convFile.toPath());
        }
        return convFile;
    }

    private void cleanDisk(File file) {
        try {
            Path filePath = file.toPath();
            Files.delete(filePath);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public String generatePublicValue(String originalName) {
        String fileName = getFileName(originalName)[0];
        return StringUtils.join(UUID.randomUUID().toString(), "_", fileName);
    }

    public String[] getFileName(String originalName) {
        return originalName.split("\\.");
    }
}
