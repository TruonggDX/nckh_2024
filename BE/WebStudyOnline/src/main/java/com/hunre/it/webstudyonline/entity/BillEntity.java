package com.hunre.it.webstudyonline.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.ToString;

import java.math.BigDecimal;

@Entity
@Table(name = "bill")

public class BillEntity extends AbstractEntity {
    private String code;
    private BigDecimal amount;
    @ManyToOne
    @JoinColumn(name = "account_id")
    @ToString.Exclude
    private AccountEntity accountEntity;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public AccountEntity getAccountEntity() {
        return accountEntity;
    }

    public void setAccountEntity(AccountEntity accountEntity) {
        this.accountEntity = accountEntity;
    }
}
