package com.Sumanta.SwiftShare.controller;

import com.Sumanta.SwiftShare.dto.PaymentDTO;
import com.Sumanta.SwiftShare.dto.PaymentVerificationDTO;
import com.Sumanta.SwiftShare.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody PaymentDTO paymentDTO) {
        // Call service method to create order
        PaymentDTO response = paymentService.createOrder(paymentDTO);

        if (response.getSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/verify-payment")
    public ResponseEntity<?> verifyPayment(@RequestBody PaymentVerificationDTO request) {
        // Use service method
        PaymentDTO response = paymentService.verifyPayment(request);
        if (response.getSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }
}
