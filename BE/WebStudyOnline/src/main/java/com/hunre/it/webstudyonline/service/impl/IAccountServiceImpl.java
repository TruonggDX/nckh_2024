package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.entity.RoleEntity;
import com.hunre.it.webstudyonline.mapper.AccountMapper;
import com.hunre.it.webstudyonline.mapper.RoleMapper;
import com.hunre.it.webstudyonline.model.dto.AccountDto;
import com.hunre.it.webstudyonline.model.dto.RoleDto;
import com.hunre.it.webstudyonline.model.request.UpdateAccountForm;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.repository.AccountRepository;
import com.hunre.it.webstudyonline.repository.RoleRepository;
import com.hunre.it.webstudyonline.service.IAccountService;
import com.hunre.it.webstudyonline.utils.Constant;
import com.hunre.it.webstudyonline.utils.LongUtils;
import com.hunre.it.webstudyonline.utils.Utils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.management.relation.Role;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class IAccountServiceImpl implements IAccountService {
    @Autowired
    private AccountMapper accountMapper;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private IRoleServiceImpl roleServiceImpl;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private RoleMapper roleMapper;

    @Override
    public ResponsePage<List<AccountDto>> getAllAccounts(Pageable pageable) {
        ResponsePage<List<AccountDto>> responsePage = new ResponsePage<>();
        Page<AccountEntity> page = accountRepository.findByDeletedFalseWithRoles(pageable);  // Dùng phương thức với fetch join
        List<AccountDto> accountDtos = page.getContent().stream().map(account -> {
            AccountDto accountDto = accountMapper.toDto(account);
            Set<RoleDto> roleDtos = account.getRoles().stream()
                    .map(roleMapper::toDto)
                    .collect(Collectors.toSet());
            accountDto.setRoles(roleDtos);
            Set<Long> roleId = account.getRoles().stream().map(RoleEntity::getId).collect(Collectors.toSet());
            accountDto.setRoleIds(roleId);
            return accountDto;
        }).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(accountDtos);
        return responsePage;
    }


    @Override
    public ResponsePage<List<AccountDto>> findUserByCondition(Pageable pageable, String fullname, String email) {
        ResponsePage<List<AccountDto>> responsePage = new ResponsePage<>();
        Page<AccountEntity> page= accountRepository.findByCondition(fullname, email,   pageable);
        List<AccountDto> accountDtos = page.getContent().stream().map(accountMapper::toDto).collect(Collectors.toList());
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(accountDtos);
        return responsePage;
    }

    @Override
    public ResponsePage<List<AccountDto>> findUserByRole(Pageable pageable, String fullname, String email, String roleCode) {
        ResponsePage<List<AccountDto>> responsePage = new ResponsePage<>();
        Page<AccountEntity> page= accountRepository.findByRoleCode(fullname, email,roleCode,pageable);
        List<AccountDto> accountDtos = page.getContent().stream().map(accountMapper::toDto).collect(Collectors.toList());
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(accountDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<AccountDto> update(String id, UpdateAccountForm updateAccountForm) {
        BaseResponse<AccountDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT()== null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long AccountId = utils.getT();
        Optional<AccountEntity> check = accountRepository.findById(AccountId);
        if (check.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        AccountEntity accountEntity = check.get();
        accountEntity.setFullname(updateAccountForm.getFullName());
        Set<RoleEntity> RoleEntities = roleServiceImpl.findByRoleCode(updateAccountForm.getRoleCode());
        for (RoleEntity roleEntity : RoleEntities){
            accountEntity.setRoles(RoleEntities);
        }
        accountRepository.save(accountEntity);
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        response.setData(accountMapper.toDto(accountEntity));
        return response;
    }

    @Override
    public BaseResponse<AccountDto> delete(String id) {
        BaseResponse<AccountDto> response = new BaseResponse<>();
        Utils<Long> utils = LongUtils.strToLong(id);
        if (utils.getT()== null){
            response.setCode(utils.getCode());
            response.setMessage(utils.getMsg());
            return response;
        }
        Long AccountId = utils.getT();
        Optional<AccountEntity> check = accountRepository.findById(AccountId);
        if (check.isEmpty()){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
            return response;
        }
        AccountEntity accountEntity = check.get();
        accountEntity.setDeleted(true);
        accountRepository.save(accountEntity);
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        response.setData(accountMapper.toDto(accountEntity));
        return response;
    }

    @Override
    public AccountDto findById(Long id){
        AccountEntity accountEntity = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account not found"));
        AccountDto accountDto = accountMapper.toDto(accountEntity);
        return accountDto;
    }
}
