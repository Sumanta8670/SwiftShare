package com.Sumanta.SwiftShare.controller;

import com.Sumanta.SwiftShare.document.UserCredits;
import com.Sumanta.SwiftShare.dto.FileMetaDataDTO;
import com.Sumanta.SwiftShare.service.FileMetaDataService;
import com.Sumanta.SwiftShare.service.UserCreditService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/files")
public class FileMetaDataController {
    private final FileMetaDataService fileMetaDataService;
    private final UserCreditService userCreditService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFiles(@RequestPart("files") MultipartFile[] files) {
        try {
            log.info("Received upload request for {} files", files.length);

            if (files == null || files.length == 0) {
                return ResponseEntity.badRequest().body("No files provided");
            }

            List<FileMetaDataDTO> uploadedFiles = fileMetaDataService.uploadFiles(files);
            UserCredits finalCredits = userCreditService.getUserCredits();

            Map<String, Object> response = new HashMap<>();
            response.put("files", uploadedFiles);
            response.put("remainingCredits", finalCredits.getCredits());
            response.put("message", "Files uploaded successfully");

            log.info("Upload successful. Remaining credits: {}", finalCredits.getCredits());
            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            log.error("Runtime error during upload: ", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);

        } catch (Exception e) {
            log.error("Unexpected error during upload: ", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to upload files: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/my-files")
    public ResponseEntity<?> getFilesForCurrentUser() {
        try {
            log.info("Fetching files for current user");
            List<FileMetaDataDTO> files = fileMetaDataService.getFiles();

            log.info("Successfully retrieved {} files", files.size());
            return ResponseEntity.ok(files);

        } catch (Exception e) {
            log.error("Error fetching files for current user: ", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to retrieve files: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/public/{fileId}")
    public ResponseEntity<?> getPublicFile(@PathVariable String fileId) {
        try {
            log.info("Fetching public file: {}", fileId);
            FileMetaDataDTO file = fileMetaDataService.getPublicFile(fileId);
            return ResponseEntity.ok(file);

        } catch (RuntimeException e) {
            log.error("Error fetching public file: ", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());

            HttpStatus status = e.getMessage().contains("not found") ?
                    HttpStatus.NOT_FOUND : HttpStatus.FORBIDDEN;

            return ResponseEntity.status(status).body(errorResponse);

        } catch (Exception e) {
            log.error("Unexpected error: ", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to retrieve file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/{fileId}")
    public ResponseEntity<?> getFileById(@PathVariable String fileId) {
        try {
            log.info("Fetching file with id: {}", fileId);
            FileMetaDataDTO file = fileMetaDataService.getFileById(fileId);

            if (file == null) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "File not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }

            return ResponseEntity.ok(file);

        } catch (Exception e) {
            log.error("Error fetching file by id: ", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to retrieve file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/download/{fileId}")
    public ResponseEntity<?> downloadFile(@PathVariable String fileId) {
        try {
            log.info("Download request for file: {}", fileId);

            FileMetaDataDTO downloadableFile = fileMetaDataService.getDownloadableFile(fileId);

            Path filePath = Paths.get(downloadableFile.getFileLocation());
            Resource resource;

            try {
                resource = new UrlResource(filePath.toUri());
            } catch (MalformedURLException e) {
                log.error("Malformed file path: {}", filePath, e);
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Invalid file path");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
            }

            if (!resource.exists() || !resource.isReadable()) {
                log.error("File not found or not readable: {}", filePath);
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "File not found or not accessible");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }

            String contentType = downloadableFile.getType();
            if (contentType == null || contentType.isEmpty()) {
                contentType = "application/octet-stream";
            }

            log.info("Download successful for file: {} ({})", downloadableFile.getName(), fileId);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + downloadableFile.getName() + "\"")
                    .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(downloadableFile.getSize()))
                    .body(resource);

        } catch (RuntimeException e) {
            log.error("Runtime error during download: ", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());

            HttpStatus status = HttpStatus.BAD_REQUEST;
            if (e.getMessage().contains("not found")) {
                status = HttpStatus.NOT_FOUND;
            } else if (e.getMessage().contains("Unauthorized")) {
                status = HttpStatus.FORBIDDEN;
            }

            return ResponseEntity.status(status).body(errorResponse);

        } catch (Exception e) {
            log.error("Unexpected error during download: ", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to download file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PatchMapping("/{fileId}/toggle-public")
    public ResponseEntity<?> togglePublic(@PathVariable String fileId) {
        try {
            log.info("Toggling public status for file: {}", fileId);
            FileMetaDataDTO file = fileMetaDataService.toggleFile(fileId);

            Map<String, Object> response = new HashMap<>();
            response.put("file", file);
            response.put("message", "File is now " + (file.getIsPublic() ? "public" : "private"));

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            log.error("Error toggling file: ", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());

            HttpStatus status = e.getMessage().contains("not found") ?
                    HttpStatus.NOT_FOUND : HttpStatus.FORBIDDEN;

            return ResponseEntity.status(status).body(errorResponse);

        } catch (Exception e) {
            log.error("Unexpected error: ", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to toggle file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @DeleteMapping("/{fileId}")
    public ResponseEntity<?> deleteFile(@PathVariable String fileId) {
        try {
            log.info("Deleting file with id: {}", fileId);
            boolean deleted = fileMetaDataService.deleteFile(fileId);

            if (!deleted) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "File not found or unauthorized");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }

            Map<String, String> response = new HashMap<>();
            response.put("message", "File deleted successfully");

            log.info("File deleted successfully: {}", fileId);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error deleting file: ", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to delete file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // REMOVED: Duplicate /files/credits endpoint
    // Use /users/credits instead from UserCreditsController
}