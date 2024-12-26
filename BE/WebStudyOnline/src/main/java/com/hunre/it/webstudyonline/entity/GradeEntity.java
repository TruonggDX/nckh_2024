package com.hunre.it.webstudyonline.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "grade")
public class GradeEntity extends AbstractEntity {
    private String code;
    private String name;
    private int number_tudent;

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

    public int getNumber_tudent() {
        return number_tudent;
    }

    public void setNumber_tudent(int number_tudent) {
        this.number_tudent = number_tudent;
    }
}
