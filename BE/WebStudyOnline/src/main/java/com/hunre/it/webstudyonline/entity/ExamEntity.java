package com.hunre.it.webstudyonline.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "exam")
public class ExamEntity extends AbstractEntity{
    private String code;
    private String name;
    private Integer duration;
    private Integer number_question;
    private Boolean isFree;
    @OneToMany(mappedBy = "examEntity", cascade = CascadeType.ALL)
    private List<ExamDetailsEntity> details = new ArrayList<>();

    public Boolean getFree() {
        return isFree;
    }

    public List<ExamDetailsEntity> getDetails() {
        return details;
    }

    public void setDetails(List<ExamDetailsEntity> details) {
        this.details = details;
    }

    public void setFree(Boolean free) {
        isFree = free;
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

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Integer getNumber_question() {
        return number_question;
    }

    public void setNumber_question(Integer number_question) {
        this.number_question = number_question;
    }
}
