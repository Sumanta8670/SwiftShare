package com.Sumanta.SwiftShare.controller;

import com.Sumanta.SwiftShare.dto.ProfileDTO;
import com.Sumanta.SwiftShare.service.ProfileService;
import com.Sumanta.SwiftShare.service.UserCreditService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@RestController
@RequestMapping("/webhooks")
@RequiredArgsConstructor
public class ClerkWebhooksController {

    @Value("${clerk.webhook.secret}")
    private String webhookSecret;

    private final ProfileService profileService;
    private final UserCreditService userCreditService;

    @PostMapping("/clerk")
    public ResponseEntity<?> handleClerkWebhooks(@RequestHeader("svix-id") String svixId,
                                                 @RequestHeader("svix-timestamp") String svixTimestamp,
                                                 @RequestHeader("svix-signature") String svixSignature,
                                                 @RequestBody String payload) {
        try {
            log.info("Received webhook - Event Type: {}", payload);

            boolean isValid = verifyWebhookSignature(svixId, svixTimestamp, svixSignature, payload);
            if (!isValid) {
                log.error("Invalid webhook signature");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid webhook signature");
            }

            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(payload);

            String eventType = rootNode.path("type").asText();
            log.info("Processing event type: {}", eventType);

            switch (eventType) {
                case "user.created":
                    handleUserCreated(rootNode.path("data"));
                    break;

                case "user.updated":
                    handleUserUpdated(rootNode.path("data"));
                    break;

                case "user.deleted":
                    handleUserDeleted(rootNode.path("data"));
                    break;

                default:
                    log.warn("Unhandled event type: {}", eventType);
            }
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Error processing webhook: ", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    private void handleUserDeleted(JsonNode data) {
        String clerkId = data.path("id").asText();
        log.info("Deleting user with clerkId: {}", clerkId);
        profileService.deleteProfile(clerkId);
    }

    private void handleUserUpdated(JsonNode data) {
        String clerkId = data.path("id").asText();
        log.info("Updating user with clerkId: {}", clerkId);

        String email = "";
        JsonNode emailAddresses = data.path("email_addresses");
        if (emailAddresses.isArray() && emailAddresses.size() > 0) {
            email = emailAddresses.get(0).path("email_address").asText();
        }
        String firstName = data.path("first_name").asText("");
        String lastName = data.path("last_name").asText("");
        String photoUrl = data.path("image_url").asText("");

        ProfileDTO updatedProfile = ProfileDTO.builder()
                .clerkId(clerkId)
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .photoUrl(photoUrl)
                .build();
        updatedProfile = profileService.updateProfile(updatedProfile);

        if (updatedProfile == null) {
            log.info("Profile not found, creating new profile for clerkId: {}", clerkId);
            handleUserCreated(data);
        }
    }

    private void handleUserCreated(JsonNode data) {
        String clerkId = data.path("id").asText();
        log.info("Creating new user with clerkId: {}", clerkId);

        String email = "";
        JsonNode emailAddresses = data.path("email_addresses");

        if (emailAddresses.isArray() && emailAddresses.size() > 0) {
            email = emailAddresses.get(0).path("email_address").asText();
        }
        String firstName = data.path("first_name").asText("");
        String lastName = data.path("last_name").asText("");
        String photoUrl = data.path("image_url").asText("");

        ProfileDTO newProfile = ProfileDTO.builder()
                .clerkId(clerkId)
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .photoUrl(photoUrl)
                .build();

        // This will create both profile and user credits
        ProfileDTO createdProfile = profileService.createProfile(newProfile);
        log.info("Profile created successfully: {}", createdProfile);
    }

    private boolean verifyWebhookSignature(String svixId, String svixTimestamp, String svixSignature, String payload) {
        // TODO: Implement actual signature verification
        // For now, returning true for testing
        return true;
    }
}