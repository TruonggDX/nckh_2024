package com.hunre.it.webstudyonline.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;

@Table(name = "point")
@Entity
public class PointEntity extends AbstractEntity{
    private String score;
    private Integer rank_level;
    private String name_exam;

    @ManyToOne
    @JoinColumn(name = "account_id")
    @EqualsAndHashCode.Exclude
    private AccountEntity accountEntity;

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public Integer getRank_level() {
        return rank_level;
    }

    public void setRank_level(Integer rank_level) {
        this.rank_level = rank_level;
    }

    public String getName_exam() {
        return name_exam;
    }

    public void setName_exam(String name_exam) {
        this.name_exam = name_exam;
    }

    public AccountEntity getAccountEntity() {
        return accountEntity;
    }

    public void setAccountEntity(AccountEntity accountEntity) {
        this.accountEntity = accountEntity;
    }
}
