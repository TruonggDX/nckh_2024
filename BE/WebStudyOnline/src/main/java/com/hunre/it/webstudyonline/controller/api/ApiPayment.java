package com.hunre.it.webstudyonline.controller.api;

import com.hunre.it.webstudyonline.model.request.MomoRequest;
import com.hunre.it.webstudyonline.model.response.VNPayResponse;
import com.hunre.it.webstudyonline.service.IPaymentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


    //MOMO
    @PostMapping()
    public ResponseEntity<String> momoPayment(@RequestBody MomoRequest paymentRequest) {
        String response = paymentService.createPaymentRequest(paymentRequest.getAmount());
        return ResponseEntity.ok(response);
    }
    @GetMapping("/order-status/{orderId}")
    public ResponseEntity<String> checkPaymentStatus(@PathVariable String orderId) {
        String response = paymentService.checkPaymentStatus(orderId);
        return ResponseEntity.ok(response);
    }

    //Zalo Pay
    @PostMapping("/create-zalopay")
    public ResponseEntity<String> createPayment(@RequestBody Map<String, Object> orderRequest) {
        try {
            String response = paymentService.createOrder(orderRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @GetMapping("/order-status-zalopay/{appTransId}")
    public ResponseEntity<String> getOrderStatus(@PathVariable String appTransId) {
        String response = paymentService.getOrderStatus(appTransId);
        return ResponseEntity.ok(response);
    }


}
