package com.example.SMSCode.Services;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {
    private final Map<String, String> otpStore = new ConcurrentHashMap<>();

    public Mono<Boolean> sendOtp(String phone) {
        String code = generateOtp();
        otpStore.put(phone, code);
        System.out.println(code + " a code for " + phone);
        return Mono.just(true);
    }

    public Mono<Boolean> verifyOtp(String phone, String code) {
        return Mono.just(code.equals(otpStore.get(phone)));
    }

    private String generateOtp() {
        return String.valueOf((int) (Math.random() * 900000) + 100000);
    }
}
