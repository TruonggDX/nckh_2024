package com.hunre.it.webstudyonline.model.response;

import java.util.List;

public class ExamAutoFillResponse {
  private String name;               // same as ExamEntity.name
  private Integer duration;          // same as ExamEntity.duration
  private Integer numberQuestion;    // same as ExamEntity.numberQuestion
  private List<ExamDetailAutoFill> details; // same as List<ExamDetailsEntity>

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

  public Integer getNumberQuestion() {
    return numberQuestion;
  }

  public void setNumberQuestion(Integer numberQuestion) {
    this.numberQuestion = numberQuestion;
  }

  public List<ExamDetailAutoFill> getDetails() {
    return details;
  }

  public void setDetails(
      List<ExamDetailAutoFill> details) {
    this.details = details;
  }
}
