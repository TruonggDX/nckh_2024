package com.hunre.it.webstudyonline.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hunre.it.webstudyonline.model.request.PromptRequest;
import com.hunre.it.webstudyonline.model.response.ExamAutoFillResponse;
import com.hunre.it.webstudyonline.service.AiService;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AiServiceImpl implements AiService {

  private static final Logger logger = LoggerFactory.getLogger(AiServiceImpl.class);

  @Value("${genmini.api.key}")
  private String apiKey;

  @Value("${genmini.api.url}")
  private String genMiniUrl;

  private final ObjectMapper objectMapper = new ObjectMapper();

  @Override
  public ExamAutoFillResponse extractExamInfo(PromptRequest promptRequest) {
    String inputText = promptRequest.getInputText();
    String prompt = """
        Tôi cần bạn tạo một bài thi trắc nghiệm tiếng Anh với yêu cầu sau:
        "%s"
        Trả về CHỈ JSON thuần túy theo định dạng sau, KHÔNG thêm backtick (`), không dùng markdown, không có ký tự thừa:
        {
          "name": "Tên đề thi",
          "duration": 60, // Thời gian làm bài tính theo phút
          "numberQuestion": 10,
          "details": [
            {
              "name": "1", // Số thứ tự câu hỏi (từ 1 đến numberQuestion)
              "answer": "A", // Đáp án đúng (A, B, C, hoặc D)
              "description": "Câu hỏi? A. Đáp án A | B. Đáp án B | C. Đáp án C | D. Đáp án D",
              "url": null
            }
            // Thêm các câu hỏi khác tương ứng với numberQuestion
          ]
        }
        Nếu không thể tạo đủ câu hỏi, trả về mảng details rỗng. Đảm bảo JSON hợp lệ và khớp với numberQuestion.
        """.formatted(inputText);

    try {
      String response = callGenMini(prompt);
      JsonNode jsonNode = objectMapper.readTree(response);
      String contentText = jsonNode.path("candidates").get(0).path("content").path("parts").get(0)
          .path("text").asText();
      contentText = contentText.replace("`", "").trim();
      ExamAutoFillResponse result = objectMapper.readValue(contentText, ExamAutoFillResponse.class);
      if (result.getDetails() == null) {
        result.setDetails(new ArrayList<>());
      }
      return result;
    } catch (Exception e) {
      logger.error("Error processing GenMini", e);
      throw new RuntimeException("Lỗi xử lý GenMini: " + e.getMessage(), e);
    }
  }

  private String callGenMini(String prompt) {
    try {
      URL url = new URL(genMiniUrl + "?key=" + apiKey);
      HttpURLConnection conn = (HttpURLConnection) url.openConnection();

      conn.setRequestMethod("POST");
      conn.setRequestProperty("Content-Type", "application/json; utf-8");
      conn.setRequestProperty("Accept", "application/json");
      conn.setDoOutput(true);
      Map<String, Object> content = Map.of("parts", List.of(Map.of("text", prompt)));
      Map<String, Object> requestBody = Map.of("contents", List.of(content));
      String jsonInputString = objectMapper.writeValueAsString(requestBody);
      try (OutputStream os = conn.getOutputStream()) {
        byte[] input = jsonInputString.getBytes(StandardCharsets.UTF_8);
        os.write(input, 0, input.length);
      }
      int responseCode = conn.getResponseCode();
      if (responseCode == HttpURLConnection.HTTP_OK) {
        try (BufferedReader br = new BufferedReader(
            new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
          StringBuilder response = new StringBuilder();
          String responseLine;
          while ((responseLine = br.readLine()) != null) {
            response.append(responseLine.trim());
          }
          conn.disconnect();
          return response.toString();
        }
      } else {
        try (BufferedReader br = new BufferedReader(
            new InputStreamReader(conn.getErrorStream(), StandardCharsets.UTF_8))) {
          StringBuilder error = new StringBuilder();
          String errorLine;
          while ((errorLine = br.readLine()) != null) {
            error.append(errorLine.trim());
          }
          conn.disconnect();
          throw new RuntimeException(
              "Không thể kết nối tới Gemini API. Mã lỗi: " + responseCode + ", Chi tiết: "
                  + error.toString());
        }
      }
    } catch (Exception e) {
      logger.error("Error calling Gemini", e);
      throw new RuntimeException("Lỗi khi gọi Gemini: " + e.getMessage(), e);
    }
  }
}