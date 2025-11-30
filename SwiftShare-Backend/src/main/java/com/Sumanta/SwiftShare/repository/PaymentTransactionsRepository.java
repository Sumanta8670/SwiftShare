package com.Sumanta.SwiftShare.repository;

import com.Sumanta.SwiftShare.document.PaymentTransaction;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PaymentTransactionsRepository extends MongoRepository<PaymentTransaction, String> {

    List<PaymentTransaction> findByClerkId(String clerkId);

    // Fixed: Orderby -> OrderBy, TransactionDate -> TransactionsDate
    List<PaymentTransaction> findByClerkIdOrderByTransactionsDateDesc(String clerkId);

    // Fixed: Orderby -> OrderBy, TransactionDate -> TransactionsDate
    List<PaymentTransaction> findByClerkIdAndStatusOrderByTransactionsDateDesc(String clerkId, String status);
}