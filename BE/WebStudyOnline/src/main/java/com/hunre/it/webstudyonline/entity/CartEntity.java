package com.hunre.it.webstudyonline.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.ToString;

@Entity
@Table(name = "cart")
public class CartEntity extends AbstractEntity {
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "course_id")
    @ToString.Exclude
    private CourseEntity courseEntity;

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public CourseEntity getCourseEntity() {
        return courseEntity;
    }

    public void setCourseEntity(CourseEntity courseEntity) {
        this.courseEntity = courseEntity;
    }
}
