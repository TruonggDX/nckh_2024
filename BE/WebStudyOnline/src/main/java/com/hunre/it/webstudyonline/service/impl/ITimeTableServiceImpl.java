package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.GradeEntity;
import com.hunre.it.webstudyonline.entity.TimetableEntity;
import com.hunre.it.webstudyonline.mapper.TimeTableMapper;
import com.hunre.it.webstudyonline.model.dto.TimeTableDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.repository.GradeRepository;
import com.hunre.it.webstudyonline.repository.TimeTableRepository;
import com.hunre.it.webstudyonline.service.ITimeTableService;
import com.hunre.it.webstudyonline.utils.Constant;
import com.hunre.it.webstudyonline.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ITimeTableServiceImpl implements ITimeTableService {
    @Autowired
    private TimeTableRepository timeTableRepository;
    @Autowired
    private TimeTableMapper timeTableMapper;
    @Autowired
    private GradeRepository gradeRepository;

    @Override
    public ResponsePage<List<TimeTableDto>> getAllTimeTables(Pageable pageable) {
        ResponsePage<List<TimeTableDto>> responsePage = new ResponsePage<>();
        Page<TimetableEntity> page = timeTableRepository.getAll(pageable);
        List<TimeTableDto> timeTableDtos = page.getContent().stream().map(timeTableMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(timeTableDtos);
        return responsePage;
    }

    @Override
    public ResponsePage<List<TimeTableDto>> getTimeTableByGradeId(Long gradeId, Pageable pageable) {
        ResponsePage<List<TimeTableDto>> responsePage = new ResponsePage<>();
        Page<TimetableEntity> page = timeTableRepository.getByGradeId(gradeId, pageable);
        List<TimeTableDto> timeTableDtos = page.getContent().stream().map(timeTableMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(timeTableDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<TimeTableDto> addTimeTable(TimeTableDto timeTableDto) {
        BaseResponse<TimeTableDto> response = new BaseResponse<>();
        Optional<GradeEntity> grade = gradeRepository.findById(timeTableDto.getGradeId());
        if (grade.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        TimetableEntity timetableEntity = timeTableMapper.toEntity(timeTableDto);
        timetableEntity.setGradeEntity(grade.get());
        timetableEntity.setDeleted(false);
        timetableEntity = timeTableRepository.save(timetableEntity);
        response.setData(timeTableMapper.toDto(timetableEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }

    @Override
    public BaseResponse<TimeTableDto> updateTimeTable(Long id, TimeTableDto timeTableDto) {
        BaseResponse<TimeTableDto> response = new BaseResponse<>();
        Optional<TimetableEntity> optional = timeTableRepository.findById(id);
        if (optional.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        Optional<GradeEntity> grade = gradeRepository.findById(timeTableDto.getGradeId());
        if (grade.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        TimetableEntity timetableEntity = optional.get();
        timetableEntity.setGradeEntity(grade.get());
        timetableEntity.setName(timeTableDto.getName());
        timetableEntity.setPeriod(timeTableDto.getPeriod());
        timetableEntity.setUrl(timeTableDto.getUrl());
        String dateUtils = timeTableDto.getDate();
        timetableEntity.setDate(DateUtils.strToDate(dateUtils));
        timetableEntity.setDeleted(false);
        timetableEntity = timeTableRepository.save(timetableEntity);
        response.setData(timeTableMapper.toDto(timetableEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }

    @Override
    public BaseResponse<TimeTableDto> deleteTimeTable(Long id) {
        BaseResponse<TimeTableDto> response = new BaseResponse<>();
        Optional<TimetableEntity> optional = timeTableRepository.findById(id);
        if (optional.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        TimetableEntity tEntity = optional.get();
        tEntity.setDeleted(true);
        timeTableRepository.save(tEntity);
        response.setData(timeTableMapper.toDto(tEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }

    @Override
    public BaseResponse<TimeTableDto> getTimeTableById(Long id) {
        BaseResponse<TimeTableDto> response = new BaseResponse<>();
        Optional<TimetableEntity> optional = timeTableRepository.findById(id);
        if (optional.isEmpty()){
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage(Constant.HTTP_MESSAGE.FAILED);
            return response;
        }
        response.setData(timeTableMapper.toDto(optional.get()));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }
}
