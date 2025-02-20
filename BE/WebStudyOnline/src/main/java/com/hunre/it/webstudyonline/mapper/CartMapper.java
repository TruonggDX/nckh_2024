package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.entity.CartEntity;
import com.hunre.it.webstudyonline.entity.CourseEntity;
import com.hunre.it.webstudyonline.model.dto.CartDto;
import com.hunre.it.webstudyonline.model.dto.ItemDto;
import com.hunre.it.webstudyonline.model.request.AddCartForm;
import com.hunre.it.webstudyonline.model.request.UpdateCartForm;
import com.hunre.it.webstudyonline.repository.AccountRepository;
import com.hunre.it.webstudyonline.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CartMapper {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private CourseRepository courseRepository;

    public CartDto toDto(CartEntity cartEntity) {
        CartDto cartDto = new CartDto();
        cartDto.setId(cartEntity.getId());
        cartDto.setQuantity(cartEntity.getQuantity());

        ItemDto itemDto = null;
        if (cartEntity.getCourse() != null) {
            itemDto = new ItemDto(cartEntity.getCourse().getId(),cartEntity.getCourse().getName(),
                    cartEntity.getCourse().getDescription(),cartEntity.getCourse().getPrice(),0);
        }
        cartDto.setItem(itemDto);
        return cartDto;
    }
    public CartEntity toEntity(String email,AddCartForm addCartForm) {
        CartEntity cartEntity = new CartEntity();
        cartEntity.setQuantity(addCartForm.getQuantity());

        AccountEntity accountEntity = accountRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("User not found"));
        cartEntity.setAccount(accountEntity);

        CourseEntity courseEntity = courseRepository.findById(addCartForm.getItemId()).orElseThrow(()-> new RuntimeException("Course not found"));
        cartEntity.setCourse(courseEntity);
        return cartEntity;
    }

    public CartEntity toEntity(CartEntity cartEntity, UpdateCartForm updateCartForm) {
        cartEntity.setQuantity(updateCartForm.getQuantity());
        return cartEntity;
    }
}

