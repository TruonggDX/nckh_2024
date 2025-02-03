package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.InforTeacherDto;
import com.hunre.it.webstudyonline.model.request.AddInforTeacherForm;
import com.hunre.it.webstudyonline.model.response.BaseResponse;

public interface IInforTeacherService {
    BaseResponse<InforTeacherDto> getInforTeacherById(String id);
    BaseResponse<InforTeacherDto> addInforTeacher(AddInforTeacherForm addInforTeacherForm);
    BaseResponse<InforTeacherDto> updateInforTeacher(InforTeacherDto inforTeacherDto, String id);
    BaseResponse<InforTeacherDto> deleteInforTeacher(String id);
}
