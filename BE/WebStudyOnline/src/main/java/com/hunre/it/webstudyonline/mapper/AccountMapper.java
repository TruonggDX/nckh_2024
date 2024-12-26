package com.hunre.it.webstudyonline.mapper;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.model.dto.AccountDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")

public interface AccountMapper {
    AccountDto toDto(AccountEntity accountEntity);
    AccountEntity toEntity(AccountDto accountDto);

}
