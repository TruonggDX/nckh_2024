package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.CategoryEntity;
import com.hunre.it.webstudyonline.entity.CourseEntity;
import com.hunre.it.webstudyonline.entity.ImagesEntity;
import com.hunre.it.webstudyonline.model.dto.CourseDto;
import com.hunre.it.webstudyonline.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class CourseMapper {

    public CourseDto toDto(CourseEntity courseEntity){
        CourseDto courseDto = new CourseDto();
        courseDto.setId(courseEntity.getId());
        courseDto.setCode(courseEntity.getCode());
        courseDto.setName(courseEntity.getName());
        courseDto.setPrice(courseEntity.getPrice());
        courseDto.setDescription(courseEntity.getDescription());
        courseDto.setStatus(courseEntity.getStatus());
        courseDto.setCategoryId(courseEntity.getCategoryEntity().getId());
        return courseDto;
    }
    public CourseEntity toEntity(CourseDto courseDto){
        CourseEntity courseEntity = new CourseEntity();
        courseEntity.setId(courseDto.getId());
        courseEntity.setCode(courseDto.getCode());
        courseEntity.setName(courseDto.getName());
        courseEntity.setPrice(courseDto.getPrice());
        courseEntity.setDescription(courseDto.getDescription());
        courseEntity.setStatus(courseDto.getStatus());
        return courseEntity;
    }
}
