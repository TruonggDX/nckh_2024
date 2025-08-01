package com.hunre.it.webstudyonline.model.dto;

import java.math.BigDecimal;

public class CourseRevenueDto {
  private String courseName;
  private BigDecimal revenue;

  public CourseRevenueDto(String courseName, BigDecimal revenue) {
    this.courseName = courseName;
    this.revenue = revenue;
  }

  public String getCourseName() {
    return courseName;
  }

  public void setCourseName(String courseName) {
    this.courseName = courseName;
  }

  public BigDecimal getRevenue() {
    return revenue;
  }

  public void setRevenue(BigDecimal revenue) {
    this.revenue = revenue;
  }
}
