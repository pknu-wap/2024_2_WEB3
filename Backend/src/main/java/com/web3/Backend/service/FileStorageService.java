package com.web3.Backend.service;

import com.web3.Backend.exception.CustomException;
import com.web3.Backend.exception.ErrorCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;


    // application.properties에서 경로를 주입받음
    public FileStorageService(@Value("${file.upload-dir}") String uploadDir) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (IOException e) {
            throw new CustomException(ErrorCode.DATABASE_ERROR);
        }
    }

    public String storeFile(MultipartFile file) {
        // 파일 이름에 타임스탬프 추가하여 저장
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        try {
            Path targetLocation = fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // 클라이언트에 반환할 URL 경로 생성 (예: /images/uploads/filename.jpg)
            return "/images/uploads/" + fileName;

        } catch (IOException e) {
            throw new CustomException(ErrorCode.DATABASE_ERROR);
        }
    }
}
