package com.hunre.it.webstudyonline.controller.api;

import com.hunre.it.webstudyonline.model.dto.AccountDto;
import com.hunre.it.webstudyonline.model.request.UpdateAccountForm;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.service.IAccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/account")
@CrossOrigin(origins = "http://localhost:3000")
public class ApiAccount {
    @Autowired
    private IAccountService accountService;

    @GetMapping("/findByCondition")
    public ResponseEntity<ResponsePage<List<AccountDto>>> findByCondition( @RequestParam(value = "name") String name, Pageable pageable, @RequestParam String email) {
        ResponsePage<List<AccountDto>> respondPage = accountService.findUserByCondition(pageable,name,email);
        return ResponseEntity.ok(respondPage);
    }

    @GetMapping("/findByRole")
    public ResponseEntity<ResponsePage<List<AccountDto>>> findByRole( @RequestParam(value = "name") String name, Pageable pageable, @RequestParam String email,@RequestParam String roleCode) {
        ResponsePage<List<AccountDto>> respondPage = accountService.findUserByRole(pageable,name,email,roleCode);
        return ResponseEntity.ok(respondPage);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<AccountDto>> update(@RequestBody @Valid UpdateAccountForm updateAccountForm, @PathVariable String id) {
        BaseResponse<AccountDto> response = accountService.update(id, updateAccountForm);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<AccountDto>> delete(@PathVariable String id) {
        BaseResponse<AccountDto> response = accountService.delete(id);
        return ResponseEntity.ok(response);
    }
}
