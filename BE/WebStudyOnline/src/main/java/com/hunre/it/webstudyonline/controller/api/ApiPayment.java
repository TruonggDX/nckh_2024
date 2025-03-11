package com.hunre.it.webstudyonline.controller.api;

import com.hunre.it.webstudyonline.model.response.VNPayResponse;
import com.hunre.it.webstudyonline.service.IPaymentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class ApiPayment {
    @Autowired
    private IPaymentService paymentService;
    @GetMapping("/vn-pay")
    public VNPayResponse pay(HttpServletRequest request) {
        return paymentService.createVnPayPayment(request);
    }
    @GetMapping("/vnpay_return")
    public ResponseEntity<?> vnpayReturn(@RequestParam Map<String, String> queryParams) {
        String responseCode = queryParams.get("vnp_ResponseCode");
        if ("00".equals(responseCode)) {
            return ResponseEntity.ok(Map.of("status", "00", "message", "Payment success"));
        }
        return ResponseEntity.badRequest().body(Map.of("status", responseCode, "message", "Payment failed"));
    }

}
