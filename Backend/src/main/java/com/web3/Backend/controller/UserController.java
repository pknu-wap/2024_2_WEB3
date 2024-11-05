package com.web3.Backend.controller;

import com.web3.Backend.dto.PostPreviewDto;
import com.web3.Backend.dto.UserDto;
import com.web3.Backend.exception.CustomException;
import com.web3.Backend.exception.ErrorCode;
import com.web3.Backend.response.Response;
import com.web3.Backend.security.CurrentUser;
import com.web3.Backend.security.UserPrincipal;
import com.web3.Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/mypage/info")
    public ResponseEntity<Response> getUserInfo(@CurrentUser UserPrincipal currentUser) {
        // 사용자 인증 확인
        if (currentUser == null) {
            throw new CustomException(ErrorCode.UNAUTHORIZED);
        }

        int userId = currentUser.getId();
        UserDto userDto = userService.getUserById(userId);

        Map<String, Object> data = new HashMap<>();
        data.put("user", userDto);

        Response response = new Response("200", "내 정보 조회 성공", data);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/mypage/bookmarks")
    public ResponseEntity<Response> getBookmarks(@CurrentUser UserPrincipal userPrincipal) {
        if (userPrincipal == null) {
            throw new CustomException(ErrorCode.UNAUTHORIZED);
        }

        List<PostPreviewDto> postPreviewDtos = userService.getBookmarks(userPrincipal.getId());

        Map<String, Object> data = new HashMap<>();
        data.put("postPreviewDtos", postPreviewDtos);

        Response response = new Response("200", "북마크 목록 조회 성공", data);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/mypage/updateInfo")
    public ResponseEntity<Response> updateUserInfo(@CurrentUser UserPrincipal userPrincipal, @RequestBody Map<String, Object> request) {
        if (userPrincipal == null) {
            throw new CustomException(ErrorCode.UNAUTHORIZED);
        }

        int userId = userPrincipal.getId();
        String newUserName = (String) request.get("userName");

        // 사용자 이름 업데이트
        UserDto updatedUser = userService.updateUserName(userId, newUserName);

        Map<String, Object> data = new HashMap<>();
        data.put("userName", updatedUser.getUserName());

        Response response = new Response("200", "이름 수정 성공", data);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
