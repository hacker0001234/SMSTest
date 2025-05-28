package com.example.SMSCode.Services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtService {
    private static final String SECRET_KEY = "your-256-bit-secret-key-change-me";

    public String generateToken(String phone) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + 5 * 60 * 1000);

        return Jwts.builder()
                .setSubject(phone)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
                .compact();
    }

    public String extractPhone(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
