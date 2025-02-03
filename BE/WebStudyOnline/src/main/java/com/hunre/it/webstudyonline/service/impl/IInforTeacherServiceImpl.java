package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.entity.InforTeacherEntity;
import com.hunre.it.webstudyonline.mapper.InforTeacherMapper;
import com.hunre.it.webstudyonline.model.dto.AccountDto;
import com.hunre.it.webstudyonline.model.dto.InforTeacherDto;
import com.hunre.it.webstudyonline.model.request.AddInforTeacherForm;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.repository.InforTeacherRepository;
import com.hunre.it.webstudyonline.service.IInforTeacherService;
import com.hunre.it.webstudyonline.utils.Constant;
import com.hunre.it.webstudyonline.utils.LongUtils;
import com.hunre.it.webstudyonline.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class IInforTeacherServiceImpl implements IInforTeacherService {

    @Autowired
    private InforTeacherMapper inforTeacherMapper;
    @Autowired
    private InforTeacherRepository inforTeacherRepository;

    @Override
    public BaseResponse<InforTeacherDto> getInforTeacherById(String id) {
        BaseResponse<InforTeacherDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT()== null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long teacherId = utils.getT();
        Optional<InforTeacherEntity> check = inforTeacherRepository.findById(teacherId);
        if (check.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        InforTeacherEntity teacherEntity = check.get();
        InforTeacherDto inforTeacherDto = inforTeacherMapper.toInforTeacherDto(teacherEntity);

        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(inforTeacherDto);
        return response;
    }

    @Override
    public BaseResponse<InforTeacherDto> addInforTeacher(AddInforTeacherForm addInforTeacherForm) {
        BaseResponse<InforTeacherDto> response = new BaseResponse<>();
        InforTeacherEntity inforTeacherEntity = inforTeacherMapper.toInforTeacherEntity(addInforTeacherForm);
        inforTeacherEntity.setDeleted(false);
        InforTeacherEntity inforTeacherEntitySaved = inforTeacherRepository.save(inforTeacherEntity);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(inforTeacherMapper.toInforTeacherDto(inforTeacherEntitySaved));
        return response;
    }

    @Override
    public BaseResponse<InforTeacherDto> updateInforTeacher(InforTeacherDto inforTeacherDto,String id) {
        BaseResponse<InforTeacherDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT()== null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long teacherId = utils.getT();
        Optional<InforTeacherEntity> check = inforTeacherRepository.findById(teacherId);
        if (check.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        InforTeacherEntity teacherEntity = check.get();
        teacherEntity.setExperience(inforTeacherDto.getExperience());
        teacherEntity.setBirthday(inforTeacherDto.getBirthday().toString());
        teacherEntity.setAddress(inforTeacherDto.getAddress());

        inforTeacherRepository.save(teacherEntity);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(inforTeacherMapper.toInforTeacherDto(teacherEntity));
        return response;
    }

    @Override
    public BaseResponse<InforTeacherDto> deleteInforTeacher(String id) {
        BaseResponse<InforTeacherDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT()== null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long teacherId = utils.getT();
        Optional<InforTeacherEntity> check = inforTeacherRepository.findById(teacherId);
        if (check.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        InforTeacherEntity teacherEntity = check.get();
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(inforTeacherMapper.toInforTeacherDto(teacherEntity));
        teacherEntity.setDeleted(true);
        return response;
    }
}
