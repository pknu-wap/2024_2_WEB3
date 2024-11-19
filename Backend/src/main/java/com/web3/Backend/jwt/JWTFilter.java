package com.web3.Backend.jwt;

import com.web3.Backend.domain.User;
import com.web3.Backend.dto.CustomUserDetails;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.io.PrintWriter;

public class JWTFilter extends OncePerRequestFilter {
    private final JWTUtil jwtUtil;
    public JWTFilter(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if(request.getRequestURI().startsWith("/auth/signup") ||
                request.getRequestURI().startsWith("/api/post/cheongtakju") ||
                request.getRequestURI().startsWith("/api/post/fruitWine") ||
                request.getRequestURI().startsWith("/api/post/search")) {

            filterChain.doFilter(request,response);
            return;
        }
        // 헤더에서 access키에 담긴 토큰을 꺼냄
        String accessToken = request.getHeader("Authorization");

        //토큰이 없다면 다음 필터로 넘김
        if (accessToken != null && accessToken.startsWith("Bearer ")) {
            accessToken = accessToken.substring(7);// "Bearer " 접두사를 제거하여 토큰만 추출
            if (jwtUtil.isExpired(accessToken)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Access token expired");
                return;
            }

            // 토큰이 access인지 확인 (발급시 페이로드에 명시)
            String category = jwtUtil.getCategory(accessToken);

            if (!category.equals("access")) {
                //response body
                PrintWriter writer = response.getWriter();
                writer.print("invalid access token");

                //response status code
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
            // username 값을 획득
            String username = jwtUtil.getUsername(accessToken);
            // JWT에서 userId도 추출하여 설정하는 로직 추가
            int userId = jwtUtil.getUserId(accessToken);  // getUserId는 jwtUtil에서 구현 필요

            // User 객체 생성 후, username과 userId 설정
            User user = new User();
            user.setUserName(username);
            user.setId(userId);  // userId 설정

            // CustomUserDetails 생성
            CustomUserDetails customUserDetails = new CustomUserDetails(user);

            // Authentication 생성 및 SecurityContext에 설정
            Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
        filterChain.doFilter(request, response);
    }
}