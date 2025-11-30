package com.Sumanta.SwiftShare.repository;

import com.Sumanta.SwiftShare.document.FileMetaDataDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FileMetaDataRepository extends MongoRepository<FileMetaDataDocument, String> {
    List<FileMetaDataDocument> findByClerkId(String clerkId);
    Long countByClerkId(String clerkId);

}
