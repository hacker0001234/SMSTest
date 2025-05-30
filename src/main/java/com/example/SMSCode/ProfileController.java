package com.example.SMSCode;

import org.springframework.http.HttpCookie;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    @GetMapping
    public Mono<String> getProfile(Mono<Authentication> authMono, ServerHttpRequest request) {

        List<String> cookies = request.getCookies().get("jwt").stream()
                .map(HttpCookie::getValue)
                .toList();

        return authMono.map(auth -> "Hello, " + auth.getName());
    }
    @GetMapping("/check")
    public Mono<Boolean> CheckProfile(Authentication authentication){
        return Mono.just(authentication != null &&  authentication.isAuthenticated());
    }
}
