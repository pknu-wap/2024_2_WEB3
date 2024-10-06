package com.web3.Backend.controller;

import com.web3.Backend.security.UserPrincipal;
import com.web3.Backend.dto.PostDto;
import com.web3.Backend.response.PostResponse;
import com.web3.Backend.security.CurrentUser;
import com.web3.Backend.service.PostService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class PostController {

    @Autowired
    private PostService postService;

    @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = PostDto.class)))
    @GetMapping("/post/info/{postId}")
    public PostResponse getPostInfo(@PathVariable int postId) {
        PostDto postDto = postService.getPostById(postId);
        return new PostResponse(postDto);
    }

    @ApiResponse(responseCode = "200", description = "clicked bookmark")
    @PutMapping("/post/bookmark/{id}")
    public ResponseEntity<String> clickBookmark(@CurrentUser UserPrincipal userPrincipal, @PathVariable("id") int postId) {
        String result;
        try {
            result = postService.clickBookmark(userPrincipal, postId);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
