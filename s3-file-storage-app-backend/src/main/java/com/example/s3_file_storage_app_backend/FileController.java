package com.example.s3_file_storage_app_backend;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/files")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class FileController {

    private final FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<UploadedFile> uploadFile(@RequestParam("file") MultipartFile file,
                                                   @RequestParam(value = "fileName", required = false) String fileName) {
        try {
            UploadedFile uploadedFile = fileService.uploadFile(file, fileName);
            return ResponseEntity.ok(uploadedFile);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<UploadedFile>> listFiles() {
        List<UploadedFile> files = fileService.listFiles();
        return ResponseEntity.ok(files);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFile(@PathVariable Long id) {
        fileService.deleteFile(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<UploadedFile> updateFileName(@PathVariable Long id, @RequestParam String newFileName) {
        UploadedFile updatedFile = fileService.updateFileName(id, newFileName);
        return ResponseEntity.ok(updatedFile);
    }
}
