package com.web3.Backend.exception;

import org.springframework.http.HttpStatus;

public enum ErrorCode {
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "400", "잘못된 요청입니다."),//GlobalExceptionHandler에서 처리
    INVALID_POST_ID(HttpStatus.BAD_REQUEST, "400-1", "잘못된 게시물 ID입니다."),
    INVALID_PATH_VARIABLE(HttpStatus.BAD_REQUEST, "400-2", "잘못된 경로 변수입니다."),//GlobalExceptionHandler에서 처리
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "401", "인증되지 않은 사용자입니다."), //GlobalExceptionHandler에서 처리
    INVALID_PASSWORD(HttpStatus.UNAUTHORIZED, "401-1", "비밀번호가 일치하지 않습니다."),
    POST_NOT_FOUND(HttpStatus.NOT_FOUND, "404", "해당 ID에 대한 게시물을 찾을 수 없습니다."),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "404-1", "해당 사용자를 찾을 수 없습니다."),
    USER_ALREADY_EXISTS(HttpStatus.CONFLICT, "409", "사용자가 이미 존재합니다."),
    DATABASE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "500", "데이터베이스 처리 중 오류가 발생했습니다."),
    INVALID_PREFERENCE_LEVEL(HttpStatus.BAD_REQUEST, "400-3", "유효하지 않은 도수 값입니다."),// 음수거나 범위에서 벗어난 경우
    INVALID_IMAGE_FORMAT(HttpStatus.BAD_REQUEST, "400-4", "유효하지 않은 이미지 형식입니다."),
    INVALID_RATING_VALUE(HttpStatus.BAD_REQUEST, "400-5", "유효하지 않은 별점 값입니다.");


    private final HttpStatus httpStatus;
    private final String code;
    private final String message;

    ErrorCode(HttpStatus httpStatus, String code, String message) {
        this.httpStatus = httpStatus;
        this.code = code;
        this.message = message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}