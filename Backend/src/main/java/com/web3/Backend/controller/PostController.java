package com.web3.Backend.controller;

import com.web3.Backend.domain.Post;
import com.web3.Backend.dto.PostDto;
import com.web3.Backend.response.PostResponse;
import com.web3.Backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.web3.Backend.repository.PostRepository;

import java.util.List;

@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("/info/{postId}")
    public PostResponse getPostInfo(@PathVariable int postId) {
        PostDto postDto = postService.getPostById(postId);
        return new PostResponse(postDto);
    }
}