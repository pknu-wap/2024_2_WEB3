package com.web3.Backend.exception;

import com.web3.Backend.response.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<Response> handleCustomException(CustomException ex) {
        ErrorCode errorCode = ex.getErrorCode();

        Response response = new Response(errorCode.getCode(), errorCode.getMessage(), null);
        return new ResponseEntity<>(response, errorCode.getHttpStatus());
    }


    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Response> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException ex) {
        Response response = new Response("400-2", "잘못된 경로 변수입니다.", null);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<Response> handleAuthenticationException(AuthenticationException ex) {
        Response response = new Response("401", "인증되지 않은 사용자입니다.", null);
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }
}