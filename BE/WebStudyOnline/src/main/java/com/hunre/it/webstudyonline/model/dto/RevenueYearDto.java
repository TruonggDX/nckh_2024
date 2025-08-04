package com.hunre.it.webstudyonline.model.dto;

import java.math.BigDecimal;

public class RevenueYearDto {

  private Integer year;
  private BigDecimal revenue;

  public RevenueYearDto(Integer year, BigDecimal revenue) {
    this.year = year;
    this.revenue = revenue;
  }

  public Integer getYear() {
    return year;
  }

  public void setYear(Integer year) {
    this.year = year;
  }

  public BigDecimal getRevenue() {
    return revenue;
  }

  public void setRevenue(BigDecimal revenue) {
    this.revenue = revenue;
  }
}
