package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.ExamEntity;
import com.hunre.it.webstudyonline.model.dto.ExamDto;
import org.springframework.stereotype.Component;

@Component
public class ExamMapper {
    public ExamDto toDto(ExamEntity examEntity){
        ExamDto examDto = new ExamDto();
        examDto.setId(examEntity.getId());
        examDto.setCode(examEntity.getCode());
        examDto.setName(examEntity.getName());
        examDto.setDuration(examEntity.getDuration());
        examDto.setNumber_question(examEntity.getNumber_question());
        return examDto;
    }
    public ExamEntity toEntity(ExamDto examDto){
        ExamEntity examEntity = new ExamEntity();
        examEntity.setId(examDto.getId());
        examEntity.setCode(examDto.getCode());
        examEntity.setName(examDto.getName());
        examEntity.setDuration(examDto.getDuration());
        examEntity.setNumber_question(examDto.getNumber_question());
        return examEntity;
    }
}
