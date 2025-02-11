package com.hunre.it.webstudyonline.model.dto;

import java.util.Set;

public class GradeDto {
    private Long id;
    private String code;
    private String name;
    private Long number_student;
    private Long course_id;
    private Set<Long> account_id;

    public Long getCourse_id() {
        return course_id;
    }

    public void setCourse_id(Long course_id) {
        this.course_id = course_id;
    }

    public Set<Long> getAccount_id() {
        return account_id;
    }

    public void setAccount_id(Set<Long> account_id) {
        this.account_id = account_id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
