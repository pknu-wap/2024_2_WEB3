package com.web3.Backend.service;

import com.web3.Backend.domain.Bookmark;
import com.web3.Backend.domain.Post;
import com.web3.Backend.domain.Rating;
import com.web3.Backend.domain.User;
import com.web3.Backend.dto.CustomUserDetails;
import com.web3.Backend.dto.PostDto;
import com.web3.Backend.exception.CustomException;
import com.web3.Backend.exception.ErrorCode;
import com.web3.Backend.repository.BookmarkRepository;
import com.web3.Backend.repository.RatingRepository;
import com.web3.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import com.web3.Backend.repository.PostRepository;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Optional;


@Service
public class PostService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Autowired
    private RatingRepository ratingRepository;
    public PostDto getPostById(int postId) {
        try {
            Optional<Post> postOptional = postRepository.findById(postId);

            if (postOptional.isPresent()) {
                Post post = postOptional.get();
                PostDto postDto = new PostDto();
                postDto.setDrinkName(post.getDrinkName());
                postDto.setPreferenceLevel(post.getPreferenceLevel());
                postDto.setPostImage(post.getPostImage());
                postDto.setType(post.getType());
                postDto.setArea(post.getArea());
                postDto.setRating(post.getRating());

                return postDto;
            } else {
                throw new CustomException(ErrorCode.POST_NOT_FOUND);
            }

        } catch (NumberFormatException e) {
            throw new CustomException(ErrorCode.INVALID_POST_ID);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.DATABASE_ERROR);
        }
    }
    public String clickBookmark(CustomUserDetails customUserDetails, int postId) throws CustomException {

        int userId = customUserDetails.getUser().getId();
        System.out.println("User ID from SecurityContext: " + userId);  // ID 확인 로그 추가

        // 포스트 찾기
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(ErrorCode.POST_NOT_FOUND));

        // 사용자 찾기 (CustomUserDetails에서 id 추출)
        User user = userRepository.findById(Math.toIntExact(customUserDetails.getUser().getId()))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 북마크 엔트리 찾기
        Bookmark bookmarkEntry = bookmarkRepository.findByUserAndPost(user, post);

        // 북마크 삭제 또는 추가
        if (bookmarkEntry != null) {
            bookmarkRepository.delete(bookmarkEntry);
            return "북마크가 삭제되었습니다.";
        } else {
            Bookmark newBookmark = new Bookmark();
            newBookmark.setUser(user);
            newBookmark.setPost(post);
            try {
                bookmarkRepository.save(newBookmark);
                return "북마크가 추가되었습니다.";
            } catch (Exception e) {
                throw new CustomException(ErrorCode.DATABASE_ERROR);
            }
        }
    }


    public double ratePost(CustomUserDetails customUserDetails, int postId, double ratingValue) {
        // 1. 사용자 ID 추출
        int userId = customUserDetails.getUser().getId();


        if (ratingValue < 0.0 || ratingValue > 5.0) {
            throw new CustomException(ErrorCode.INVALID_RATING_VALUE);
        }

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(ErrorCode.POST_NOT_FOUND));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        try {
            Rating existingRating = ratingRepository.findByPostAndUser(post, user);

            if (existingRating != null) {
                // 기존 별점 수정
                double oldRating = existingRating.getRatingValue();
                existingRating.setRatingValue(ratingValue);
                ratingRepository.save(existingRating);

                // 평균 별점 재계산
                post.setRating(
                        ((post.getRating() * post.getRatingCount()) - oldRating + ratingValue)
                                / post.getRatingCount()
                );
            } else {
                // 새 별점 등록
                Rating newRating = new Rating();
                newRating.setPost(post);
                newRating.setUser(user);
                newRating.setRatingValue(ratingValue);
                ratingRepository.save(newRating);

                // 평균 별점 및 카운트 업데이트
                int newCount = post.getRatingCount() + 1;
                post.setRating(
                        ((post.getRating() * post.getRatingCount()) + ratingValue) / newCount
                );
                post.setRatingCount(newCount);
            }

            double adjustedRating = Math.round(post.getRating() * 2) / 2.0;
            postRepository.save(post);

            return adjustedRating;
        } catch (Exception e) {
            throw new CustomException(ErrorCode.DATABASE_ERROR);
        }
    }
    //청탁주, 과일주 페이지에 필요한 데이터 페이징 처리
    public Page<PostDto> getCheongTakjuPage(int page, int size){
        PageRequest pageRequest = PageRequest.of(page, size);

        return postRepository.findByTypeIn(List.of("청주","탁주"),pageRequest)
                .map(post -> PostDto.builder()
                        .postId(post.getPostId())
                        .drinkName(post.getDrinkName())
                        .preferenceLevel(post.getPreferenceLevel())
                        .postImage("https://foreign-papagena-wap2024-2-web3-0d04a01a.koyeb.app" + post.getPostImage())
                        .type(post.getType())
                        .area(post.getArea())
                        .build());
    }

    public Page<PostDto> getFruitWinePage(int page, int size){
        PageRequest pageRequest = PageRequest.of(page,size);

        return postRepository.findByType("과실주",pageRequest)
                .map(post -> PostDto.builder()
                        .postId(post.getPostId())
                        .drinkName(post.getDrinkName())
                        .preferenceLevel(post.getPreferenceLevel())
                        .postImage("https://foreign-papagena-wap2024-2-web3-0d04a01a.koyeb.app" + post.getPostImage())
                        .type(post.getType())
                        .area(post.getArea())
                        .build());
    }
    //검색 기능을 페이징 처리
    public Page<PostDto> searchPostByName(String drinkName,int page,int size){
        PageRequest pageRequest = PageRequest.of(page,size);
        return postRepository.findByDrinkNameContainingIgnoreCase(drinkName,pageRequest)
                .map(post-> PostDto.builder()
                        .postId(post.getPostId())
                        .drinkName(post.getDrinkName())
                        .preferenceLevel(post.getPreferenceLevel())
                        .postImage(post.getPostImage())
                        .type(post.getType())
                        .area(post.getArea())
                        .build());
    }
}