package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.dto.CategoryDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICategoryService {
    ResponsePage<List<CategoryDto>> getAllCategories(Pageable pageable);
    BaseResponse<CategoryDto> addCategory(CategoryDto categoryDto);
    BaseResponse<CategoryDto> updateCategory(Long id,CategoryDto categoryDto);
    BaseResponse<CategoryDto> deleteCategory(Long id);
    BaseResponse<CategoryDto> getCategoryById(Long id);

}
