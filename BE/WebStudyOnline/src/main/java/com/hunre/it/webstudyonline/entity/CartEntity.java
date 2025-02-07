package com.hunre.it.webstudyonline.entity;

import jakarta.persistence.*;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cart")
public class CartEntity extends AbstractEntity {
    private Integer quantity;
    @ManyToOne
    @JoinColumn(name = "account_id")
    private AccountEntity account;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private CourseEntity course;

    @ManyToOne
    @JoinColumn(name = "roadmap_id")
    private RoadmapEntity roadmap;

    public CourseEntity getCourse() {
        return course;
    }

    public void setCourse(CourseEntity course) {
        this.course = course;
    }

    public RoadmapEntity getRoadmap() {
        return roadmap;
    }

    public void setRoadmap(RoadmapEntity roadmap) {
        this.roadmap = roadmap;
    }

    public AccountEntity getAccount() {
        return account;
    }

    public void setAccount(AccountEntity account) {
        this.account = account;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
