package com.hunre.it.webstudyonline.controller.page.auth;

import com.hunre.it.webstudyonline.model.dto.AccountDto;
import com.hunre.it.webstudyonline.model.dto.RoleDto;
import com.hunre.it.webstudyonline.service.IAccountService;
import com.hunre.it.webstudyonline.utils.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Set;

@Controller
public class AuthController {
    @Autowired
    private IAccountService iAccountService;
    @RequestMapping(value = {"/","/login"})
    public String loginPage(){
        return "auth/login";
    }
    @GetMapping(value = "/process-after-login")
    public String processAfterLogin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        AccountDto accountDTO = iAccountService.findUserByUsername(username);
        if (accountDTO != null) {
            return handleRolesAccount(accountDTO.getRoles());
        }
        return "redirect:/logout";
    }

    private String handleRolesAccount(List<RoleDto> roleDtos) {
        if (CollectionUtils.isEmpty(roleDtos)) {
            return "redirect:/logout";
        }

        boolean isAdmin = false;
        boolean isEmployee = false;
        boolean isUser = false;


        for (RoleDto roleDto : roleDtos) {
            if (Constant.ROLE_ADMIN.equalsIgnoreCase(roleDto.getName())) {
                isAdmin = true;
            }
            if (Constant.ROLE_EMPLOYEE.equalsIgnoreCase(roleDto.getName())) {
                isEmployee = true;
            }
            if (Constant.ROLE_USER.equalsIgnoreCase(roleDto.getName())) {
                isUser = true;
            }
        }

        if (isAdmin){
            return "redirect:/admin/dashbroad";
        }
        if (isEmployee){
            return "redirect:/admin/dashbroad";
        }
        if (isUser){
            return "redirect:/dashbroad/home";
        }
        return "redirect:/logout";
    }

}
