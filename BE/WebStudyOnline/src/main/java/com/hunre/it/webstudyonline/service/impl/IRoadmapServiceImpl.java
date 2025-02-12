package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.*;
import com.hunre.it.webstudyonline.mapper.CourseMapper;
import com.hunre.it.webstudyonline.mapper.RoadmapMapper;
import com.hunre.it.webstudyonline.model.dto.*;
import com.hunre.it.webstudyonline.model.request.AddRoadmapForm;
import com.hunre.it.webstudyonline.model.request.UpdateRoadmapForm;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.repository.CourseRepository;
import com.hunre.it.webstudyonline.repository.ImageRepository;
import com.hunre.it.webstudyonline.repository.RoadmapRepository;
import com.hunre.it.webstudyonline.service.IRoadmapService;
import com.hunre.it.webstudyonline.service.UploadImageFile;
import com.hunre.it.webstudyonline.utils.Constant;
import com.hunre.it.webstudyonline.utils.LongUtils;
import com.hunre.it.webstudyonline.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class IRoadmapServiceImpl implements IRoadmapService {
    @Autowired
    private RoadmapRepository roadmapRepository;
    @Autowired
    private RoadmapMapper roadmapMapper;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private CourseMapper courseMapper;


    @Override
    public BaseResponse<RoadmapDto> addRoadmap(AddRoadmapForm addRoadmapForm) {
        BaseResponse<RoadmapDto> response = new BaseResponse<>();
        RoadmapEntity roadmapEntity = roadmapMapper.toEntity(addRoadmapForm);
        roadmapEntity.setDeleted(false);
        for (Long courseId : addRoadmapForm.getIdCourses()){
            CourseEntity courseEntity = courseRepository.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));
            roadmapEntity.getCourse().add(courseEntity);
        }
        RoadmapEntity roadmapEntitySaved = roadmapRepository.save(roadmapEntity);
        response.setData(roadmapMapper.toDto(roadmapEntitySaved));
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public ResponsePage<List<RoadmapDto>> getRoadmap(Pageable pageable) {
        ResponsePage<List<RoadmapDto>> responsePage = new ResponsePage<>();
        Page<RoadmapEntity> page = roadmapRepository.findAllByDeleted(pageable);
        System.out.println(page.getContent());
        List<RoadmapDto> roadmapDtos = page.getContent().stream().map(roadmapMapper::toDto).collect(Collectors.toList());
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(roadmapDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<RoadmapDto> updateRoadmap(String id, UpdateRoadmapForm updateRoadmapForm) {
        BaseResponse<RoadmapDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT()== null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long AccountId = utils.getT();
        Optional<RoadmapEntity> check = roadmapRepository.findById(AccountId);
        if (check.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        RoadmapEntity roadmapEntity = check.get();
        roadmapMapper.toEntity(roadmapEntity,updateRoadmapForm);
        Set<CourseEntity> courseEntities = new HashSet<>();
        for (Long courseId : updateRoadmapForm.getIdCourses()){
            CourseEntity courseEntity = courseRepository.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));
            courseEntities.add(courseEntity);
        }
        roadmapEntity.setCourse(courseEntities);
        RoadmapEntity roadmapEntityUpdated = roadmapRepository.save(roadmapEntity);
        response.setData(roadmapMapper.toDto(roadmapEntityUpdated));
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public BaseResponse<RoadmapDto> deleteRoadmap(String id) {
        BaseResponse<RoadmapDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT()== null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long AccountId = utils.getT();
        Optional<RoadmapEntity> check = roadmapRepository.findById(AccountId);
        if (check.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        RoadmapEntity roadmapEntity = check.get();
        roadmapEntity.setDeleted(true);
        roadmapRepository.save(roadmapEntity);
        response.setData(roadmapMapper.toDto(roadmapEntity));
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

}
