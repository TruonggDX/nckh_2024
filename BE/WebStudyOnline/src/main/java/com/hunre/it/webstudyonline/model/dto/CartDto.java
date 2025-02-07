package com.hunre.it.webstudyonline.model.dto;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.entity.CourseEntity;
import com.hunre.it.webstudyonline.entity.RoadmapEntity;
import com.hunre.it.webstudyonline.mapper.ItemDto;

import java.math.BigDecimal;
import java.util.Set;

public class CartDto {
    private Long id;
    private Integer quantity;
    private ItemDto item;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public ItemDto getItem() {
        return item;
    }

    public void setItem(ItemDto item) {
        this.item = item;
    }

}
