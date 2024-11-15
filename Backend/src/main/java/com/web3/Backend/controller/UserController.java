package com.web3.Backend.controller;

import com.web3.Backend.dto.CustomUserDetails;
import com.web3.Backend.dto.PostPreviewDto;
import com.web3.Backend.dto.UserDto;
import com.web3.Backend.exception.CustomException;
import com.web3.Backend.exception.ErrorCode;
import com.web3.Backend.response.Response;
import com.web3.Backend.security.CurrentUser;
import com.web3.Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/mypage/info")
    public ResponseEntity<Response> getUserInfo(@CurrentUser CustomUserDetails currentUser) {
        // 사용자 인증 확인
        if (currentUser == null) {
            throw new CustomException(ErrorCode.UNAUTHORIZED);
        }

        int userId = currentUser.getUser().getId();
        UserDto userDto = userService.getUserById(userId);

        Map<String, Object> data = new HashMap<>();
        data.put("user", userDto);

        Response response = new Response("200", "내 정보 조회 성공", data);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/mypage/bookmarks")
    public ResponseEntity<Response> getBookmarks(@CurrentUser CustomUserDetails customUserDetails) {
        if (customUserDetails == null) {
            throw new CustomException(ErrorCode.UNAUTHORIZED);
        }

        List<PostPreviewDto> postPreviewDtos = userService.getBookmarks(customUserDetails.getUser().getId());

        Map<String, Object> data = new HashMap<>();
        data.put("postPreviewDtos", postPreviewDtos);

        Response response = new Response("200", "북마크 목록 조회 성공", data);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/mypage/updateInfo")
    public ResponseEntity<Response> updateUserInfo(@CurrentUser CustomUserDetails customUserDetails, @RequestBody Map<String, Object> request) {
        if (customUserDetails == null) {
            throw new CustomException(ErrorCode.UNAUTHORIZED);
        }

        int userId = customUserDetails.getUser().getId();  // 현재 사용자의 ID
        String newUserId = (String) request.get("userId");  // 요청에서 새로운 userId 가져오기

        // userId 변경
        UserDto updatedUser = userService.updateUserId(userId, newUserId);

        Map<String, Object> data = new HashMap<>();
        data.put("userId", updatedUser.getUserId());

        Response response = new Response("200", "아이디 수정 성공", data);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/mypage/updatePreference")
    public ResponseEntity<Response> updatePreference(@CurrentUser CustomUserDetails customUserDetails, @RequestBody Map<String, Object> request) {
        if (customUserDetails == null) {
            throw new CustomException(ErrorCode.UNAUTHORIZED);
        }

        Double preferenceLevel;
        try {
            preferenceLevel = ((Number) request.get("preferenceLevel")).doubleValue();
        } catch (Exception e) {
            throw new CustomException(ErrorCode.INVALID_PREFERENCE_LEVEL);
        }

        // 선호도 수정
        userService.updatePreferenceLevel(customUserDetails.getUser().getId(), preferenceLevel);

        // 응답 생성
        Map<String, Object> data = new HashMap<>();
        data.put("preferenceLevel", preferenceLevel);

        Response response = new Response("200", "선호 도수 설정 성공", data);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/mypage/updateProfileImage")
    public ResponseEntity<Response> updateProfileImage(
            @CurrentUser CustomUserDetails customUserDetails,
            @RequestParam("profileImage") MultipartFile profileImage) {

        if (customUserDetails == null) {
            throw new CustomException(ErrorCode.UNAUTHORIZED);
        }

        if (profileImage.isEmpty() || !isValidImageFormat(profileImage.getOriginalFilename())) {
            throw new CustomException(ErrorCode.INVALID_IMAGE_FORMAT);
        }

        // 프로필 이미지 업데이트
        String savedImageUrl = userService.updateProfileImage(customUserDetails.getUser().getId(), profileImage);

        Map<String, Object> data = new HashMap<>();
        data.put("profileImageUrl", savedImageUrl);

        Response response = new Response("200", "프로필 사진 설정 성공", data);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 이미지 파일 형식 검사
    private boolean isValidImageFormat(String filename) {
        return filename.matches(".*\\.(jpeg|jpg|png|gif|bmp)$");
    }
}

