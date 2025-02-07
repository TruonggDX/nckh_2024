package com.hunre.it.webstudyonline.model.request;

import com.hunre.it.webstudyonline.model.dto.CourseDto;
import com.hunre.it.webstudyonline.model.dto.RoadmapDto;

import java.util.Map;
import java.util.Set;

public class AddCartForm {
    private Long accountId;
    private Integer quantity;
    private Long itemId;
    private String type;

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

}
