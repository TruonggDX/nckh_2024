package com.hunre.it.webstudyonline.controller.api;

import com.hunre.it.webstudyonline.model.dto.AccountDto;
import com.hunre.it.webstudyonline.model.dto.CertificateDto;
import com.hunre.it.webstudyonline.model.request.ChagePasswordRequest;
import com.hunre.it.webstudyonline.model.request.UpdateAccountForm;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.service.IAccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/account")
@CrossOrigin(origins = "http://localhost:3000")
public class ApiAccount {
    @Autowired
    private IAccountService accountService;

    @GetMapping("/list")
    public ResponseEntity<ResponsePage<List<AccountDto>>> getAll(Pageable pageable) {
        ResponsePage<List<AccountDto>> responsePage = accountService.getAllAccounts(pageable);
        return ResponseEntity.ok(responsePage);
    }

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
    public ResponseEntity<BaseResponse<AccountDto>> update(@ModelAttribute @Valid UpdateAccountForm updateAccountForm, @PathVariable String id, @RequestParam("file") MultipartFile file) {
        BaseResponse<AccountDto> response = accountService.update(id, updateAccountForm,file);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<AccountDto>> delete(@PathVariable String id) {
        BaseResponse<AccountDto> response = accountService.delete(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getUser")
    public ResponseEntity<BaseResponse<AccountDto>> getCurrentUser() {
        BaseResponse<AccountDto> response = accountService.getAccount();
        if (response.getCode() == HttpStatus.OK.value()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(response.getCode()).body(response);
        }
    }
    @PutMapping("/updatePassWord/{id}")
    public ResponseEntity<BaseResponse<?>> updatePass(@PathVariable String id, @RequestBody ChagePasswordRequest chagePasswordRequest) {
        BaseResponse<?> response = accountService.changePassword(id, chagePasswordRequest);
        return ResponseEntity.ok(response);
    }
}
