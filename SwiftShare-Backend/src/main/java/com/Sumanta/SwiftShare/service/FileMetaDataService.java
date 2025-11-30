package com.Sumanta.SwiftShare.service;

import com.Sumanta.SwiftShare.document.FileMetaDataDocument;
import com.Sumanta.SwiftShare.document.ProfileDocument;
import com.Sumanta.SwiftShare.dto.FileMetaDataDTO;
import com.Sumanta.SwiftShare.repository.FileMetaDataRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileMetaDataService {
    private final ProfileService profileService;
    private final UserCreditService userCreditService;
    private final FileMetaDataRepository fileMetaDataRepository;

    public List<FileMetaDataDTO> uploadFiles(MultipartFile[] files) throws IOException {
        log.info("Starting file upload for {} files", files.length);

        ProfileDocument currentProfile = profileService.getCurrentProfile();
        if (currentProfile == null) {
            throw new RuntimeException("User profile not found");
        }

        List<FileMetaDataDocument> savedFiles = new ArrayList<>();

        if (!userCreditService.hasEnoughCredits(files.length)) {
            throw new RuntimeException("Not enough credits to upload files. Please purchase more credits.");
        }

        Path uploadPath = Paths.get("uploads").toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);
        log.info("Upload directory: {}", uploadPath);

        for (MultipartFile file : files) {
            String originalFilename = file.getOriginalFilename();

            if (originalFilename == null || originalFilename.isEmpty()) {
                log.warn("Skipping file with no name");
                continue;
            }

            String fileExtension = "";
            if (originalFilename.contains(".")) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            String storedFileName = UUID.randomUUID() + fileExtension;
            Path targetLocation = uploadPath.resolve(storedFileName);

            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            log.info("File saved to: {}", targetLocation);

            FileMetaDataDocument fileMetaDataDocument = FileMetaDataDocument.builder()
                    .fileLocation(targetLocation.toString())
                    .name(originalFilename)
                    .storedFilename(storedFileName)
                    .size(file.getSize())
                    .type(file.getContentType())
                    .clerkId(currentProfile.getClerkId())
                    .isPublic(false)
                    .uploadAt(LocalDateTime.now())
                    .build();

            savedFiles.add(fileMetaDataRepository.save(fileMetaDataDocument));
            userCreditService.consumeCredits();
            log.info("Credit consumed for file: {}", originalFilename);
        }

        log.info("Successfully uploaded {} files", savedFiles.size());
        return savedFiles.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<FileMetaDataDTO> getFiles() {
        ProfileDocument currentProfile = profileService.getCurrentProfile();
        log.info("Fetching files for clerkId: {}", currentProfile.getClerkId());

        List<FileMetaDataDocument> files = fileMetaDataRepository.findByClerkId(currentProfile.getClerkId());
        log.info("Found {} files for user", files.size());

        return files.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get public file - no authentication required
     */
    public FileMetaDataDTO getPublicFile(String fileId) {
        log.info("Fetching public file: {}", fileId);

        Optional<FileMetaDataDocument> fileOpt = fileMetaDataRepository.findById(fileId);

        if (fileOpt.isEmpty()) {
            log.warn("File not found: {}", fileId);
            throw new RuntimeException("File not found");
        }

        FileMetaDataDocument file = fileOpt.get();

        if (!file.getIsPublic()) {
            log.warn("Attempted access to non-public file: {}", fileId);
            throw new RuntimeException("File is not public");
        }

        return mapToDTO(file);
    }

    /**
     * Get file by ID with authorization check
     */
    public FileMetaDataDTO getFileById(String fileId) {
        ProfileDocument currentProfile = profileService.getCurrentProfile();

        Optional<FileMetaDataDocument> fileOpt = fileMetaDataRepository.findById(fileId);

        if (fileOpt.isEmpty()) {
            log.warn("File not found with id: {}", fileId);
            return null;
        }

        FileMetaDataDocument file = fileOpt.get();

        if (!file.getClerkId().equals(currentProfile.getClerkId()) && !file.getIsPublic()) {
            log.warn("Unauthorized access attempt for file: {} by user: {}", fileId, currentProfile.getClerkId());
            return null;
        }

        return mapToDTO(file);
    }

    /**
     * Get downloadable file - YES, unauthenticated users can download public files
     */
    public FileMetaDataDTO getDownloadableFile(String fileId) {
        log.info("Fetching downloadable file: {}", fileId);

        Optional<FileMetaDataDocument> fileOpt = fileMetaDataRepository.findById(fileId);

        if (fileOpt.isEmpty()) {
            log.warn("File not found with id: {}", fileId);
            throw new RuntimeException("File not found");
        }

        FileMetaDataDocument file = fileOpt.get();

        // Authorization check
        ProfileDocument currentProfile = null;
        try {
            currentProfile = profileService.getCurrentProfile();
        } catch (Exception e) {
            // User not authenticated - only allow if file is public
            if (!file.getIsPublic()) {
                log.warn("Unauthenticated download attempt for private file: {}", fileId);
                throw new RuntimeException("Unauthorized - authentication required");
            }
            log.info("Public file download by unauthenticated user: {}", fileId);
        }

        // If authenticated, check ownership or public access
        if (currentProfile != null) {
            boolean isOwner = file.getClerkId().equals(currentProfile.getClerkId());
            if (!isOwner && !file.getIsPublic()) {
                log.warn("Unauthorized download attempt for file: {} by user: {}", fileId, currentProfile.getClerkId());
                throw new RuntimeException("Unauthorized access to file");
            }
        }

        // Verify physical file exists
        Path filePath = Paths.get(file.getFileLocation());
        if (!Files.exists(filePath)) {
            log.error("Physical file not found: {}", file.getFileLocation());
            throw new RuntimeException("File not found on disk");
        }

        log.info("Download authorized for file: {}", fileId);
        return mapToDTO(file);
    }

    /**
     * Toggle file public/private status
     * FIXED: Now actually toggles the value
     */
    public FileMetaDataDTO toggleFile(String fileId) {
        ProfileDocument currentProfile = profileService.getCurrentProfile();

        FileMetaDataDocument file = fileMetaDataRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));

        // Check ownership
        if (!file.getClerkId().equals(currentProfile.getClerkId())) {
            throw new RuntimeException("Unauthorized - you don't own this file");
        }

        // Toggle the public status (FIXED!)
        file.setIsPublic(!file.getIsPublic());
        fileMetaDataRepository.save(file);

        log.info("File {} toggled to {}", fileId, file.getIsPublic() ? "public" : "private");
        return mapToDTO(file);
    }

    /**
     * Delete file with authorization check
     */
    public boolean deleteFile(String fileId) {
        ProfileDocument currentProfile = profileService.getCurrentProfile();

        Optional<FileMetaDataDocument> fileOpt = fileMetaDataRepository.findById(fileId);

        if (fileOpt.isEmpty()) {
            log.warn("File not found with id: {}", fileId);
            return false;
        }

        FileMetaDataDocument file = fileOpt.get();

        if (!file.getClerkId().equals(currentProfile.getClerkId())) {
            log.warn("Unauthorized delete attempt for file: {} by user: {}", fileId, currentProfile.getClerkId());
            return false;
        }

        // Delete physical file
        try {
            Path filePath = Paths.get(file.getFileLocation());
            Files.deleteIfExists(filePath);
            log.info("Physical file deleted: {}", file.getFileLocation());
        } catch (IOException e) {
            log.error("Failed to delete physical file: {}", file.getFileLocation(), e);
        }

        fileMetaDataRepository.delete(file);
        log.info("File metadata deleted: {}", fileId);

        return true;
    }

    private FileMetaDataDTO mapToDTO(FileMetaDataDocument fileMetaDataDocument) {
        return FileMetaDataDTO.builder()
                .id(fileMetaDataDocument.getId())
                .fileLocation(fileMetaDataDocument.getFileLocation())
                .name(fileMetaDataDocument.getName())
                .storedFilename(fileMetaDataDocument.getStoredFilename())
                .size(fileMetaDataDocument.getSize())
                .type(fileMetaDataDocument.getType())
                .clerkId(fileMetaDataDocument.getClerkId())
                .isPublic(fileMetaDataDocument.getIsPublic())
                .uploadAt(fileMetaDataDocument.getUploadAt())
                .build();
    }
}