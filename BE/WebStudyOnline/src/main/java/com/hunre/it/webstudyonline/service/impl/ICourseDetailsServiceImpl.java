package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.CourseDetailsEntity;
import com.hunre.it.webstudyonline.entity.CourseEntity;
import com.hunre.it.webstudyonline.mapper.CourseDetailsMapper;
import com.hunre.it.webstudyonline.model.dto.CourseDetailsDto;
import com.hunre.it.webstudyonline.model.dto.ImageDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.repository.CourseDetailsRepository;
import com.hunre.it.webstudyonline.repository.CourseRepository;
import com.hunre.it.webstudyonline.repository.ImageRepository;
import com.hunre.it.webstudyonline.service.ICourseDetailsService;
import com.hunre.it.webstudyonline.service.UploadImageFile;
import com.hunre.it.webstudyonline.utils.Constant;
import com.hunre.it.webstudyonline.utils.LongUtils;
import com.hunre.it.webstudyonline.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class ICourseDetailsServiceImpl implements ICourseDetailsService {
    @Autowired
    private CourseDetailsRepository courseDetailsRepository;
    @Autowired
    private CourseDetailsMapper courseDetailsMapper;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private UploadImageFile uploadImageFile;
    @Autowired
    private ImageRepository imageRepository;
    @Override
    public BaseResponse<List<CourseDetailsDto>> getAll(String courseIds) {
        BaseResponse<List<CourseDetailsDto>> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(courseIds);
        if (utils.getT()== null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long courseId = utils.getT();
        List<CourseDetailsEntity> list = courseDetailsRepository.findByCourseId(courseId);
        List<CourseDetailsDto> dtos = list.stream().map(courseDetailsEntity -> {
            CourseDetailsDto dto = courseDetailsMapper.toDto(courseDetailsEntity);
            dto.setCourseId(courseId);
            return dto;
        }).toList();
        response.setData(dtos);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }
    @Override
    public BaseResponse<CourseDetailsDto> addCourseDetails(CourseDetailsDto courseDetailsDto, MultipartFile file) {
        BaseResponse<CourseDetailsDto> response = new BaseResponse<>();
        CourseDetailsEntity courseDetailsEntity = courseDetailsMapper.toEntity(courseDetailsDto);
        Optional<CourseEntity> courseEntity = courseRepository.findById(courseDetailsDto.getCourseId());
        if (courseEntity.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        ImageDto imageDto = addVideo(file);
        courseDetailsEntity.setUrl(imageDto.getUrl());
        courseDetailsEntity.setPublicId(imageDto.getPublicId());
        courseDetailsEntity.setCourseEntity(courseEntity.get());
        courseDetailsEntity.setDeleted(false);
        courseDetailsEntity = courseDetailsRepository.save(courseDetailsEntity);
        CourseDetailsDto dto = courseDetailsMapper.toDto(courseDetailsEntity);
        dto.setCourseId(courseDetailsDto.getCourseId());
        response.setData(dto);
        response.setCode(HttpStatus.CREATED.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public BaseResponse<CourseDetailsDto> updateCourseDetails(String id, CourseDetailsDto courseDetailsDto) {
        BaseResponse<CourseDetailsDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT() == null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long courseDetailsId = utils.getT();
        Optional<CourseDetailsEntity> courseDetailsEntity = courseDetailsRepository.findById(courseDetailsId);
        if (courseDetailsEntity.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        Optional<CourseEntity> courseEntity = courseRepository.findById(courseDetailsDto.getCourseId());
        if (courseEntity.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        CourseDetailsEntity entity = courseDetailsMapper.toEntity(courseDetailsDto);
        entity.setId(courseDetailsId);
        entity.setCourseEntity(courseEntity.get());
        entity.setDeleted(false);
        entity = courseDetailsRepository.save(entity);
        CourseDetailsDto dto = courseDetailsMapper.toDto(entity);
        dto.setCourseId(courseDetailsDto.getCourseId());
        response.setData(dto);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public BaseResponse<CourseDetailsDto> deleteCourseDetails(String id) {
        BaseResponse<CourseDetailsDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT() == null) {
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long courseDetailsId = utils.getT();
        Optional<CourseDetailsEntity> courseDetailsEntity = courseDetailsRepository.findById(courseDetailsId);
        if (courseDetailsEntity.isEmpty()) {
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        CourseDetailsEntity detailsEntity = courseDetailsEntity.get();
        detailsEntity.setDeleted(true);
        courseDetailsRepository.save(detailsEntity);
//        uploadImageFile.deleteImage(detailsEntity.getPublicId());
//        courseDetailsRepository.delete(detailsEntity);
        CourseDetailsDto dto = courseDetailsMapper.toDto(detailsEntity);
        dto.setCourseId(detailsEntity.getCourseEntity().getId());
        response.setData(dto);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;

    }

    @Override
    public BaseResponse<CourseDetailsDto> getCourseDetailsById(String id) {
        BaseResponse<CourseDetailsDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT() == null) {
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long courseDetailsId = utils.getT();
        Optional<CourseDetailsEntity> courseDetailsEntity = courseDetailsRepository.findById(courseDetailsId);
        if (courseDetailsEntity.isEmpty()) {
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        CourseDetailsEntity detailsEntity = courseDetailsEntity.get();
        CourseDetailsDto dto = courseDetailsMapper.toDto(detailsEntity);
        dto.setCourseId(detailsEntity.getCourseEntity().getId());
        response.setData(dto);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }
    @Override
    public BaseResponse<CourseDetailsDto> updateRecord(String id,MultipartFile file) {
        BaseResponse<CourseDetailsDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT() == null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long courseDetailsId = utils.getT();
        Optional<CourseDetailsEntity> check = courseDetailsRepository.findById(courseDetailsId);
        if (check.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        CourseDetailsEntity courseDetailsEntity = check.get();
        String url =  null;
        uploadImageFile.deleteVideo(courseDetailsEntity.getPublicId());
        if (file.getOriginalFilename() != null){
            url = uploadImageFile.uploadvideo(file).getUrl();
        }
        courseDetailsEntity.setUrl(url);
        courseDetailsEntity = courseDetailsRepository.save(courseDetailsEntity);

        CourseDetailsDto dto = courseDetailsMapper.toDto(courseDetailsEntity);
        response.setData(dto);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    private ImageDto addVideo( MultipartFile file) {
        ImageDto imageDTO = uploadImageFile.uploadvideo(file);
        return  imageDTO;
    }
}
