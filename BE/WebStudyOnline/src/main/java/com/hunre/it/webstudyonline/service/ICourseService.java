package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.CourseDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ICourseService {
    ResponsePage<List<CourseDto>> getCourses(Pageable pageable);
    BaseResponse<CourseDto> addCourse(CourseDto courseDto, MultipartFile file);
    BaseResponse<CourseDto> updateCourse(Long id,CourseDto courseDto,MultipartFile file);
    BaseResponse<CourseDto> deleteCourse(Long id);
    BaseResponse<CourseDto> getCourseById(Long id);
}
