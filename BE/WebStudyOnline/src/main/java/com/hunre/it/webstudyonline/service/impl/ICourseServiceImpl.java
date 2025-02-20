package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.CategoryEntity;
import com.hunre.it.webstudyonline.entity.CourseDetailsEntity;
import com.hunre.it.webstudyonline.entity.CourseEntity;
import com.hunre.it.webstudyonline.entity.ImagesEntity;
import com.hunre.it.webstudyonline.mapper.CourseMapper;
import com.hunre.it.webstudyonline.mapper.ImageMapper;
import com.hunre.it.webstudyonline.model.dto.CourseDto;
import com.hunre.it.webstudyonline.model.dto.ImageDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.repository.CategoryRepository;
import com.hunre.it.webstudyonline.repository.CourseDetailsRepository;
import com.hunre.it.webstudyonline.repository.CourseRepository;
import com.hunre.it.webstudyonline.repository.ImageRepository;
import com.hunre.it.webstudyonline.service.ICourseService;
import com.hunre.it.webstudyonline.service.UploadImageFile;
import com.hunre.it.webstudyonline.utils.Constant;
import com.hunre.it.webstudyonline.utils.LongUtils;
import com.hunre.it.webstudyonline.utils.Utils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ICourseServiceImpl implements ICourseService {
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private CourseMapper courseMapper;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private UploadImageFile imageFile;
    @Autowired
    private ImageMapper imageMapper;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private CourseDetailsRepository courseDetailsRepository;

    @Override
    public ResponsePage<List<CourseDto>> getCourses(Pageable pageable) {
        ResponsePage<List<CourseDto>> responsePage = new ResponsePage<>();
        Page<CourseEntity> page = courseRepository.getAll(pageable);
        List<CourseDto> courseDtos = page.getContent().stream().map(courseEntity -> {
            CourseDto courseDto = courseMapper.toDto(courseEntity);
            List<ImagesEntity> images = imageRepository.findByCourseId(courseEntity.getId());
            if (!images.isEmpty()) {
                ImagesEntity image = images.get(0);
                courseDto.setImageUrl(image.getUrl());
            }
            return courseDto;
        }).toList();

        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(courseDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<CourseDto> addCourse(CourseDto courseDto, MultipartFile file) {
        BaseResponse<CourseDto> response = new BaseResponse<>();
        try {
            CourseEntity courseEntity = courseMapper.toEntity(courseDto);
            Optional<CategoryEntity> checkCate = categoryRepository.findById(courseDto.getCategoryId());
            if (checkCate.isEmpty()) {
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setMessage(Constant.HTTP_MESSAGE.FAILED);
                return response;
            }
            courseEntity.setCategoryEntity(checkCate.get());
            courseEntity.setDeleted(false);
            courseEntity = courseRepository.save(courseEntity);
            courseDto.setId(courseEntity.getId());
            if (file != null && !file.isEmpty()) {
                ImageDto imageDto = imageFile.uploadImage(file);
                ImagesEntity imagesEntity = imageMapper.toEntity(imageDto);
                imagesEntity.setCourseEntity(courseEntity);
                imageRepository.save(imagesEntity);
                courseDto.setImageUrl(imagesEntity.getUrl());
            }
            response.setData(courseDto);
            response.setCode(HttpStatus.CREATED.value());
            response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);

        } catch (IOException e) {
            throw new RuntimeException();
        }
        return response;
    }

    @Override
    public BaseResponse<CourseDto> updateCourse(String id, CourseDto courseDto,MultipartFile file) {
        try {
            BaseResponse<CourseDto> response = new BaseResponse<>();
            Utils<Long> utils = LongUtils.strToLong(id);
            if (utils.getT()== null){
                response.setCode(utils.getCode());
                response.setMessage(utils.getMsg());
                return response;
            }
            Long courseId = utils.getT();
            CourseEntity course = courseMapper.toEntity(courseDto);
            Optional<CourseEntity> checkCourse = courseRepository.findById(courseId);
            if (checkCourse.isEmpty()) {
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
                return response;
            }
            Optional<CategoryEntity> checkCate = categoryRepository.findById(courseDto.getCategoryId());
            if (checkCate.isEmpty()) {
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
                return response;
            }
            course.setCategoryEntity(checkCate.get());
            course.setDeleted(false);
            course = courseRepository.save(course);
            courseDto.setId(course.getId());

            if (file != null && !file.isEmpty()) {
                List<ImagesEntity> images = imageRepository.findByCourseId(course.getId());
                if (!images.isEmpty()) {
                    ImagesEntity currentImage = images.get(0);
                    imageFile.deleteImage(currentImage.getPublicId());
                    ImageDto imageDTO = imageFile.uploadImage(file);
                    currentImage.setUrl(imageDTO.getUrl());
                    currentImage.setPublicId(imageDTO.getPublicId());
                    imageRepository.save(currentImage);
                    courseDto.setImageUrl(currentImage.getUrl());
                }
            } else {
                imageRepository.findByCourseId(course.getId()).stream()
                        .findFirst()
                        .ifPresent(image -> {
                            courseDto.setImageUrl(image.getUrl());
                        });
            }
            response.setData(courseDto);
            response.setCode(HttpStatus.OK.value());
            response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
            return response;
        }catch (IOException e){
            throw new RuntimeException();
        }
    }

    @Override
    public BaseResponse<CourseDto> deleteCourse(Long id) {
        BaseResponse<CourseDto> response = new BaseResponse<>();
        Optional<CourseEntity> courseEntity = courseRepository.findById(id);
        if (courseEntity.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        CourseEntity course = courseEntity.get();
        course.setDeleted(true);
        course = courseRepository.save(course);
        List<CourseDetailsEntity> courseDetailsEntities = courseDetailsRepository.findByCourseId(course.getId()).stream().map(courseDetailsEntity -> {
            courseDetailsEntity.setDeleted(true);
            return courseDetailsEntity;
        }).toList();
        courseDetailsRepository.saveAll(courseDetailsEntities);
        CourseDto courseDto = courseMapper.toDto(course);
        List<ImagesEntity> imagesEntity = imageRepository.findByCourseId(id);
        if (imagesEntity.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        courseDto.setImageUrl(imagesEntity.get(0).getUrl());
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(courseDto);
        return response;
    }

    @Override
    public BaseResponse<CourseDto> getCourseById(Long id) {
        BaseResponse<CourseDto> response = new BaseResponse<>();
        Optional<CourseEntity> courseEntity = courseRepository.findById(id);
        if (courseEntity.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        CourseEntity course = courseEntity.get();
        CourseDto courseDto = courseMapper.toDto(course);
        List<ImagesEntity> imagesEntity = imageRepository.findByCourseId(id);
        if (imagesEntity.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        courseDto.setImageUrl(imagesEntity.get(0).getUrl());
        response.setData(courseDto);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }
}
