package com.example.s3_file_storage_app_backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<UploadedFile, Long> {

}
