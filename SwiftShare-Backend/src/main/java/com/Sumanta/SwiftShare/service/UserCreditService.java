package com.Sumanta.SwiftShare.service;

import com.Sumanta.SwiftShare.document.ProfileDocument;
import com.Sumanta.SwiftShare.document.UserCredits;
import com.Sumanta.SwiftShare.repository.ProfileRepository;
import com.Sumanta.SwiftShare.repository.UserCreditsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserCreditService {

    private final UserCreditsRepository userCreditsRepository;
    private final ProfileRepository profileRepository;

    public UserCredits createInitialCredits(String clerkId) {
        log.info("Creating initial credits for clerkId: {}", clerkId);

        // Check if credits already exist
        Optional<UserCredits> existing = userCreditsRepository.findByClerkId(clerkId);
        if (existing.isPresent()) {
            log.info("Credits already exist for clerkId: {}", clerkId);
            return existing.get();
        }

        UserCredits userCredits = UserCredits.builder()
                .clerkId(clerkId)
                .credits(5)
                .plan("STARTER")
                .build();
        UserCredits saved = userCreditsRepository.save(userCredits);
        log.info("Initial credits created successfully with id: {}", saved.getId());
        return saved;
    }

    public UserCredits getUserCredits(String clerkId) {
        return userCreditsRepository.findByClerkId(clerkId)
                .orElseGet(() -> createInitialCredits(clerkId));
    }

    public UserCredits getUserCredits() {
        String clerkId = getCurrentClerkId();
        return getUserCredits(clerkId);
    }

    public Boolean hasEnoughCredits(int requiredCredits) {
        UserCredits userCredits = getUserCredits();
        return userCredits.getCredits() >= requiredCredits;
    }

    public UserCredits consumeCredits() {
        UserCredits userCredits = getUserCredits();
        if (userCredits.getCredits() <= 0) {
            throw new RuntimeException("Insufficient credits. Please purchase more credits.");
        }
        userCredits.setCredits(userCredits.getCredits() - 1);
        log.info("Consumed 1 credit. Remaining: {}", userCredits.getCredits());
        return userCreditsRepository.save(userCredits);
    }

    public void deleteCredits(String clerkId) {
        log.info("Deleting credits for clerkId: {}", clerkId);
        Optional<UserCredits> credits = userCreditsRepository.findByClerkId(clerkId);
        if (credits.isPresent()) {
            userCreditsRepository.delete(credits.get());
            log.info("Credits deleted successfully");
        } else {
            log.warn("No credits found for clerkId: {}", clerkId);
        }
    }

    private String getCurrentClerkId() {
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            throw new UsernameNotFoundException("User not authenticated");
        }
        String clerkId = SecurityContextHolder.getContext().getAuthentication().getName();

        // Verify profile exists
        ProfileDocument profile = profileRepository.findByClerkId(clerkId);
        if (profile == null) {
            throw new UsernameNotFoundException("Profile not found for clerkId: " + clerkId);
        }

        return clerkId;
    }

    public UserCredits addCredits(String clerkId, Integer creditsToAdd, String plan) {
        UserCredits userCredits = userCreditsRepository.findByClerkId(clerkId)
                .orElseGet(() -> createInitialCredits(clerkId));
        userCredits.setCredits(userCredits.getCredits() + creditsToAdd);
        userCredits.setPlan(plan);
        return userCreditsRepository.save(userCredits);
    }
}