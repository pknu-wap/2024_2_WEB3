package com.web3.Backend.controller;

import com.web3.Backend.dto.UserDto;
import com.web3.Backend.service.SignUpService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SignUpController {
    private final SignUpService signupService;

    public SignUpController(SignUpService signupService) {
        this.signupService = signupService;
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<String> signUp(@RequestBody UserDto userDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // 유효성 검사가 실패했을 경우
            StringBuilder errors = new StringBuilder();
            bindingResult.getAllErrors().forEach(error -> errors.append(error.getDefaultMessage()).append("\n"));
            return new ResponseEntity<>(errors.toString(), HttpStatus.BAD_REQUEST);
        }

        try {
            signupService.SignUpProcess(userDto); // 회원가입 처리
            return new ResponseEntity<>("User successfully created", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            // 유효성 검사 실패 시 400 Bad Request 반환
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // 예기치 않은 오류가 발생했을 때 500 Internal Server Error 반환
            return new ResponseEntity<>("An error occurred while processing the request", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}