package com.example.SMSCode;

import com.example.SMSCode.DTO.OtpVerificationRequest;
import com.example.SMSCode.DTO.PhoneRequest;
import com.example.SMSCode.Services.JwtService;
import com.example.SMSCode.Services.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.time.Duration;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final OtpService otpService;
    private final JwtService jwtService;
    @PostMapping("/request-otp")
    public Mono<ResponseEntity<String>> requestOtp(@RequestBody PhoneRequest request) {
        return otpService.sendOtp(request.phone())
                .map(result -> ResponseEntity.ok("OTP sent"));
    }

    @PostMapping("/verify-otp")
    public Mono<ResponseEntity<String>> verifyOtp(@RequestBody OtpVerificationRequest request) {

        return otpService.verifyOtp(request.phone(), request.code())
                .map(valid -> {
                    if (!valid) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid code");
                    }
                    String token = jwtService.generateToken(request.phone());

                    ResponseCookie cookie = ResponseCookie.from("jwt", token)
                            .httpOnly(true)
                            .secure(false)
                            .path("/")
                            .sameSite("Lax")
                            .maxAge(Duration.ofMinutes(5))
                            .build();
                    System.out.println(cookie);

                    return ResponseEntity.ok()
                            .header(HttpHeaders.SET_COOKIE, cookie.toString())
                            .build();
                });
    }
}
