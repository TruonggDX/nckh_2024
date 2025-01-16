package com.hunre.it.webstudyonline.controller.resource;

import com.hunre.it.webstudyonline.model.dto.CategoryDto;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.model.response.ResponsePage;
import com.hunre.it.webstudyonline.service.ICategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    private ICategoryService categoryService;

    @GetMapping("/list")
    public ResponseEntity<ResponsePage<List<CategoryDto>>> getAll(Pageable pageable) {
        ResponsePage<List<CategoryDto>> responsePage = categoryService.getAllCategories(pageable);
        return ResponseEntity.ok(responsePage);
    }
    @PostMapping
    public ResponseEntity<BaseResponse<CategoryDto>> create(@Valid @RequestBody CategoryDto categoryDto) {
        BaseResponse<CategoryDto> category = categoryService.addCategory(categoryDto);
        return ResponseEntity.ok(category);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<CategoryDto>> update(@Valid @RequestBody CategoryDto categoryDto, @PathVariable Long id) {
        BaseResponse<CategoryDto> category = categoryService.updateCategory(id, categoryDto);
        return ResponseEntity.ok(category);
    }
    @GetMapping("/findById/{id}")
    public ResponseEntity<BaseResponse<CategoryDto>> getById(@PathVariable Long id) {
        BaseResponse<CategoryDto> category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(category);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse> delete(@PathVariable Long id) {
        BaseResponse baseResponse = categoryService.deleteCategory(id);
        return ResponseEntity.ok(baseResponse);
    }


}
