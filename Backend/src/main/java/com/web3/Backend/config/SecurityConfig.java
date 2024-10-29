package com.web3.Backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;

@Component
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/api/post/info/**").permitAll()  // 이 경로에 인증 비활성화
                        .requestMatchers("/api/post/bookmark/**").permitAll()
                        .requestMatchers("/post/cheongtakju/**").permitAll()
                        .requestMatchers("/post/fruitWine/**").permitAll()
                        .anyRequest().authenticated()  // 그 외의 요청은 인증 필요
                ).csrf(csrf -> csrf.disable()); //테스트때문에 비활성화, 나중에 지워야되는걸지도


        return http.build();
    }
}