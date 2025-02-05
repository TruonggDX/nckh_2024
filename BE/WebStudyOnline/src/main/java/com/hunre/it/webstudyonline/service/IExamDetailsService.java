package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.ExamDetailsDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;

import java.util.List;

public interface IExamDetailsService {
    BaseResponse<List<ExamDetailsDto>> getAllExamDetails(String id);
    BaseResponse<ExamDetailsDto> addExamDetails(ExamDetailsDto examDetailsDto);
    BaseResponse<ExamDetailsDto> updateExamDetails(String id,ExamDetailsDto examDetailsDto);
    BaseResponse<ExamDetailsDto> deleteExamDetails(String id);
    BaseResponse<ExamDetailsDto> getExamDetails(String id);

}
