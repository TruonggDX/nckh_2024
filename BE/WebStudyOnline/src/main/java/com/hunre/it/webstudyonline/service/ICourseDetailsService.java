package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.CourseDetailsDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;

import java.util.List;

public interface ICourseDetailsService {
    BaseResponse<List<CourseDetailsDto>> getAll(String courseId);
    BaseResponse<CourseDetailsDto> addCourseDetails(CourseDetailsDto courseDetailsDto);
    BaseResponse<CourseDetailsDto> updateCourseDetails(String id,CourseDetailsDto courseDetailsDto);
    BaseResponse<CourseDetailsDto> deleteCourseDetails(String id);
    BaseResponse<CourseDetailsDto> getCourseDetailsById(String id);
}
