package com.web3.Backend.controller;

import com.web3.Backend.domain.RefreshEntity;
import com.web3.Backend.jwt.JWTUtil;
import com.web3.Backend.repository.RefreshRepository;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LogoutController {
    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

    public LogoutController(JWTUtil jwtUtil, RefreshRepository refreshRepository) {
        this.jwtUtil = jwtUtil;
        this.refreshRepository = refreshRepository;
    }

    @PostMapping("/auth/logout")
    public ResponseEntity<String> logout(@RequestHeader(value = "Authorization") String authHeader) {
        // Authorization 헤더에서 리프레시 토큰 추출
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return new ResponseEntity<>("No refresh token found", HttpStatus.BAD_REQUEST);
        }

        String refreshToken = authHeader.substring(7); // "Bearer " 제거

        // 리프레시 토큰 만료 체크
        if (jwtUtil.isExpired(refreshToken)) {
            return new ResponseEntity<>("Refresh token expired", HttpStatus.BAD_REQUEST);
        }

        // DB에서 리프레시 토큰 존재 여부 확인
        String username =jwtUtil.getUsername(refreshToken);
        RefreshEntity refreshEntity = refreshRepository.findByUsername(username);
        if (refreshEntity ==null) {
            return new ResponseEntity<>("Refresh token not found", HttpStatus.BAD_REQUEST);
        }
        // DB에서 리프레시 토큰 삭제
        refreshRepository.delete(refreshEntity);
        return new ResponseEntity<>("Successfully log out", HttpStatus.OK);
    }
}
