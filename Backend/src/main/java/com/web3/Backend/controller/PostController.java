package com.web3.Backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.web3.Backend.domain.Comment;
import com.web3.Backend.dto.CustomUserDetails;
import com.web3.Backend.dto.RatingDto;
import com.web3.Backend.exception.CustomException;
import com.web3.Backend.response.Response;
import com.web3.Backend.dto.PostDto;
import com.web3.Backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;



@RestController
@RequestMapping("/api")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("/post/info/{postId}")
    public ResponseEntity<Response> getPostInfo(@PathVariable int postId) {
        PostDto postDto = postService.getPostById(postId);

        // ObjectMapper로 JSON 데이터를 동적으로 가공
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode filteredData = mapper.valueToTree(postDto);

        // postId 필드 제거
        filteredData.remove("postId");

        // ObjectNode를 Map<String, Object>로 변환
        Map<String, Object> responseData = mapper.convertValue(filteredData, Map.class);

        Response response = new Response("200", "게시물 정보 조회 성공", responseData);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/post/bookmark/{id}")
    public ResponseEntity<Response> clickBookmark(@PathVariable("id") int postId) {
        // SecurityContext에서 인증된 사용자 정보를 CustomUserDetails로 직접 가져옴
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // CustomUserDetails에서 필요한 정보를 바로 사용
        String username = customUserDetails.getUsername();  // username 사용
        String result = postService.clickBookmark(customUserDetails, postId);
        Response response = new Response("200", result);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/post/rating/{postId}")
    public ResponseEntity<Response> ratePost(
            @PathVariable("postId") int postId,
            @RequestBody RatingDto ratingDto) {

        CustomUserDetails customUserDetails =
                (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        double updatedRating = postService.ratePost(customUserDetails, postId, ratingDto.getRating());

        Response response = new Response("200", "별점 등록 성공", Map.of("rating", updatedRating));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //댓글 등록
    @PostMapping("/post/comment/{postId}")
    public ResponseEntity<Response> addComment(
            @PathVariable int postId,
            @RequestBody Map<String, String> requestBody) {

        CustomUserDetails customUserDetails =
                (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String content = requestBody.get("content");
        if (content == null || content.isBlank()) {
            return new ResponseEntity<>(new Response("400", "내용을 입력해주세요.", null), HttpStatus.BAD_REQUEST);
        }

        Comment comment = postService.addComment(customUserDetails, postId, content);

        // 응답 생성
        Map<String, Object> data = Map.of("content", comment.getContent());
        Response response = new Response("200", "댓글 등록 성공", data);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //댓글 조회
    @GetMapping("/post/comments/{postId}")
    public ResponseEntity<Response> getCommentsByPostId(@PathVariable int postId) {
        Map<String, Object> data = postService.getCommentsDataByPostId(postId);

        Response response = new Response("200", "댓글 조회 성공", data);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 전체 페이지
    @GetMapping("/post/all/{page}")
    public ResponseEntity<Response> getAllPosts(
            @PathVariable int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) List<String> areas,
            @RequestParam(required = false) String preferenceLevel
    ) {

        try {
            Page<PostDto> postPage = postService.getAllPosts(page, size, areas, preferenceLevel);
            return buildResponse(postPage, "전체 데이터 조회 성공");
        } catch (IllegalArgumentException e) {
            return buildErrorResponse(e.getMessage());
        }
    }

    //청탁주 페이지
    @GetMapping("/post/cheongtakju/{page}")
    public ResponseEntity<Response> getCheongTakjuPage(
            @PathVariable int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) List<String> areas,
            @RequestParam(required = false) String preferenceLevel) {

        try {
            Page<PostDto> postPage = postService.getCheongTakjuPage(page, size, areas, preferenceLevel);
            return buildResponse(postPage, "청탁주 데이터 조회 성공");
        } catch (IllegalArgumentException e) {
            return buildErrorResponse(e.getMessage());
        }
    }

    //과실주 페이지
    @GetMapping("/post/fruitWine/{page}")
    public ResponseEntity<Response> getFruitWinePage(
            @PathVariable int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) List<String> areas,
            @RequestParam(required = false) String preferenceLevel) {
        try {
            Page<PostDto> postPage = postService.getFruitWinePage(page, size, areas, preferenceLevel);
            return buildResponse(postPage, "과실주 데이터 조회 성공");
        } catch (IllegalArgumentException e) {
            return buildErrorResponse(e.getMessage());
        }
    }

    //공통 응답 생성(성공)
    private ResponseEntity<Response> buildResponse(Page<PostDto> postPage, String successMessage) {
        if (postPage.getContent().isEmpty()) {
            Response response = new Response("404", "데이터가 없습니다.", null);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        Map<String, Object> data = new HashMap<>();
        data.put("content", postPage.getContent());
        data.put("totalPages", postPage.getTotalPages());
        data.put("currentPage", postPage.getNumber());

        Response response = new Response("200", successMessage, data);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 공통 응답 생성 (실패)
    private ResponseEntity<Response> buildErrorResponse(String errorMessage) {
        Response response = new Response("400", errorMessage, null);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
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
