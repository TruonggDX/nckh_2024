package com.hunre.it.webstudyonline.controller.api;

import com.hunre.it.webstudyonline.model.dto.CertificateDto;
import com.hunre.it.webstudyonline.model.dto.ExamDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.service.IExamService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exam")
public class ApiExam {
    @Autowired
    private IExamService iExamService;
    @GetMapping("/list")
    public ResponseEntity<ResponsePage<List<ExamDto>>> getAll(Pageable pageable) {
        ResponsePage<List<ExamDto>> responsePage = iExamService.getAll(pageable);
        return ResponseEntity.ok(responsePage);
    }
    @PostMapping
    public ResponseEntity<BaseResponse<ExamDto>> create(@Valid @RequestBody ExamDto examDto) {
        BaseResponse<ExamDto> exam = iExamService.addExam(examDto);
        return ResponseEntity.ok(exam);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<ExamDto>> update(@Valid @RequestBody ExamDto examDto, @PathVariable String id) {
        BaseResponse<ExamDto> exam = iExamService.updateExam(id, examDto);
        return ResponseEntity.ok(exam);
    }
    @GetMapping("/findById/{id}")
    public ResponseEntity<BaseResponse<ExamDto>> getById(@PathVariable String id) {
        BaseResponse<ExamDto> exam = iExamService.getExamById(id);
        return ResponseEntity.ok(exam);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<ExamDto>> delete(@PathVariable String id) {
        BaseResponse<ExamDto> baseResponse = iExamService.deleteExam(id);
        return ResponseEntity.ok(baseResponse);
    }

    @GetMapping("/findByAttribute")
    public ResponseEntity<ResponsePage<List<ExamDto>>> findExamByCodeAndName(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String code,
            Pageable pageable) {
        ResponsePage<List<ExamDto>> response = iExamService.findByCodeAndName(name, code, pageable);
        return ResponseEntity.ok(response);
    }
}
