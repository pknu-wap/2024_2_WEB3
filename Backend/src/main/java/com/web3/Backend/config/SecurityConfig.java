package com.web3.Backend.config;

import com.web3.Backend.jwt.CustomLogoutFilter;
import com.web3.Backend.jwt.JWTFilter;
import com.web3.Backend.jwt.JWTUtil;
import com.web3.Backend.jwt.LoginFilter;
import com.web3.Backend.repository.RefreshRepository;
import com.web3.Backend.service.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;
    private final CustomUserDetailsService customUserDetailsService;

    public SecurityConfig(AuthenticationConfiguration authenticationConfiguration,
                          JWTUtil jwtUtil,
                          RefreshRepository refreshRepository,
                          CustomUserDetailsService customUserDetailsService) {
        this.authenticationConfiguration = authenticationConfiguration;
        this.jwtUtil = jwtUtil;
        this.refreshRepository = refreshRepository;
        this.customUserDetailsService = customUserDetailsService;
    }

    // AuthenticationManager Bean 정의
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);

        //UserDetailsService와 PasswordEncoder 연결
        authenticationManagerBuilder.userDetailsService(customUserDetailsService)
                .passwordEncoder(bCryptPasswordEncoder());

        return authenticationManagerBuilder.build();
    }

    // BCryptPasswordEncoder Bean 정의
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // SecurityFilterChain Bean 정의
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // 명시적으로 CORS 설정
                // CSRF 비활성화
                .csrf(csrf -> csrf.disable())
                // 폼 로그인 비활성화
                .formLogin(form -> form.disable())
                // HTTP Basic 인증 비활성화
                .httpBasic(httpBasic -> httpBasic.disable())

                // 경로별 인가 설정
                .authorizeRequests(auth -> auth
                        .requestMatchers("/auth", "/").permitAll()
                        .requestMatchers("/api/post/info/**").permitAll()
                        .requestMatchers("/api/post/cheongtakju/**").permitAll()
                        .requestMatchers("/api/post/fruitWine/**").permitAll()
                        .requestMatchers("/api/post/search").permitAll()
                        .requestMatchers("/auth/reissue").permitAll()
                        .requestMatchers("/auth/signup","/auth/login","/auth/logout","/error").permitAll()
                        .requestMatchers("/images/**").permitAll()
                        .requestMatchers("/api/post/comments/**").permitAll()
                        .anyRequest().authenticated() // 그 외 경로는 인증 필요
                )
                // JWT 필터 등록
                .addFilterAt(new LoginFilter(authenticationManager(http), jwtUtil, refreshRepository), UsernamePasswordAuthenticationFilter.class)
                .addFilterAt(new JWTFilter(jwtUtil), LoginFilter.class)
                .addFilterBefore(new CustomLogoutFilter(jwtUtil, refreshRepository), LogoutFilter.class)

                // 세션 설정: JWT 사용하므로 세션을 사용하지 않도록 설정
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
    // Cors 설정
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "https://holjjak.netlify.app"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization","refresh","Content-Type"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

