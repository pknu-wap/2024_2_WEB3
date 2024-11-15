package com.web3.Backend.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web3.Backend.domain.RefreshEntity;
import com.web3.Backend.dto.CustomUserDetails;
import com.web3.Backend.dto.UserDto;
import com.web3.Backend.repository.RefreshRepository;
import io.jsonwebtoken.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import java.util.Date;

@Slf4j
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil, RefreshRepository refreshRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.refreshRepository = refreshRepository;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        // 요청 본문에서 username과 password를 JSON 형식으로 추출
        try {
            // ObjectMapper를 사용하여 JSON 요청을 UserDto 객체로 변환
            ObjectMapper objectMapper = new ObjectMapper();
            UserDto userDto = objectMapper.readValue(request.getInputStream(), UserDto.class);
            String username = userDto.getUserName();  // UserDto에서 userName을 가져옴
            String password = userDto.getPassword();  // UserDto에서 password를 가져옴
            log.info("Attempting authentication for username: {}, password: {}", username, password);
            // username 또는 password가 없으면 예외를 던짐
            if (username == null || password == null) {
                throw new BadCredentialsException("Username or password not provided");
            }
            // 인증 토큰 생성 후 인증 시도
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password, null);
            return authenticationManager.authenticate(authToken);  // AuthenticationManager로 인증 시도

        } catch (IOException | java.io.IOException e) {
            // JSON 파싱 에러 발생 시 예외 처리
            throw new BadCredentialsException("Invalid request format", e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication)
            throws IOException, ServletException, java.io.IOException {
        log.info("Authentication successful for user: " + authentication.getName());
        String username = authentication.getName();
        try {

            CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
            int userId = customUserDetails.getUser().getId();  // CustomUserDetails에서 userId를 가져옴
            // Access Token과 Refresh Token 생성
            String accessToken = jwtUtil.createJwt("access", username, 600000L, userId);
            String refreshToken = jwtUtil.createJwt("refresh", username, 86400000L, userId);
            log.info("Access Token: {}", accessToken);
            log.info("Refresh Token: {}", refreshToken);
            // DB에 Refresh Token 저장
            addRefreshEntity(username, refreshToken, 86400000L);
            // 생성된 JWT 토큰을 응답 헤더에 추가
            response.setHeader("Authorization", "Bearer " + accessToken);  // Access Token을 Authorization 헤더에 추가
            response.setHeader("refresh", refreshToken);  // Refresh Token을 refresh 헤더에 추가
            response.setStatus(HttpServletResponse.SC_OK);  // HTTP 200 OK 상태 코드 반환
        } catch (Exception e) {
            log.error("Error creating JWT tokens: ", e);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Error occurred while generating JWT tokens");
        }
    }

    // Refresh Token을 DB에 저장하는 메서드
    @Transactional
    private void addRefreshEntity(String username, String refresh, Long expiredMs) {
        try {
            Date expiration = new Date(System.currentTimeMillis() + expiredMs);  // Refresh Token 만료 시간 계산
            RefreshEntity refreshEntity = new RefreshEntity(username, refresh, expiration.toString());
            refreshRepository.save(refreshEntity);  // DB에 Refresh Token 저장
            log.info("Refresh token saved for username: {}", username);
        } catch (Exception e) {
            log.error("Error saving refresh token: ", e);
        }
    }
}

