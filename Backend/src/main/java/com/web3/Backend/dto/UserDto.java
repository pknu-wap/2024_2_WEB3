package com.web3.Backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    private int userId;
    private String userName;
    private String profileImage;
    private Double preferenceLevel;

    // 생성자
    public UserDto(int userId, String userName, String profileImage, Double preferenceLevel) {
        this.userId = userId;
        this.userName = userName;
        this.profileImage = profileImage;
        this.preferenceLevel = preferenceLevel;
    }
}