package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.BillDetailsEntity;
import com.hunre.it.webstudyonline.entity.CourseEntity;
import com.hunre.it.webstudyonline.entity.RoadmapEntity;
import com.hunre.it.webstudyonline.model.dto.BillDetailsDto;
import com.hunre.it.webstudyonline.model.dto.ItemDto;
import com.hunre.it.webstudyonline.repository.BillRepository;
import com.hunre.it.webstudyonline.repository.CourseRepository;
import com.hunre.it.webstudyonline.repository.RoadmapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Optional;

@Component
public class BillDetailsMapper {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private RoadmapRepository roadmapRepository;

    @Autowired
    private BillRepository billRepository;

    public BillDetailsDto toDto(BillDetailsEntity entity) {
        BillDetailsDto dto = new BillDetailsDto();
        dto.setId(entity.getId());
        dto.setQuantity(entity.getQuantity());
        dto.setBillId(entity.getBillEntity() != null ? entity.getBillEntity().getId() : null);

        ItemDto itemDto = null;
        BigDecimal itemPrice = BigDecimal.ZERO;
        if (entity.getCourseEntity() != null) {
            itemDto = new ItemDto(
                    entity.getCourseEntity().getId(),
                    entity.getCourseEntity().getName(),
                    entity.getCourseEntity().getDescription(),
                    entity.getCourseEntity().getPrice(),
                    0,
                    "Course"
            );
            itemPrice = entity.getCourseEntity().getPrice();
        } else if (entity.getRoadmap() != null) {
            itemDto = new ItemDto(
                    entity.getRoadmap().getId(),
                    entity.getRoadmap().getName(),
                    entity.getRoadmap().getDescription(),
                    entity.getRoadmap().getPrice(),
                    entity.getRoadmap().getDiscount(),
                    "Roadmap"
            );
            itemPrice = entity.getRoadmap().getPrice();
        }
        BigDecimal totalPrice = itemPrice.multiply(BigDecimal.valueOf(entity.getQuantity()));
        dto.setPrice(totalPrice);

        dto.setItem(itemDto);
        return dto;
    }

    public BillDetailsEntity toEntity(BillDetailsDto dto) {
        BillDetailsEntity entity = new BillDetailsEntity();
        entity.setId(dto.getId());
        entity.setQuantity(dto.getQuantity());

        if (dto.getBillId() != null) {
            billRepository.findById(dto.getBillId()).ifPresent(entity::setBillEntity);
        }

        if (dto.getItem() != null) {
            ItemDto item = dto.getItem();
            BigDecimal itemPrice = BigDecimal.ZERO;
            if ("Course".equals(item.getType())) {
                Optional<CourseEntity> courseEntity = courseRepository.findById(item.getId());
                if (courseEntity.isPresent()) {
                    entity.setCourseEntity(courseEntity.get());
                    itemPrice = courseEntity.get().getPrice();
                }
            } else if ("Roadmap".equals(item.getType())) {
                Optional<RoadmapEntity> roadmapEntity = roadmapRepository.findById(item.getId());
                if (roadmapEntity.isPresent()) {
                    entity.setRoadmap(roadmapEntity.get());
                    itemPrice = roadmapEntity.get().getPrice();
                }
            }
            BigDecimal totalPrice = itemPrice.multiply(BigDecimal.valueOf(dto.getQuantity()));
            entity.setPrice(totalPrice);
        }

        return entity;
    }
}
