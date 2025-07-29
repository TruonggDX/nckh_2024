package com.hunre.it.webstudyonline.controller;

import com.hunre.it.webstudyonline.model.request.PromptRequest;
import com.hunre.it.webstudyonline.model.response.ExamAutoFillResponse;
import com.hunre.it.webstudyonline.service.AiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/ai")
public class AiController2 {

  private final AiService aiService;

  public AiController2(AiService aiService) {
    this.aiService = aiService;
  }

  @PostMapping("/preview")
  public ResponseEntity<ExamAutoFillResponse> previewFromAi(
      @RequestBody PromptRequest promptRequest) {
    ExamAutoFillResponse response = aiService.extractExamInfo(promptRequest);
    return ResponseEntity.ok(response);
  }

}
