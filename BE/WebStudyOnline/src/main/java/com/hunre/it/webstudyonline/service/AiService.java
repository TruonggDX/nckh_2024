package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.request.PromptRequest;
import com.hunre.it.webstudyonline.model.response.ExamAutoFillResponse;

public interface AiService {
  ExamAutoFillResponse extractExamInfo(PromptRequest promptRequest);

}
