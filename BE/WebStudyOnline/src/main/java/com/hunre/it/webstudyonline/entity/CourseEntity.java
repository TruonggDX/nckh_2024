package com.hunre.it.webstudyonline.entity;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "course")
public class CourseEntity extends AbstractEntity {
    private String code;
    private String name;
    private BigDecimal price;
    private String description;
    private Integer discount;
    private String status;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @EqualsAndHashCode.Exclude
    private CategoryEntity categoryEntity;

    @ManyToMany(mappedBy = "course")
    private Set<RoadmapEntity> roadmap = new HashSet<>();

    @OneToMany(mappedBy = "course")
    private Set<CartEntity> cart = new HashSet<>();

    public Set<RoadmapEntity> getRoadmap() {
        return roadmap;
    }

    public void setRoadmap(Set<RoadmapEntity> roadmap) {
        this.roadmap = roadmap;
    }

    public Set<CartEntity> getCart() {
        return cart;
    }

    public void setCart(Set<CartEntity> cart) {
        this.cart = cart;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public CategoryEntity getCategoryEntity() {
        return categoryEntity;
    }

    public void setCategoryEntity(CategoryEntity categoryEntity) {
        this.categoryEntity = categoryEntity;
    }
}
