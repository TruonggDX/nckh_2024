package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.AccountDto;
import com.hunre.it.webstudyonline.model.request.UpdateAccountForm;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IAccountService {
    ResponsePage<List<AccountDto>> getAllAccounts(Pageable pageable);
    ResponsePage<List<AccountDto>> findUserByCondition(Pageable pageable, String fullname, String email);
    ResponsePage<List<AccountDto>> findUserByRole(Pageable pageable, String fullname, String email,String roleCode);
    BaseResponse<AccountDto> update(String id, UpdateAccountForm updateAccountForm);
    BaseResponse<AccountDto> delete(String id);
    AccountDto findById(Long id);
}
