package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.model.dto.AccountDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;
@Component
public class AccountMapper {
    @Autowired
    private RoleMapper roleMapper;
    public AccountDto toDto(AccountEntity userEntity) {
        AccountDto dto = new AccountDto();
        dto.setId(userEntity.getId());
        dto.setFullName(userEntity.getFullname());
        dto.setPhone(userEntity.getPhone());
        dto.setEmail(userEntity.getEmail());
        dto.setEnabled(userEntity.isEnabled());
        dto.setRoles(userEntity.getRoles()
                .stream()
                .map(roleMapper::toDto)
                .collect(Collectors.toSet()));
        return dto;
    }

}