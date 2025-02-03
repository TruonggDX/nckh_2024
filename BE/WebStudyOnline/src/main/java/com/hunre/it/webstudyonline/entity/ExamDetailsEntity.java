package com.hunre.it.webstudyonline.entity;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "exam_details")
public class ExamDetailsEntity extends AbstractEntity{
//    private Integer number_question;
    private String answer;
    private String description;
    private String url;

    @ManyToOne
    @JoinColumn(name = "exam_id")
    @EqualsAndHashCode.Exclude
    private ExamEntity examEntity;

//    public Integer getNumber_question() {
//        return number_question;
//    }
//
//    public void setNumber_question(Integer number_question) {
//        this.number_question = number_question;
//    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public ExamEntity getExamEntity() {
        return examEntity;
    }

    public void setExamEntity(ExamEntity examEntity) {
        this.examEntity = examEntity;
    }
}
