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
    private Double rating; // 평균 평점


    public PostDto(){}

    public Double getRating() {
        // 반환할 때만 0.5 단위로 반올림
        return Math.round(rating * 2) / 2.0;
    }
}