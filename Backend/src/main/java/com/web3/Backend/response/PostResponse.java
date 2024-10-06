package com.web3.Backend.response;

import com.web3.Backend.dto.PostDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostResponse {
    private PostDto postDto;

    public PostResponse(PostDto postDto) {
        this.postDto = postDto;
    }
}