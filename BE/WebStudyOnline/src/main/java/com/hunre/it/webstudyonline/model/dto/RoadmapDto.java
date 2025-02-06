package com.hunre.it.webstudyonline.model.dto;

import java.math.BigDecimal;
import java.util.Set;

public class RoadmapDto {
    private Long id;
    private String name;
    private String description;
    private Integer discount;
    private BigDecimal price;
    private Set<CourseDto> courses;

    public Set<CourseDto> getCourses() {
        return courses;
    }

    public void setCourses(Set<CourseDto> courses) {
        this.courses = courses;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
