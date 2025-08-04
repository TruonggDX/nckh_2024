package com.hunre.it.webstudyonline.model.dto;

import jakarta.persistence.Id;
import java.math.BigDecimal;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "courses")
public class CourseIndex {

  @Id
  private Long id;
  private String name;
  private String code;
  private String description;
  private String status;
  private Integer discount;
  private String aim;
  private BigDecimal price;
  private String imageUrl;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public Integer getDiscount() {
    return discount;
  }

  public void setDiscount(Integer discount) {
    this.discount = discount;
  }

  public String getAim() {
    return aim;
  }

  public void setAim(String aim) {
    this.aim = aim;
  }

  public BigDecimal getPrice() {
    return price;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }
}