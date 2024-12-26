package com.hunre.it.webstudyonline.controller.page.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/account")
public class AccountController {
    @GetMapping(value = "/list")
    public String index(){
        return "admin/account/list_account";
    }

}
