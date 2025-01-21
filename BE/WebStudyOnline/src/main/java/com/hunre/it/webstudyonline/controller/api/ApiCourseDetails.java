package com.hunre.it.webstudyonline.controller.api;

import com.hunre.it.webstudyonline.model.dto.CourseDetailsDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.service.ICourseDetailsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coursedetails")
public class ApiCourseDetails {
    @Autowired
    private ICourseDetailsService courseDetailsService;

    @GetMapping("/list/{id}")
    public ResponseEntity<BaseResponse<List<CourseDetailsDto>>> getCourseDetails(@PathVariable String id) {
        BaseResponse<List<CourseDetailsDto>> response = courseDetailsService.getAll(id);
        return ResponseEntity.ok(response);
    }
    @PostMapping
    public ResponseEntity<BaseResponse<CourseDetailsDto>> addCourseDetails(@RequestBody @Valid CourseDetailsDto courseDetailsDto) {
        BaseResponse<CourseDetailsDto> response = courseDetailsService.addCourseDetails(courseDetailsDto);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<CourseDetailsDto>> updateCourseDetails(@PathVariable String id, @RequestBody @Valid CourseDetailsDto dto) {
        BaseResponse<CourseDetailsDto> response = courseDetailsService.updateCourseDetails(id, dto);
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<CourseDetailsDto>> deleteCourseDetails(@PathVariable String id) {
        BaseResponse<CourseDetailsDto> response = courseDetailsService.deleteCourseDetails(id);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/findById/{id}")
    public ResponseEntity<BaseResponse<CourseDetailsDto>> getCourseDetailsById(@PathVariable String id) {
        BaseResponse<CourseDetailsDto> response = courseDetailsService.getCourseDetailsById(id);
        return ResponseEntity.ok(response);
    }
}
