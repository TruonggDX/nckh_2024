package com.hunre.it.webstudyonline.entity;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "grade")
public class GradeEntity extends AbstractEntity {
    private String code;
    private String name;
    private Long number_student;
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinTable(
            name = "grade_account",
            joinColumns = @JoinColumn(name = "grade_id"),
            inverseJoinColumns = @JoinColumn(name = "account_id")
    )
    private Set<AccountEntity> accounts = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "course_id")
    @EqualsAndHashCode.Exclude
    private CourseEntity courseEntity;

    public Set<AccountEntity> getAccounts() {
        return accounts;
    }

    public void setAccounts(Set<AccountEntity> accounts) {
        this.accounts = accounts;
    }

    public CourseEntity getCourseEntity() {
        return courseEntity;
    }

    public void setCourseEntity(CourseEntity courseEntity) {
        this.courseEntity = courseEntity;
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

    public Long getNumber_student() {
        return number_student;
    }

    public void setNumber_student(Long number_student) {
        this.number_student = number_student;
    }
}
