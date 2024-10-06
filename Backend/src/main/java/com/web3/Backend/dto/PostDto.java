package com.web3.Backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostDto {
    private String drinkName;
    private Double preferenceLevel;
    private String postImage;
    private String type;
    private String area;
}