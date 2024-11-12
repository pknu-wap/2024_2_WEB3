package com.web3.Backend.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    // 사용자명 정규식 : 2~10자의 영어, 한글만 허용
    @NotBlank
    @Pattern(regexp = "^[a-zA-zㄱ-ㅎ가-힣]{2,10}$",message="사용자 이름은 2~10자여야 하며 문자와 한국어 문자만 포함해야 합니다.")
    private String userName;
    // 사용자 아이디 정규식 : 2~10자의 영어, 한글, 숫자만 허용

    @Pattern(regexp = "^[a-zA-zㄱ-ㅎ가-힣0-9]{2,10}$",message ="userId는 2~10자여야 하며 문자, 한글 및 숫자만 포함해야 합니다.")
    private String userId;
    // 패스워드 정규식 : 최소 8자 이상, 대소문자, 숫자, 특수문자 포함
    @NotBlank
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*?&])[A-Za-z/d@$!%*?&].{8,16}$",message="비밀번호는 숫자 1개, 문자 1개, 특수 문자 1개 이상을 포함하여 8~16자여야 합니다.")
    private String password;
    @Null
    private Double preferenceLevel;
    @Null
    private String profileImageUrl;
    @Null
    private String role;
}
