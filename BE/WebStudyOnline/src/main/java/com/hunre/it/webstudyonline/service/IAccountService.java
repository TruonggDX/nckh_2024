package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.AccountDto;

public interface IAccountService {
    AccountDto findUserByUsername(String username);
}
