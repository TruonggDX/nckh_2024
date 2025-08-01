package com.hunre.it.webstudyonline.model.dto;

import java.math.BigDecimal;

public class RevenueWeekDto {

  private Integer year;
  private Integer week;
  private BigDecimal revenue;

  public RevenueWeekDto(Integer year, Integer week, BigDecimal revenue) {
    this.year = year;
    this.week = week;
    this.revenue = revenue;
  }

  public Integer getYear() {
    return year;
  }

  public void setYear(Integer year) {
    this.year = year;
  }

  public Integer getWeek() {
    return week;
  }

  public void setWeek(Integer week) {
    this.week = week;
  }

  public BigDecimal getRevenue() {
    return revenue;
  }

  public void setRevenue(BigDecimal revenue) {
    this.revenue = revenue;
  }
}
