package com.hunre.it.webstudyonline.service.impl;

import com.hunre.it.webstudyonline.entity.BillDetailsEntity;
import com.hunre.it.webstudyonline.model.dto.CategoryRevenueDto;
import com.hunre.it.webstudyonline.model.dto.CourseRevenueDto;
import com.hunre.it.webstudyonline.model.dto.RevenueMonthDto;
import com.hunre.it.webstudyonline.model.dto.RevenueWeekDto;
import com.hunre.it.webstudyonline.model.dto.RevenueYearDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.repository.BillDetailsRepository;
import com.hunre.it.webstudyonline.service.IRevenueService;
import com.hunre.it.webstudyonline.utils.Constant.HTTP_MESSAGE;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class IRevenueServiceImpl implements IRevenueService {

  @Autowired
  private BillDetailsRepository billDetailsRepository;

  @Override
  public BaseResponse<List<RevenueYearDto>> getRevenueYear() {
    BaseResponse<List<RevenueYearDto>> response = new BaseResponse<>();
    List<RevenueYearDto> list = billDetailsRepository.getRevenueYears();
    response.setData(list);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public BaseResponse<List<RevenueMonthDto>> getRevenueMonth() {
    BaseResponse<List<RevenueMonthDto>> response = new BaseResponse<>();
    List<RevenueMonthDto> list = billDetailsRepository.getRevenueMonths();
    response.setData(list);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }

  @Override
  public BaseResponse<List<RevenueWeekDto>> getRevenueWeek() {
    BaseResponse<List<RevenueWeekDto>> response = new BaseResponse<>();
    List<RevenueWeekDto> list = billDetailsRepository.getRevenueWeeks();
    response.setData(list);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }


  @Override
  public BaseResponse<List<CourseRevenueDto>> getCourseRevenue() {
    BaseResponse<List<CourseRevenueDto>> response = new BaseResponse<>();
    List<CourseRevenueDto> list = billDetailsRepository.getCourseRevenues();
    response.setData(list);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }


  @Override
  public BaseResponse<List<CategoryRevenueDto>> getCategoryRevenue() {
    BaseResponse<List<CategoryRevenueDto>> response = new BaseResponse<>();
    List<CategoryRevenueDto> list = billDetailsRepository.getCategoryRevenues();
    response.setData(list);
    response.setMessage(HTTP_MESSAGE.SUCCESS);
    response.setCode(HttpStatus.OK.value());
    return response;
  }


  @Override
  public byte[] exportBillDetailsToExcel(Date startDate, Date endDate) {
    LocalDateTime startDateTime = startDate != null ?
        startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime() : null;
    LocalDateTime endDateTime = endDate != null ?
        endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime() : null;

    List<BillDetailsEntity> list = billDetailsRepository.findCreatedDateBetween(startDateTime, endDateTime);
    try(Workbook workbook = new XSSFWorkbook()) {
      Sheet sheet = workbook.createSheet("Bill Details");

      CellStyle headerCellStyle = workbook.createCellStyle();
      Font headerFont = workbook.createFont();
      headerFont.setBold(true);
      headerCellStyle.setFont(headerFont);

      CellStyle dateCellStyle = workbook.createCellStyle();
      CreationHelper createHelper = workbook.getCreationHelper();
      dateCellStyle.setDataFormat(createHelper.createDataFormat().getFormat("dd/MM/yyyy HH:mm"));

      Row headerRow = sheet.createRow(0);
      String[] headers = {"ID", "Bill Code", "Course Name", "Price", "Quantity", "Created Date"};

      for (int i = 0; i < headers.length; i++) {
        Cell cell = headerRow.createCell(i);
        cell.setCellValue(headers[i]);
        cell.setCellStyle(headerCellStyle);
      }

      int rowNum = 1;
      for (BillDetailsEntity billDetailsEntity : list) {
        Row row = sheet.createRow(rowNum++);
        row.createCell(0).setCellValue(rowNum - 1);
        row.createCell(1).setCellValue(billDetailsEntity.getBillEntity().getCode());
        row.createCell(2).setCellValue(billDetailsEntity.getCourseEntity().getName());
        row.createCell(3).setCellValue(billDetailsEntity.getPrice().doubleValue());
        row.createCell(4).setCellValue(billDetailsEntity.getQuantity());
        Cell dateCell = row.createCell(5);
        dateCell.setCellValue(
            Date.from(billDetailsEntity.getCreatedDate().atZone(ZoneId.systemDefault()).toInstant())
        );
        dateCell.setCellStyle(dateCellStyle);
      }

      for(int i = 0; i < headers.length; i++) {
        sheet.autoSizeColumn(i);
      }

      ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
      workbook.write(outputStream);
      return outputStream.toByteArray();
    } catch (IOException e) {
      throw new RuntimeException("Failed: " + e.getMessage());
    }
  }
}
