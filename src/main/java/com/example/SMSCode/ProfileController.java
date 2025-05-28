package com.example.SMSCode;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    @GetMapping
    public Mono<String> getProfile(Mono<Authentication> authMono) {
        return authMono.map(auth -> "Hello, " + auth.getName());
    }
}
