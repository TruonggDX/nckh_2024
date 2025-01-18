package com.hunre.it.webstudyonline.utils;

import com.hunre.it.webstudyonline.model.response.BaseResponse;
import jakarta.validation.ValidationException;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class DateUtils {

    public static final String YYYYMMDD = "yyyy-MM-dd";

    public static LocalDate strToDate(String date) {
        if (StringUtils.isEmpty(date)) {
            throw new ValidationException (Constant.HTTP_MESSAGE.EMPTY);
        }
        return LocalDate.parse(date, DateTimeFormatter.ofPattern(YYYYMMDD));
    }
}
