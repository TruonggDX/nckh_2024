package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.CourseEntity;
import com.hunre.it.webstudyonline.entity.ExamDetailsEntity;
import com.hunre.it.webstudyonline.entity.ExamEntity;
import com.hunre.it.webstudyonline.entity.ImagesEntity;
import com.hunre.it.webstudyonline.mapper.CourseMapper;
import com.hunre.it.webstudyonline.mapper.ExamDetailsMapper;
import com.hunre.it.webstudyonline.mapper.ExamMapper;
import com.hunre.it.webstudyonline.mapper.IExamMapper;
import com.hunre.it.webstudyonline.model.dto.CourseDto;
import com.hunre.it.webstudyonline.model.dto.ExamDto;
import com.hunre.it.webstudyonline.model.dto.auth.AuthDto;
import com.hunre.it.webstudyonline.model.request.ExamResultRequest;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ExamAutoFillResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.repository.BillRepository;
import com.hunre.it.webstudyonline.repository.CourseRepository;
import com.hunre.it.webstudyonline.repository.ExamRepository;
import com.hunre.it.webstudyonline.repository.ImageRepository;
import com.hunre.it.webstudyonline.security.service.JwtService;
import com.hunre.it.webstudyonline.service.IExamService;
import com.hunre.it.webstudyonline.utils.Constant;
import com.hunre.it.webstudyonline.utils.GenerateCode;
import com.hunre.it.webstudyonline.utils.LongUtils;
import com.hunre.it.webstudyonline.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IExamServiceImpl implements IExamService {

  @Autowired
  private ExamRepository exampRepository;
  @Autowired
  private  ExamMapper examMapper;
  @Autowired
  private  JwtService jwtService;
  @Autowired
  private  BillRepository billRepository;
  @Autowired
  private  IExamMapper iExamMapper;
  @Autowired
  private CourseRepository courseRepository;
  @Autowired
  private CourseMapper courseMapper;
  @Autowired
  private ImageRepository imageRepository;
  @Override
  public ResponsePage<List<ExamDto>> getAll(Pageable pageable) {
    ResponsePage<List<ExamDto>> responsePage = new ResponsePage<>();
    AuthDto authDto = jwtService.decodeToken();
    String email = authDto.getEmail();
    boolean check = billRepository.checkBill(email);
    Page<ExamEntity> page = exampRepository.getExams(pageable, check);
    List<ExamDto> examDtos = page.getContent().stream().map(examMapper::toDto).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(examDtos);
    return responsePage;
  }

  @Override
  public BaseResponse<ExamDto> addExam(ExamDto examDto) {
    BaseResponse<ExamDto> response = new BaseResponse<>();
    ExamEntity examEntity = examMapper.toEntity(examDto);
    examEntity.setCode(GenerateCode.generateUniqueCode("EXAM"));
    examEntity.setDeleted(false);
    examEntity = exampRepository.save(examEntity);
    response.setData(examMapper.toDto(examEntity));
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.CREATED.value());
    return response;
  }

  @Override
  public BaseResponse<ExamDto> updateExam(String id, ExamDto examDto) {
    BaseResponse<ExamDto> response = new BaseResponse<>();
    Utils<Long> utils = LongUtils.strToLong(id);
    if (utils.getT() == null) {
      response.setCode(utils.getCode());
      response.setMessage(utils.getMsg());
      return response;
    }
    Long examId = utils.getT();
    ExamEntity examEntity = examMapper.toEntity(examDto);
    Optional<ExamEntity> optionalExam = exampRepository.findById(examId);
    if (optionalExam.isEmpty()) {
      response.setCode(HttpStatus.BAD_REQUEST.value());
      response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
      return response;
    }
    examEntity.setDeleted(false);
    examEntity.setId(examId);
    exampRepository.save(examEntity);
    response.setData(examMapper.toDto(examEntity));
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public BaseResponse<ExamDto> deleteExam(String id) {
    return handleExam(id, true);
  }

  @Override
  public BaseResponse<ExamDto> getExamById(String id) {
    return handleExam(id, false);
  }

  @Override
  public ResponsePage<List<ExamDto>> findByCodeAndName(String name, String code,
      Pageable pageable) {
    ResponsePage<List<ExamDto>> responsePage = new ResponsePage<>();
    Page<ExamEntity> page = exampRepository.getExamsByNameAndCode(name, code, pageable);
    List<ExamDto> examDtos = page.getContent().stream().map(examMapper::toDto).toList();
    responsePage.setPageNumber(pageable.getPageNumber());
    responsePage.setPageSize(pageable.getPageSize());
    responsePage.setTotalElements(page.getTotalElements());
    responsePage.setTotalPages(page.getTotalPages());
    responsePage.setContent(examDtos);
    return responsePage;
  }

  @Override
  public BaseResponse<ExamAutoFillResponse> create(ExamAutoFillResponse response) {
      BaseResponse<ExamAutoFillResponse> res = new BaseResponse<>();
    ExamEntity examEntity = iExamMapper.toEntity(response);
    examEntity.setDeleted(false);
    examEntity.setCode(GenerateCode.generateUniqueCode("EXAM"));
    if (response.getDetails() != null) {
      List<ExamDetailsEntity> detailsEntities = response.getDetails().stream().map(detailDto -> {
                ExamDetailsEntity entity  = new ExamDetailsEntity();
          entity.setName(detailDto.getName());
          entity.setAnswer(detailDto.getAnswer());
          entity.setDescription(detailDto.getDescription());
          entity.setUrl(detailDto.getUrl());
          entity.setExamEntity(examEntity);
          entity.setDeleted(false);
          return entity;
      }).toList();
      examEntity.setDetails(detailsEntities);
    }
    exampRepository.save(examEntity);
    res.setCode(HttpStatus.CREATED.value());
    res.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    res.setData(iExamMapper.toResponse(examEntity));
    return res;
  }

  @Override
  public BaseResponse<List<CourseDto>> suggestCourse(ExamResultRequest request) {
    BaseResponse<List<CourseDto>> response = new BaseResponse<>();
    Long score = request.getScore();
    List<CourseEntity> courseEntityList;
    if (score >= 0 && score <= 50) {
      // Beginner: A1
      courseEntityList = courseRepository.findByAim("A1");
    } else if (score <= 100) {
      // Elementary: A2
      courseEntityList = courseRepository.findByAim("A2");
    } else if (score <= 150) {
      // Intermediate: B1
      courseEntityList = courseRepository.findByAim("B1");
    } else if (score <= 200) {
      // Upper Intermediate: B2
      courseEntityList = courseRepository.findByAim("B2");
    } else if (score <= 230) {
      // Advanced: C1
      courseEntityList = courseRepository.findByAim("C1");
    } else {
      // Proficient: C2
      courseEntityList = courseRepository.findByAim("C2");
    }
    List<CourseDto> courseDtos = courseEntityList.stream().map(courseEntity -> {
      CourseDto courseDto = courseMapper.toDto(courseEntity);
      List<ImagesEntity> images = imageRepository.findByCourseId(courseEntity.getId());
      if (!images.isEmpty()) {
        ImagesEntity image = images.get(0);
        courseDto.setImageUrl(image.getUrl());
      }
      return courseDto;
    }).toList();
    response.setData(courseDtos);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    return response;
  }

  @Override
  public BaseResponse<ExamDto> getExamByCode(String examCode) {
    BaseResponse<ExamDto> response = new BaseResponse<>();
    ExamEntity examEntity = exampRepository.findByCode(examCode);
    response.setData(examMapper.toDto(examEntity));
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  public BaseResponse<ExamDto> handleExam(String id, boolean isDelete) {
    BaseResponse<ExamDto> response = new BaseResponse<>();
    Utils<Long> utils = LongUtils.strToLong(id);
    if (utils.getT() == null) {
      response.setCode(utils.getCode());
      response.setMessage(utils.getMsg());
      return response;
    }
    Long examId = utils.getT();
    Optional<ExamEntity> examEntity = exampRepository.findById(examId);
    if (examEntity.isEmpty()) {
      response.setCode(HttpStatus.BAD_REQUEST.value());
      response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
      return response;
    }
    ExamEntity entity = examEntity.get();
    if (isDelete) {
      entity.setDeleted(true);
    }
    entity = exampRepository.save(entity);
    ExamDto dto = examMapper.toDto(entity);
    response.setData(dto);
    response.setCode(HttpStatus.OK.value());
    response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
    return response;
  }
}

