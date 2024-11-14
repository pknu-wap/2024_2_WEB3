package com.web3.Backend.controller;

import com.web3.Backend.dto.UserDto;
import com.web3.Backend.service.SignUpService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class SignUpController {
    private final SignUpService signupService;

    public SignUpController(SignUpService signupService){
        this.signupService = signupService;
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<String> signUp(@RequestBody UserDto userDto) {
        signupService.SignUpProcess(userDto); //회원가입 처리
        return new ResponseEntity<> ("User successfully created", HttpStatus.CREATED);
    }
}
