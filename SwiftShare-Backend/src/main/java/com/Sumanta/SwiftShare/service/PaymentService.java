package com.Sumanta.SwiftShare.service;

import com.Sumanta.SwiftShare.document.PaymentTransaction;
import com.Sumanta.SwiftShare.document.ProfileDocument;
import com.Sumanta.SwiftShare.dto.PaymentDTO;
import com.Sumanta.SwiftShare.dto.PaymentVerificationDTO;
import com.Sumanta.SwiftShare.repository.PaymentTransactionsRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final ProfileService profileService;
    private final UserCreditService userCreditService;
    private final PaymentTransactionsRepository paymentTransactionsRepository;
    @Value("${razorpay.key.id}")
    private String razorpayKeyId;
    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    public PaymentDTO createOrder(PaymentDTO paymentDTO) {
      try {
          ProfileDocument currentProfile = profileService.getCurrentProfile();
          String clerkId = currentProfile.getClerkId();
          RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

          JSONObject orderRequest = new JSONObject();
          orderRequest.put("amount", paymentDTO.getAmount());
          orderRequest.put("currency", paymentDTO.getCurrency());
          orderRequest.put("receipt", "order_"+System.currentTimeMillis());

          Order order = razorpayClient.orders.create(orderRequest);
          String orderId = order.get("id");

          //create pending transaction record
          PaymentTransaction transaction = PaymentTransaction.builder()
                  .clerkId(clerkId)
                  .orderId(orderId)
                  .planId(paymentDTO.getPlanId())
                  .amount(paymentDTO.getAmount())
                  .currency(paymentDTO.getCurrency())
                  .userEmail(currentProfile.getEmail())
                  .userName(currentProfile.getFirstName()+" "+currentProfile.getLastName())
                  .status("PENDING")
                  .transactionsDate(LocalDateTime.now())
                  .build();
          paymentTransactionsRepository.save(transaction);

          return PaymentDTO.builder()
                  .orderId(orderId)
                  .success(true)
                  .message("Order created Successfully")
                  .build();
      } catch (Exception e) {
          return PaymentDTO.builder()
                  .success(false)
                  .message("Error proceeding order: "+e.getMessage())
                  .build();
      }
    }

    public PaymentDTO verifyPayment(PaymentVerificationDTO request) {
        try {
            ProfileDocument currentProfile = profileService.getCurrentProfile();
            String clerkId = currentProfile.getClerkId();

            String data = request.getRazorpay_order_id() + "|" +request.getRazorpay_payment_id();
            String generateSignature = generateHmacSha256Signature(data, razorpayKeySecret);
            if (!generateSignature.equals(request.getRazorpay_signature())) {
                updateTransactionsStatus(request.getRazorpay_order_id(), "FAILED", request.getRazorpay_payment_id(), null);
                return PaymentDTO.builder()
                        .success(false)
                        .message("Payment signature verification failed")
                        .build();
            }
            //Add credits based on plan
            int creditsToAdd = 0;
            String plan = switch (request.getPlanId()) {
                case "plus" -> {
                    creditsToAdd = 500;
                    yield "Plus";
                }
                case "pro" -> {
                    creditsToAdd = 2000;
                    yield "Pro";
                }
                case "business" -> {
                    creditsToAdd = 5000;
                    yield "Business";
                }
                case "enterprise" -> {
                    creditsToAdd = 1000000000;
                    yield "Enterprise";
                }
                default -> "Starter";
            };
            if (creditsToAdd > 0) {
                userCreditService.addCredits(clerkId, creditsToAdd, plan);
                updateTransactionsStatus(request.getRazorpay_order_id(), "SUCCESS", request.getRazorpay_payment_id(), creditsToAdd);
                return PaymentDTO.builder()
                        .success(true)
                        .message("Payment verified and credits added successfully")
                        .credits(userCreditService.getUserCredits(clerkId).getCredits())
                        .build();
            } else {
                updateTransactionsStatus(request.getRazorpay_order_id(), "FAILED", request.getRazorpay_payment_id(), null);
                return PaymentDTO.builder()
                        .success(false)
                        .message("Invalid Plan Selected")
                        .build();
            }

        } catch (Exception e) {
            try {
                updateTransactionsStatus(request.getRazorpay_order_id(), "FAILED", request.getRazorpay_payment_id(), null);
            } catch (Exception ex) {
                throw new RuntimeException(ex);
            }
            return PaymentDTO.builder()
                    .success(false)
                    .message("Error verifying payment:"+e.getMessage())
                    .build();
        }
    }

    private String generateHmacSha256Signature(String data, String razorpayKeySecret) throws NoSuchAlgorithmException, InvalidKeyException {
        SecretKeySpec secretKeySpec = new SecretKeySpec(razorpayKeySecret.getBytes(), "HMACSHA256");
        javax.crypto.Mac mac = javax.crypto.Mac.getInstance("HMACSHA256");
        mac.init(secretKeySpec);
        byte[] hmacBytes = mac.doFinal(data.getBytes());

        // Convert bytes to hexadecimal string
        StringBuilder hexString = new StringBuilder();
        for (byte b : hmacBytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

    private void updateTransactionsStatus(String razorpayOrderId, String status, String razorpayPaymentId, Integer creditsToAdd) {
        paymentTransactionsRepository.findAll().stream()
                .filter(t -> t.getOrderId() != null && t.getOrderId().equals(razorpayOrderId))
                .findFirst()
                .map(transaction -> {
                    transaction.setStatus(status);
                    transaction.setPaymentId(razorpayPaymentId);
                    if (creditsToAdd != null) {
                        transaction.setCreditsAdded(creditsToAdd);
                    }
                    return paymentTransactionsRepository.save(transaction);
                })
                .orElse(null);
    }
}
