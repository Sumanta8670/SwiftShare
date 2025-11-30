package com.Sumanta.SwiftShare.controller;

import com.Sumanta.SwiftShare.document.PaymentTransaction;
import com.Sumanta.SwiftShare.document.ProfileDocument;
import com.Sumanta.SwiftShare.repository.PaymentTransactionsRepository;
import com.Sumanta.SwiftShare.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final PaymentTransactionsRepository paymentTransactionsRepository;
    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<?> getUserTransactions() {
        ProfileDocument currentProfile = profileService.getCurrentProfile();
        String clerkId = currentProfile.getClerkId();

        List<PaymentTransaction> transactions = paymentTransactionsRepository.findByClerkIdAndStatusOrderByTransactionsDateDesc(clerkId, "SUCCESS");
        return ResponseEntity.ok(transactions);
    }
}
