package com.hunre.it.webstudyonline.controller.api;

import com.hunre.it.webstudyonline.model.dto.CartDto;
import com.hunre.it.webstudyonline.model.request.AddCartForm;
import com.hunre.it.webstudyonline.model.request.UpdateCartForm;
import com.hunre.it.webstudyonline.model.response.BaseResponse;
import com.hunre.it.webstudyonline.service.impl.ICartServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/cart")
public class ApiCart {
    @Autowired
    private ICartServiceImpl cartService;

    @GetMapping("/{accId}")
    public ResponseEntity<BaseResponse<List<CartDto>>> getCart(@PathVariable String accId) {
        BaseResponse<List<CartDto>> response = cartService.getAllCart(accId);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/add")
    public ResponseEntity<BaseResponse<List<CartDto>>> addCart( @RequestBody List<AddCartForm> addCartForms) {
        BaseResponse<List<CartDto>> response = cartService.addCart(addCartForms);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<CartDto>> update(@PathVariable String id,@RequestBody UpdateCartForm updateCartForm) {
        BaseResponse<CartDto> response = cartService.updateQuantity(id, updateCartForm);
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/delete/{accId}")
    public ResponseEntity<BaseResponse<String>> delete(@PathVariable String accId,@RequestBody List<String> ids) {
        BaseResponse<String> response = cartService.deleteCart(accId,ids);
        return ResponseEntity.ok(response);
    }
}
