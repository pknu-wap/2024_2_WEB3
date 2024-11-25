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
        //rating을 0.0으로 기본값을 설정
       return rating == null ? 0.0 : Math.round(rating * 2 ) / 2.0;
    }
}