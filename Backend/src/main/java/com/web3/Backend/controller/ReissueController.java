package com.web3.Backend.controller;

import com.web3.Backend.domain.RefreshEntity;
import com.web3.Backend.dto.CustomUserDetails;
import com.web3.Backend.jwt.JWTUtil;
import com.web3.Backend.repository.RefreshRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class ReissueController {

    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

    public ReissueController(JWTUtil jwtUtil, RefreshRepository refreshRepository) {
        this.jwtUtil = jwtUtil;
        this.refreshRepository = refreshRepository;
    }

    @PostMapping("/auth/reissue")
    public ResponseEntity<String> reissue(@RequestHeader(value = "Authorization", required = true) String authHeader, HttpServletResponse response) {

        // 1. Authorization 헤더에서 "Bearer "을 제거하고, refresh token을 추출
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return new ResponseEntity<>("No refresh token found", HttpStatus.BAD_REQUEST);
        }

        String refreshToken = authHeader.substring(7); // "Bearer " 제거

        // 2. Refresh Token이 만료되었는지 확인
        if (jwtUtil.isExpired(refreshToken)) {
            return new ResponseEntity<>("Refresh token expired", HttpStatus.BAD_REQUEST); // Refresh Token 만료
        }

        // 3. Refresh Token이 올바른지 확인 (Refresh Token은 "refresh" 카테고리여야 함)
        String category = jwtUtil.getCategory(refreshToken);
        if (!category.equals("refresh")) {
            return new ResponseEntity<>("Invalid refresh token", HttpStatus.BAD_REQUEST); // 잘못된 토큰
        }

        // 4. DB에서 Refresh Token 확인
        String username = jwtUtil.getUsername(refreshToken); // Refresh Token에서 사용자 이름 얻기
        RefreshEntity refreshEntity = refreshRepository.findByUsername(username);
        if (refreshEntity == null) {
            return new ResponseEntity<>("Invalid refresh token", HttpStatus.BAD_REQUEST); // DB에 존재하지 않는 사용자
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        int userId = customUserDetails.getUserId();  // CustomUserDetails에서 userId 추출

        // 5. 새로운 Access Token과 Refresh Token 발급
        String newAccessToken = jwtUtil.createJwt("access", username, 600000L, userId); // 새로운 Access Token 생성
        String newRefreshToken = jwtUtil.createJwt("refresh", username, 86400000L, userId); // 새로운 Refresh Token 생성

        // 6. 기존의 Refresh Token 삭제 후 새로운 Refresh Token을 DB에 저장
        refreshRepository.delete(refreshEntity); // 기존 Refresh Token 삭제
        addRefreshEntity(username, newRefreshToken, 86400000L); // 새로운 Refresh Token 저장
        // 7. 새로운 토큰들을 응답 헤더에 설정
        response.setHeader("Authorization", "Bearer " + newAccessToken);
        response.setHeader("refresh", newRefreshToken);
        return new ResponseEntity<>("New tokens issued", HttpStatus.OK); // 성공적인 응답
    }
    // RefreshEntity 추가 메서드
    private void addRefreshEntity(String username, String refresh, Long expiredMs) {
        Date expiration = new Date(System.currentTimeMillis() + expiredMs); // 만료 시간 계산
        RefreshEntity refreshEntity = new RefreshEntity(username, refresh, expiration.toString()); // RefreshEntity 생성
        refreshRepository.save(refreshEntity); // DB에 저장
    }
}
