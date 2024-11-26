package com.web3.Backend.service;
import com.web3.Backend.dto.CustomUserDetails;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;

public class SomeService {
    public void someMethod() {
        // SecurityContext에서 인증된 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 인증된 사용자가 있으면
        if (authentication != null) {
            Object principal = authentication.getPrincipal(); // principal은 사용자 객체입니다.

            // principal이 CustomUserDetails인 경우에 사용자 정보 추출
            if (principal instanceof CustomUserDetails) {
                CustomUserDetails userDetails = (CustomUserDetails) principal;
                int userId = userDetails.getUser().getId(); // 예시: 사용자 ID 추출
                System.out.println("Authenticated User ID: " + userId);
            }
        } else {
            System.out.println("No authenticated user found");
        }
    }
}