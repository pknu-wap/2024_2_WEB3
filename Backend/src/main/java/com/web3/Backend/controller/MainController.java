package com.web3.Backend.controller;

import com.web3.Backend.dto.PostDto;
import com.web3.Backend.repository.UserRepository;
import com.web3.Backend.response.Response;
import com.web3.Backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@RestController
public class MainController {
    @Autowired
    private PostService postService;

   //청탁주 페이지
    @GetMapping("/post/cheongtakju")
    public ResponseEntity<Response> getCheongTakju(
            @RequestParam(value="page",defaultValue="0") int page,
            @RequestParam(value="size",defaultValue="10") int size){

        Page<PostDto> post = postService.getPostByType("청주,탁주",page,size);

        Map<String, Object> data = new HashMap<>();
        data.put("post",post);

        Response response = new Response("200","청탁주 정보 조회 성공",data);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    //과실주 페이지
    @GetMapping("/post/fruitWine")
    public ResponseEntity<Response> getFruitWine(
            @RequestParam(value = "page", defaultValue="0") int page,
            @RequestParam(value = "size",defaultValue="10") int size){
        
        Page<PostDto> post = postService.getPostByType("과실주",page,size);
        
        Map<String, Object> data = new HashMap<>();
        data.put("post",post);
        
        Response response = new Response("200","과실주 정보 조회 성공",data);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    //검색 기능
    @GetMapping("/search")
    public ResponseEntity<Response> searchPost(
            @RequestParam(value="drinkName",required = false) String drinkName,
            @RequestParam(value="page",defaultValue="0") int page,
            @RequestParam(value="size",defaultValue="10") int size) {

        Map<String, Object> data = new HashMap<>();

        if (drinkName == null || drinkName.trim().isEmpty()) {
            //빈 문자열이면 메인 페이지로 리다이렉트
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
