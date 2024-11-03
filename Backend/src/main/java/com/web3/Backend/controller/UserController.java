package com.web3.Backend.controller;

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
}
