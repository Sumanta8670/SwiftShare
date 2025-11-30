package com.Sumanta.SwiftShare.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "payment_transactions")
public class PaymentTransaction {

    @Id
    private String id;

    private String userName;
    private String userEmail;

    @Indexed
    private String clerkId;

    private String orderId;
    private String paymentId;
    private String planId;
    private int amount;
    private String currency;
    private int creditsAdded;

    @Indexed
    private String status;

    private LocalDateTime transactionsDate;
}