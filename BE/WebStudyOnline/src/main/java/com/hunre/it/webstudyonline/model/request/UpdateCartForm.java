package com.hunre.it.webstudyonline.model.request;

public class UpdateCartForm {
    private Long accountId;
    private Integer quantity;

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
