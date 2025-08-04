package com.hunre.it.webstudyonline.model.dto;

import java.math.BigDecimal;

public class CourseRevenueDto {
  private String code;
  private String image;
  private String courseName;
  private Long purchaseCount;
  private BigDecimal revenue;

  public CourseRevenueDto(String code, String image, String courseName, Long purchaseCount,
      BigDecimal revenue) {
    this.code = code;
    this.image = image;
    this.courseName = courseName;
    this.purchaseCount = purchaseCount;
    this.revenue = revenue;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }

  public String getCourseName() {
    return courseName;
  }

  public void setCourseName(String courseName) {
    this.courseName = courseName;
  }

  public Long getPurchaseCount() {
    return purchaseCount;
  }

  public void setPurchaseCount(Long purchaseCount) {
    this.purchaseCount = purchaseCount;
  }

  public BigDecimal getRevenue() {
    return revenue;
  }

  public void setRevenue(BigDecimal revenue) {
    this.revenue = revenue;
  }
}
