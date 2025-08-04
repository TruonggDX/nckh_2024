package com.hunre.it.webstudyonline.model.response;


public class ExamDetailAutoFill {
  private String name;        // same as ExamDetailsEntity.name
  private String answer;      // same as ExamDetailsEntity.answer
  private String description; // stringified list of options (FE nên convert)
  private String url;         // optional

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

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
}
