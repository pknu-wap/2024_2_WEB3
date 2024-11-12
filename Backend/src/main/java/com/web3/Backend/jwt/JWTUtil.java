package com.web3.Backend.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JWTUtil {
    private SecretKey secretKey;

    public JWTUtil(@Value("${spring.jwt.secret}")String secret) {
        this.secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
    }

    public String getUsername(String token) {
        JwtParser parser = Jwts.parser()
                .setSigningKey(secretKey)
                .build();
        Claims claims =parser.parseClaimsJws(token).getBody();
        return claims.get("username",String.class);

    }
    public String getCategory(String token) {
        JwtParser parser = Jwts.parser()
                .setSigningKey(secretKey)
                .build();
        Claims claims = parser.parseClaimsJws(token).getBody();
        return claims.get("category",String.class);
    }

    public Boolean isExpired(String token) {
        JwtParser parser = Jwts.parser()
                .setSigningKey(secretKey)
                .build();
        Claims claims = parser.parseClaimsJws(token).getBody();
        Date expiration = claims.getExpiration();
        return expiration.before(new Date());
    }

    public String createJwt(String category,String username, Long expiredMs) {
        return Jwts.builder()
                .claim("category", category)
                .claim("username", username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+ expiredMs))
                .signWith(secretKey)
                .compact();
    }
}
