package com.web3.Backend.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor

public class PostDto {
    private int postId;
    private String drinkName;
    private Double preferenceLevel;
    private String postImage;
    private String type;
    private String area;

    public PostDto(){}
}