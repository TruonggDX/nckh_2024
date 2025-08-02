package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.CategoryRevenueDto;
import com.hunre.it.webstudyonline.model.dto.CourseRevenueDto;
import com.hunre.it.webstudyonline.model.dto.RevenueMonthDto;
import com.hunre.it.webstudyonline.model.dto.RevenueWeekDto;
import com.hunre.it.webstudyonline.model.dto.RevenueYearDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import java.util.Date;
import java.util.List;

public interface IRevenueService {
  BaseResponse<List<RevenueYearDto>> getRevenueYear();
  BaseResponse<List<RevenueMonthDto>> getRevenueMonth();
  BaseResponse<List<RevenueWeekDto>> getRevenueWeek();
  BaseResponse<List<CourseRevenueDto>> getCourseRevenue();
  BaseResponse<List<CategoryRevenueDto>> getCategoryRevenue();
  byte[] exportBillDetailsToExcel(Date startDate, Date endDate);
}
