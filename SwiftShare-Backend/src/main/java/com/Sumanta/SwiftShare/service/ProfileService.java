package com.Sumanta.SwiftShare.service;

import com.Sumanta.SwiftShare.document.ProfileDocument;
import com.Sumanta.SwiftShare.dto.ProfileDTO;
import com.Sumanta.SwiftShare.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;

    // Use @Lazy to break circular dependency
    @Lazy
    private final UserCreditService userCreditService;

    public ProfileDTO createProfile(ProfileDTO profileDTO) {
        log.info("Creating profile for clerkId: {}", profileDTO.getClerkId());

        if (profileRepository.existsByClerkId(profileDTO.getClerkId())) {
            log.info("Profile already exists, updating instead");
            return updateProfile(profileDTO);
        }

        ProfileDocument profile = ProfileDocument.builder()
                .clerkId(profileDTO.getClerkId())
                .email(profileDTO.getEmail())
                .firstName(profileDTO.getFirstName())
                .lastName(profileDTO.getLastName())
                .photoUrl(profileDTO.getPhotoUrl())
                .credits(5)
                .createdAt(Instant.now())
                .build();
        profile = profileRepository.save(profile);
        log.info("Profile created successfully with id: {}", profile.getId());

        // Create user credits
        try {
            userCreditService.createInitialCredits(profile.getClerkId());
            log.info("User credits created for clerkId: {}", profile.getClerkId());
        } catch (Exception e) {
            log.error("Failed to create user credits: ", e);
        }

        return mapToDTO(profile);
    }

    public ProfileDTO updateProfile(ProfileDTO profileDTO) {
        log.info("Updating profile for clerkId: {}", profileDTO.getClerkId());
        ProfileDocument existingProfile = profileRepository.findByClerkId(profileDTO.getClerkId());

        if (existingProfile != null) {
            // update fields if provided
            if (profileDTO.getEmail() != null && !profileDTO.getEmail().isEmpty()) {
                existingProfile.setEmail(profileDTO.getEmail());
            }
            if (profileDTO.getFirstName() != null && !profileDTO.getFirstName().isEmpty()) {
                existingProfile.setFirstName(profileDTO.getFirstName());
            }
            if (profileDTO.getLastName() != null && !profileDTO.getLastName().isEmpty()) {
                existingProfile.setLastName(profileDTO.getLastName());
            }
            if (profileDTO.getPhotoUrl() != null && !profileDTO.getPhotoUrl().isEmpty()) {
                existingProfile.setPhotoUrl(profileDTO.getPhotoUrl());
            }
            profileRepository.save(existingProfile);
            log.info("Profile updated successfully");

            return mapToDTO(existingProfile);
        }
        log.warn("Profile not found for clerkId: {}", profileDTO.getClerkId());
        return null;
    }

    public boolean existsByClerkId(String clerkId) {
        return profileRepository.existsByClerkId(clerkId);
    }

    public void deleteProfile(String clerkId) {
        log.info("Deleting profile for clerkId: {}", clerkId);
        ProfileDocument existingProfile = profileRepository.findByClerkId(clerkId);
        if (existingProfile != null) {
            profileRepository.delete(existingProfile);
            log.info("Profile deleted successfully");

            // Delete user credits
            try {
                userCreditService.deleteCredits(clerkId);
                log.info("User credits deleted for clerkId: {}", clerkId);
            } catch (Exception e) {
                log.error("Failed to delete user credits: ", e);
            }
        } else {
            log.warn("Profile not found for deletion, clerkId: {}", clerkId);
        }
    }

    public ProfileDocument getCurrentProfile() {
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            throw new UsernameNotFoundException("User not authenticated");
        }
        String clerkId = SecurityContextHolder.getContext().getAuthentication().getName();
        ProfileDocument profile = profileRepository.findByClerkId(clerkId);

        if (profile == null) {
            throw new UsernameNotFoundException("Profile not found for clerkId: " + clerkId);
        }

        return profile;
    }

    private ProfileDTO mapToDTO(ProfileDocument profile) {
        return ProfileDTO.builder()
                .id(profile.getId())
                .clerkId(profile.getClerkId())
                .email(profile.getEmail())
                .firstName(profile.getFirstName())
                .lastName(profile.getLastName())
                .photoUrl(profile.getPhotoUrl())
                .credits(profile.getCredits())
                .createdAt(profile.getCreatedAt())
                .build();
    }
}