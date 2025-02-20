package com.hunre.it.webstudyonline.mapper;
import com.hunre.it.webstudyonline.entity.CourseEntity;
import com.hunre.it.webstudyonline.model.dto.CourseDto;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.stream.Collectors;

@Component
public class CourseMapper {

    public CourseDto toDto(CourseEntity courseEntity){
        CourseDto courseDto = new CourseDto();
        courseDto.setId(courseEntity.getId());
        courseDto.setCode(courseEntity.getCode());
        courseDto.setName(courseEntity.getName());
        courseDto.setPrice(courseEntity.getPrice());
        courseDto.setDescription(courseEntity.getDescription());
        courseDto.setStatus(courseEntity.getStatus());
        courseDto.setDiscount(courseEntity.getDiscount());
        courseDto.setCategoryId(courseEntity.getCategoryEntity().getId());
        courseDto.setCreatedBy(courseEntity.getCreatedBy());
        courseDto.setCreatedDate(courseEntity.getCreatedDate());
        courseDto.setAim(courseEntity.getAim());
        return courseDto;
    }
    public CourseEntity toEntity(CourseDto courseDto){
        CourseEntity courseEntity = new CourseEntity();
        courseEntity.setId(courseDto.getId());
        courseEntity.setAim(courseDto.getAim());
        courseEntity.setCode(generateCourseCode(courseDto.getName()));
        courseEntity.setName(courseDto.getName());
        courseEntity.setPrice(courseDto.getPrice());
        courseEntity.setDiscount(courseDto.getDiscount());
        courseEntity.setDescription(courseDto.getDescription());
        courseEntity.setStatus(courseDto.getStatus());
        return courseEntity;
    }

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom RANDOM = new SecureRandom();
    public static String generateRandomString(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(CHARACTERS.charAt(RANDOM.nextInt(CHARACTERS.length())));
        }
        return sb.toString();
    }

    public static String generateCourseCode(String courseName) {
        String codePrefix = Arrays.stream(courseName.split(" "))
                .map(word -> word.substring(0, 1).toUpperCase())
                .collect(Collectors.joining());
        String randomSuffix = generateRandomString(6);
        return codePrefix + randomSuffix;
    }
}
