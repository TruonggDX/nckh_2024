package com.hunre.it.webstudyonline.controller.api;

import com.hunre.it.webstudyonline.model.dto.ImageDto;
import com.hunre.it.webstudyonline.service.UploadImageFile;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
public class ApiUploadFile {

    @Autowired
    private UploadImageFile uploadImageFile;

    @PostMapping("/image")
    public ImageDto uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        return uploadImageFile.uploadImage(file);
    }
}
