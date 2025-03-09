package com.hunre.it.webstudyonline.service;

import com.hunre.it.webstudyonline.model.response.VNPayResponse;
import jakarta.servlet.http.HttpServletRequest;
public interface IPaymentService {
     VNPayResponse createVnPayPayment(HttpServletRequest request);
}