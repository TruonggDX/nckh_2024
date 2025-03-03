package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.entity.BillEntity;
import com.hunre.it.webstudyonline.model.dto.BillDto;
import com.hunre.it.webstudyonline.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BillMapper {
    @Autowired
    private AccountRepository accountRepository;

    public BillDto toDto(BillEntity billEntity) {
        BillDto billDto = new BillDto();
        billDto.setId(billEntity.getId());
        billDto.setCode(billEntity.getCode());
        billDto.setAccountId(billEntity.getAccountEntity().getId());
        billDto.setAccountName(billEntity.getAccountEntity().getFullname());
        billDto.setCreatedDate(billEntity.getCreatedDate());
        return billDto;
    }

    public BillEntity toEntity(BillDto billDto){
        BillEntity billEntity = new BillEntity();
        billEntity.setId(billDto.getId());
        billEntity.setCode(billDto.getCode());
        AccountEntity accountEntity = accountRepository.findById(billDto.getAccountId()).orElseThrow(()-> new RuntimeException("User not found"));
        billEntity.setAccountEntity(accountEntity);
        return billEntity;
    }
}
