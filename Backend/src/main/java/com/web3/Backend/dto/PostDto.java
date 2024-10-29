package com.web3.Backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostDto {
    private int postId;
    private String drinkName;
    private Double preferenceLevel;
    private String postImage;
    private String type;
    private String area;

    public PostDto() {

    }

    public PostDto(int postId, String drinkName, String postImage) {
        postId= this.postId;
        drinkName = this.drinkName;
        postImage= this.postImage;
    }

}