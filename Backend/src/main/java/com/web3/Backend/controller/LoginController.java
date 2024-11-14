package com.web3.Backend.controller;

import com.web3.Backend.domain.RefreshEntity;
import com.web3.Backend.dto.UserDto;
import com.web3.Backend.jwt.JWTUtil;
import com.web3.Backend.repository.RefreshRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Date;

@RestController
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

    public LoginController(AuthenticationManager authenticationManager, JWTUtil jwtUtil, RefreshRepository refreshRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.refreshRepository = refreshRepository;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<String> login(@RequestBody @Validated UserDto userDto, BindingResult bindingResult, HttpServletResponse response) {
        if(bindingResult.hasErrors()){
            //유효성 검사 실패 시, 오류 메시지 반환
            String errorMessage = bindingResult.getFieldError().getDefaultMessage();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 입력: "+errorMessage);
        }

        String username = userDto.getUserName();
        String password = userDto.getPassword();

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,password);
        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        RefreshEntity existingRefreshToken = refreshRepository.findByUsername(username);

        String accessToken = jwtUtil.createJwt("access", username, 600000L);
        String refreshToken;

        if(existingRefreshToken != null) {
            //기존 refresh token이 있다면, 만료되었는지 확인
            if(jwtUtil.isExpired(existingRefreshToken.getRefresh())){
                //refresh token이 만료되었으면
                refreshToken= jwtUtil.createJwt("refresh",username,8640000L);
                //기존의 만료된 refresh token을 삭제하고 새로 저장
                refreshRepository.delete(existingRefreshToken);
                addRefreshEntity(username,refreshToken,8640000L);
            }else{
                //refresh toekn이 만료되지 않았으면 기존의 refresh token을 사용
                refreshToken = existingRefreshToken.getRefresh();
            }
        }else{
            //새로 refresh token 생성
            refreshToken = jwtUtil.createJwt("refresh", username, 86400000L);
            addRefreshEntity(username,refreshToken,86400000L);
        }
        // 응답 헤더에 access token 과 refresh token을 설정
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("refresh", refreshToken);

        return ResponseEntity.status(HttpServletResponse.SC_OK).body("login successful");
    }
    private void addRefreshEntity(String username, String refresh, Long expiredMs) {
        Date expiration = new Date(System.currentTimeMillis() + expiredMs);
        RefreshEntity refreshEntity = new RefreshEntity(username, refresh, expiration.toString());
        refreshRepository.save(refreshEntity);
    }
}
