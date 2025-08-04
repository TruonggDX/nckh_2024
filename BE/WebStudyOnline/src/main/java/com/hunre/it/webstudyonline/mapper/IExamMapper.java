package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.ExamEntity;
import com.hunre.it.webstudyonline.model.response.ExamAutoFillResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IExamMapper {

  ExamAutoFillResponse toResponse(ExamEntity examEntity);

  @Mapping(source = "numberQuestion", target = "number_question")
  ExamEntity toEntity(ExamAutoFillResponse examAutoFillResponse);
}
