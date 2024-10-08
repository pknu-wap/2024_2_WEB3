package com.web3.Backend.controller;

import com.web3.Backend.response.Response;
import com.web3.Backend.security.UserPrincipal;
import com.web3.Backend.dto.PostDto;
import com.web3.Backend.security.CurrentUser;
import com.web3.Backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api")
public class PostController {

    @Autowired
    private PostService postService;


    @GetMapping("/post/info/{postId}")
    public ResponseEntity<Response> getPostInfo(@PathVariable int postId) {
        PostDto postDto = postService.getPostById(postId);

        Map<String, Object> data = new HashMap<>();
        data.put("post", postDto);

        Response response = new Response("200", "게시물 정보 조회 성공", data);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/post/bookmark/{id}")
    public ResponseEntity<Response> clickBookmark(@CurrentUser UserPrincipal userPrincipal, @PathVariable("id") int postId) {
        String result = postService.clickBookmark(userPrincipal, postId);

        Response response = new Response("200", result);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
