package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.mapper.AccountMapper;
import com.hunre.it.webstudyonline.mapper.RoleMapper;
import com.hunre.it.webstudyonline.model.dto.AccountDto;
import com.hunre.it.webstudyonline.model.dto.RoleDto;
import com.hunre.it.webstudyonline.repository.AccountRepository;
import com.hunre.it.webstudyonline.repository.RoleRepository;
import com.hunre.it.webstudyonline.service.IAccountService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IAccountServiceImpl implements IAccountService {
    private Logger logger = LoggerFactory.getLogger(IAccountServiceImpl.class);
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AccountMapper accountMapper;
    @Autowired
    private RoleMapper roleMapper;
    @Override
    public AccountDto findUserByUsername(String username) {
        AccountEntity accountEntity = accountRepository.findByUsername(username);
        if (accountEntity == null) {
            return null;
        }
        AccountDto accountDto = accountMapper.toDto(accountEntity);
        List<RoleDto> roleDtos = roleRepository.getRoleByUsername(accountDto.getUsername()).stream().map(roleMapper::toDto).toList();
        accountDto.setRoles(roleDtos);
        return accountDto;
    }
}
