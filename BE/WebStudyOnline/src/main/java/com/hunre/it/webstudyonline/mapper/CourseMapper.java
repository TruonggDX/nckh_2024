package com.hunre.it.webstudyonline.mapper;
import com.hunre.it.webstudyonline.entity.CourseEntity;
import com.hunre.it.webstudyonline.model.dto.CourseDto;
import com.hunre.it.webstudyonline.model.dto.CourseIndex;
import org.springframework.stereotype.Component;

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
        courseDto.setDiscount(courseEntity.getDiscount());
        courseDto.setCategoryId(courseEntity.getCategoryEntity().getId());
        courseDto.setCategoryName(courseEntity.getCategoryEntity().getName());
        courseDto.setPeriods(courseEntity.getCourseDetailsEntities().size());
        courseDto.setCreatedBy(courseEntity.getCreatedBy());
        courseDto.setCreatedDate(courseEntity.getCreatedDate());
        courseDto.setAim(courseEntity.getAim());
        courseDto.setCreatedDate(courseEntity.getModifiedDate());
        return courseDto;
    }
    public CourseEntity toEntity(CourseDto courseDto){
        CourseEntity courseEntity = new CourseEntity();
        courseEntity.setId(courseDto.getId());
        courseEntity.setAim(courseDto.getAim());
        courseEntity.setCode(courseDto.getCode());
        courseEntity.setName(courseDto.getName());
        courseEntity.setPrice(courseDto.getPrice());
        courseEntity.setDiscount(courseDto.getDiscount());
        courseEntity.setDescription(courseDto.getDescription());
        courseEntity.setStatus(courseDto.getStatus());
        return courseEntity;
    }

    public CourseDto toDto(CourseIndex courseIndex) {
        CourseDto dto = new CourseDto();
        dto.setId(courseIndex.getId());
        dto.setCode(courseIndex.getCode());
        dto.setName(courseIndex.getName());
        dto.setPrice(courseIndex.getPrice());
        dto.setDescription(courseIndex.getDescription());
        dto.setStatus(courseIndex.getStatus());
        dto.setDiscount(courseIndex.getDiscount());
        dto.setAim(courseIndex.getAim());
        return dto;
    }

}
