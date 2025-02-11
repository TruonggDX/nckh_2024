package com.hunre.it.webstudyonline.entity;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;

@Table(name = "point")
@Entity
public class PointEntity extends AbstractEntity{
    private Double score;
    private Integer rankLevel;
    private Long completionTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    @EqualsAndHashCode.Exclude
    private AccountEntity accountEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", nullable = false)
    @EqualsAndHashCode.Exclude
    private ExamEntity examEntity;

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public Integer getRankLevel() {
        return rankLevel;
    }

    public void setRankLevel(Integer rankLevel) {
        this.rankLevel = rankLevel;
    }

    public Long getCompletionTime() {
        return completionTime;
    }

    public void setCompletionTime(Long completionTime) {
        this.completionTime = completionTime;
    }

    public AccountEntity getAccountEntity() {
        return accountEntity;
    }

    public void setAccountEntity(AccountEntity accountEntity) {
        this.accountEntity = accountEntity;
    }

    public ExamEntity getExamEntity() {
        return examEntity;
    }

    public void setExamEntity(ExamEntity examEntity) {
        this.examEntity = examEntity;
    }
}
