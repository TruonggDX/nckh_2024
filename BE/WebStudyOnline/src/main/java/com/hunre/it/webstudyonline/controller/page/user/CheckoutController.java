package com.hunre.it.webstudyonline.controller.page.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/checkout")
public class CheckoutController {
    @GetMapping("/info")
    public String info(){
        return "user/checkout";
    }
}
