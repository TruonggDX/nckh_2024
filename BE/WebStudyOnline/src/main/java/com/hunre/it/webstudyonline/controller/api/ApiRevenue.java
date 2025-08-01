package com.hunre.it.webstudyonline.controller.api;

import com.hunre.it.webstudyonline.model.dto.CourseRevenueDto;
import com.hunre.it.webstudyonline.model.dto.RevenueMonthDto;
import com.hunre.it.webstudyonline.model.dto.RevenueWeekDto;
import com.hunre.it.webstudyonline.model.dto.RevenueYearDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.service.IRevenueService;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/revenue")
public class ApiRevenue {
  @Autowired
  private IRevenueService revenueService;

  @GetMapping("/year")
  public ResponseEntity<BaseResponse<List<RevenueYearDto>>> getRevenueByYear() {
    BaseResponse<List<RevenueYearDto>> response = revenueService.getRevenueYear();
    return ResponseEntity.ok(response);
  }

  @GetMapping("/month")
  public ResponseEntity<BaseResponse<List<RevenueMonthDto>>> getRevenueByMonth() {
    BaseResponse<List<RevenueMonthDto>> response = revenueService.getRevenueMonth();
    return ResponseEntity.ok(response);
  }

  @GetMapping("/week")
  public ResponseEntity<BaseResponse<List<RevenueWeekDto>>> getRevenueByWeek() {
    BaseResponse<List<RevenueWeekDto>> response = revenueService.getRevenueWeek();
    return ResponseEntity.ok(response);
  }

  @GetMapping("/course")
  public ResponseEntity<BaseResponse<List<CourseRevenueDto>>> getRevenueByCourse() {
    BaseResponse<List<CourseRevenueDto>> response = revenueService.getCourseRevenue();
    return ResponseEntity.ok(response);
  }

  @GetMapping("/export")
  public ResponseEntity<byte[]> exportRevenue(
      @RequestParam(value = "startDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
      @RequestParam(value = "endDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate
  ) {
    byte[] response = revenueService.exportBillDetailsToExcel(startDate, endDate);

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
    headers.setContentDispositionFormData("attachment", "bill_details_" + System.currentTimeMillis() + ".xlsx");

    return ResponseEntity.ok().headers(headers).body(response);
  }
}
