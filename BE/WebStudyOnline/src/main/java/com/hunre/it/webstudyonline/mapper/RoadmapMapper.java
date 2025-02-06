package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.RoadmapEntity;
import com.hunre.it.webstudyonline.model.dto.CourseDto;
import com.hunre.it.webstudyonline.model.dto.RoadmapDto;
import com.hunre.it.webstudyonline.model.request.AddRoadmapForm;
import com.hunre.it.webstudyonline.model.request.UpdateRoadmapForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class RoadmapMapper {
    @Autowired
    private CourseMapper courseMapper;
    public RoadmapDto toDto(RoadmapEntity roadmapEntity) {
        RoadmapDto roadmapDto = new RoadmapDto();
        roadmapDto.setId(roadmapEntity.getId());
        roadmapDto.setName(roadmapEntity.getName());
        roadmapDto.setDescription(roadmapEntity.getDescription());
        roadmapDto.setDiscount(roadmapEntity.getDiscount());
        roadmapDto.setPrice(roadmapEntity.getPrice());
        Set<CourseDto> courseDtos = roadmapEntity.getCourse().stream()
                .map(courseMapper::toDto)
                .collect(Collectors.toSet());
        roadmapDto.setCourses(courseDtos);
        return roadmapDto;
    }
    public RoadmapEntity toEntity(AddRoadmapForm addRoadmapForm) {
        RoadmapEntity roadmapEntity = new RoadmapEntity();
        roadmapEntity.setName(addRoadmapForm.getName());
        roadmapEntity.setDescription(addRoadmapForm.getDescription());
        roadmapEntity.setDiscount(addRoadmapForm.getDiscount());
        roadmapEntity.setPrice(addRoadmapForm.getPrice());
        return roadmapEntity;
    }
    public RoadmapEntity toEntity(RoadmapEntity roadmapEntity,UpdateRoadmapForm updateRoadmapForm) {
        roadmapEntity.setName(updateRoadmapForm.getName());
        roadmapEntity.setDescription(updateRoadmapForm.getDescription());
        roadmapEntity.setDiscount(updateRoadmapForm.getDiscount());
        roadmapEntity.setPrice(updateRoadmapForm.getPrice());
        return roadmapEntity;
    }
}
