package com.web3.Backend.controller;

import com.web3.Backend.response.Response;
import com.web3.Backend.security.UserPrincipal;
import com.web3.Backend.dto.PostDto;
import com.web3.Backend.security.CurrentUser;
import com.web3.Backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

        data.put("postDto", postDto);


        Response response = new Response("200", "게시물 정보 조회 성공", data);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/post/bookmark/{id}")
    public ResponseEntity<Response> clickBookmark(@CurrentUser UserPrincipal userPrincipal, @PathVariable("id") int postId) {
        String result = postService.clickBookmark(userPrincipal, postId);
        Response response = new Response("200", result);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    //청탁주 페이지
    @GetMapping("/post/cheongtakju/{page}")
    public ResponseEntity<Response> getCheongTakjuPage(
            @PathVariable int page,
            @RequestParam(defaultValue="10") int size){
        Page<PostDto> postPage = postService.getCheongTakjuPage(page,size);
        Map<String, Object> data = new HashMap<>();
        data.put("content",postPage.getContent());
        data.put("totalPages",postPage.getTotalPages());
        data.put("currentPage",postPage.getNumber());

        Response response = new Response("200","청탁주 정보 조회 성공",data);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    //과실주 페이지
    @GetMapping("/post/fruitWine/{page}")
    public ResponseEntity<Response> getFruitWinePage(
            @PathVariable int page,
            @RequestParam(defaultValue="10") int size){
        Page<PostDto> postPage = postService.getFruitWinePage(page,size);
        Map<String, Object> data = new HashMap<>();
        data.put("content",postPage.getContent());
        data.put("totalPages",postPage.getTotalPages());
        data.put("currentPage",postPage.getNumber());
        Response response = new Response("200","과실주 정보 조회 성공",data);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    //검색 기능
    @GetMapping("/post/search")
    public ResponseEntity<Response> searchPost(
            @RequestParam(value="drinkName",required = false) String drinkName,
            @RequestParam(value="page",defaultValue="0") int page,
            @RequestParam(value="size",defaultValue="10") int size) {

        Map<String, Object> data = new HashMap<>();

        if (drinkName == null || drinkName.trim().isEmpty()) {
            //빈 문자열
            Response response = new Response("400", "잘못된 접근", data);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        Page<PostDto> searchResult = postService.searchPostByName(drinkName, page, size);
        if (searchResult.isEmpty()) {
            Response response = new Response("404", "해당 데이터가 존재하지 않습니다.", data);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        } else {
            data.put("searchResult", searchResult);
            Response response = new Response("200", "검색 결과 조회 성공", data);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }
}
