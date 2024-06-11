package com.example.s3_file_storage_app_backend;

import com.amazonaws.services.s3.AmazonS3;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Log4j2
@Service
public class FileService {

    private final FileRepository fileRepository;

    private final AmazonS3 s3client;

    private final String BUCKET_NAME = "mylab5filemanagerbucket";

    public UploadedFile uploadFile(MultipartFile file, String specifiedFileName) throws IOException {
        String fileName = specifiedFileName != null && !specifiedFileName.isEmpty()
                ? specifiedFileName
                : UUID.randomUUID() + "_" + file.getOriginalFilename();
        String fileUrl = "https://" + BUCKET_NAME + ".s3.amazonaws.com/" + fileName;
        try {
            s3client.putObject(BUCKET_NAME, fileName, file.getInputStream(), null);
        } catch (IOException e) {
            throw new IOException("Failed to upload file to S3", e);
        }
        UploadedFile uploadedFile = new UploadedFile();
        uploadedFile.setFileName(fileName);
        uploadedFile.setFileUrl(fileUrl);
        return fileRepository.save(uploadedFile);
    }

    public void deleteFile(Long id) {
        UploadedFile uploadedFile = fileRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("File not found"));
        String fileName = uploadedFile.getFileName();
        s3client.deleteObject(BUCKET_NAME, fileName);
        fileRepository.deleteById(id);
    }

    public UploadedFile updateFileName(Long fileId, String newFileName) {
        UploadedFile file = fileRepository.findById(fileId).orElseThrow(() -> new RuntimeException("File not found"));
        file.setFileName(newFileName);
        return fileRepository.save(file);
    }

    public List<UploadedFile> listFiles() {
        return fileRepository.findAll();
    }

}
