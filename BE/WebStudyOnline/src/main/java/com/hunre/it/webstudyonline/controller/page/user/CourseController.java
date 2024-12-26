package com.hunre.it.webstudyonline.controller.page.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/course")
public class CourseController {
    @GetMapping("list")
    public String list(){
        return "user/course";
    }
    @GetMapping("/detail_course")
    public String detail_course(){
        return "user/detail_course";
    }
}
