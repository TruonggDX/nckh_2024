package com.hunre.it.webstudyonline.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roadmap")
public class RoadmapEntity extends AbstractEntity {
    private String name;
    private String description;
    private Integer discount;
    private BigDecimal price;

    @ManyToMany
    @JoinTable(
            name = "roadmap_course",
            joinColumns = @JoinColumn(name = "roadmap_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id"))
    private Set<CourseEntity> course = new HashSet<>();
    @OneToMany(mappedBy = "roadmap")
    private Set<CartEntity> cart = new HashSet<>();

    public Set<CartEntity> getCart() {
        return cart;
    }

    public void setCart(Set<CartEntity> cart) {
        this.cart = cart;
    }

    public Set<CourseEntity> getCourse() {
        return course;
    }

    public void setCourse(Set<CourseEntity> course) {
        this.course = course;
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
