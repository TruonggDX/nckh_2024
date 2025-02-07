package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.entity.CartEntity;
import com.hunre.it.webstudyonline.entity.CourseEntity;
import com.hunre.it.webstudyonline.entity.RoadmapEntity;
import com.hunre.it.webstudyonline.model.dto.CartDto;
import com.hunre.it.webstudyonline.model.request.AddCartForm;
import com.hunre.it.webstudyonline.model.request.UpdateCartForm;
import com.hunre.it.webstudyonline.repository.AccountRepository;
import com.hunre.it.webstudyonline.repository.CourseRepository;
import com.hunre.it.webstudyonline.repository.RoadmapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CartMapper {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private RoadmapRepository roadmapRepository;

    public CartDto toDto(CartEntity cartEntity) {
        CartDto cartDto = new CartDto();
        cartDto.setId(cartEntity.getId());
        cartDto.setQuantity(cartEntity.getQuantity());

        ItemDto itemDto = null;
        if (cartEntity.getCourse() != null) {
            itemDto = new ItemDto(cartEntity.getCourse().getId(),cartEntity.getCourse().getName(),
                    cartEntity.getCourse().getDescription(),cartEntity.getCourse().getPrice(),0,"Course");
        } else if (cartEntity.getRoadmap() != null) {
            itemDto = new ItemDto(cartEntity.getRoadmap().getId(),cartEntity.getRoadmap().getName(), cartEntity.getRoadmap().getDescription(),
                    cartEntity.getRoadmap().getPrice(),cartEntity.getRoadmap().getDiscount(),"Roadmap");
        }
        cartDto.setItem(itemDto);
        return cartDto;
    }
    public CartEntity toEntity(AddCartForm addCartForm) {
        CartEntity cartEntity = new CartEntity();
        cartEntity.setQuantity(addCartForm.getQuantity());

        AccountEntity accountEntity = accountRepository.findById(addCartForm.getAccountId()).orElseThrow(()-> new RuntimeException("User not found"));
        cartEntity.setAccount(accountEntity);

        if (addCartForm.getType().equals("Roadmap")) {
            RoadmapEntity roadmapEntity = roadmapRepository.findById(addCartForm.getItemId()).orElseThrow(()-> new RuntimeException("Roadmap not found"));
            cartEntity.setRoadmap(roadmapEntity);
        }else if (addCartForm.getType().equals("Course")) {
            CourseEntity courseEntity = courseRepository.findById(addCartForm.getItemId()).orElseThrow(()-> new RuntimeException("Course not found"));
            cartEntity.setCourse(courseEntity);
        }
        return cartEntity;
    }

    public CartEntity toEntity(CartEntity cartEntity, UpdateCartForm updateCartForm) {
        cartEntity.setQuantity(updateCartForm.getQuantity());
        return cartEntity;
    }
}

