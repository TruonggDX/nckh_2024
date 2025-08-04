package com.hunre.it.webstudyonline.model.dto;

import java.math.BigDecimal;

public class CategoryRevenueDto {
  private String categoryName;
  private BigDecimal revenue;

  public CategoryRevenueDto(String categoryName, BigDecimal revenue) {
    this.categoryName = categoryName;
    this.revenue = revenue;
  }

  public String getCategoryName() {
    return categoryName;
  }

  public void setCategoryName(String categoryName) {
    this.categoryName = categoryName;
  }

  public BigDecimal getRevenue() {
    return revenue;
  }

  public void setRevenue(BigDecimal revenue) {
    this.revenue = revenue;
  }
}
