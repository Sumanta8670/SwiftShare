package com.Sumanta.SwiftShare.repository;

import com.Sumanta.SwiftShare.document.UserCredits;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserCreditsRepository extends MongoRepository<UserCredits, String> {
    Optional<UserCredits> findByClerkId(String clerkId);
    boolean existsByClerkId(String clerkId);
}