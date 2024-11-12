package com.web3.Backend.jwt;

import com.web3.Backend.repository.RefreshRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class CustomLogoutFilter extends GenericFilterBean {
    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

    public CustomLogoutFilter(JWTUtil jwtUtil, RefreshRepository refreshRepository) {

        this.jwtUtil = jwtUtil;
        this.refreshRepository = refreshRepository;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        String requestUri = request.getRequestURI();

        // '/logout' 요청이 들어오면 필터가 이를 처리
        if ("/logout".equals(requestUri)) {
            String authHeader = request.getHeader("Authorization");

            // Authorization 헤더에서 리프레시 토큰을 추출
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("No refresh token found");
                return;
            }
            String refreshToken = authHeader.substring(7); // "Bearer " 제거

            // 리프레시 토큰 만료 체크
            try {
                jwtUtil.isExpired(refreshToken);
            } catch (ExpiredJwtException e) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("Refresh token expired");
                return;
            }

            // 리프레시 토큰이 DB에 존재하는지 확인
            if (!refreshRepository.existsByRefresh(refreshToken)) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("Invalid refresh token");
                return;
            }
            // DB에서 리프레시 토큰 삭제
            refreshRepository.deleteByRefresh(refreshToken);
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("Successfully logged out");
        } else {
            // 다른 요청은 필터를 계속 진행
            filterChain.doFilter(request, response);
        }
    }
}
