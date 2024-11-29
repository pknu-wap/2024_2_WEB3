package com.web3.Backend.service;

import com.web3.Backend.domain.*;
import com.web3.Backend.dto.CustomUserDetails;
import com.web3.Backend.dto.PostDto;
import com.web3.Backend.exception.CustomException;
import com.web3.Backend.exception.ErrorCode;
import com.web3.Backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;


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

    @Autowired
    private CommentRepository commentRepository;
    public PostDto getPostById(int postId) {
        try {
            Optional<Post> postOptional = postRepository.findById(postId);

            if (postOptional.isPresent()) {
                Post post = postOptional.get();
                PostDto postDto = new PostDto();
                postDto.setDrinkName(post.getDrinkName());
                postDto.setPreferenceLevel(post.getPreferenceLevel());
                postDto.setPostImage("https://foreign-papagena-wap2024-2-web3-0d04a01a.koyeb.app" + post.getPostImage());
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

    public Comment addComment(CustomUserDetails customUserDetails, int postId, String content) {

        int userId = customUserDetails.getUser().getId();
        // 게시물 존재 여부 확인
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(ErrorCode.POST_NOT_FOUND));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.UNAUTHORIZED));

        // 댓글 생성 및 저장
        Comment comment = Comment.builder()
                .post(post)
                .user(user)
                .content(content)
                .build();

        commentRepository.save(comment);

        return commentRepository.save(comment);
    }

    public Map<String, Object> getCommentsDataByPostId(int postId) {
        // 게시물 존재 여부 확인
        Optional<Post> postOptional = postRepository.findById(postId);
        if (postOptional.isEmpty()) {
            throw new CustomException(ErrorCode.POST_NOT_FOUND);
        }

        // 댓글 조회
        List<Comment> comments = commentRepository.findByPost(postOptional.get());

        // 댓글 데이터를 List<Map<String, Object>> 형태로 변환
        List<Map<String, Object>> commentData = comments.stream()
                .map(comment -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("commentId", comment.getCommentId());
                    map.put("content", comment.getContent());
                    map.put("postId", comment.getPost().getPostId());
                    map.put("userId", comment.getUser().getUserId());
                    return map;
                })
                .collect(Collectors.toList());

        // 데이터를 Map으로 감싸서 반환
        return Map.of("comments", commentData);
    }

    //전체 페이지
    public Page<PostDto> getAllPosts(int page, int size, List<String> areas, String preferenceLevel) {
        Pageable pageable = PageRequest.of(page, size);
        validateAreas(areas);

        Page<Post> postPage;

        if (preferenceLevel != null && areas != null && !areas.isEmpty()) {
            Double[] range = getPreferenceLevelRange(preferenceLevel);
            postPage = postRepository.findByAreaInAndPreferenceLevelBetween(areas, range[0], range[1], pageable);
        } else if (areas != null && !areas.isEmpty()) {
            postPage = postRepository.findByAreaIn(areas, pageable);
        } else if (preferenceLevel != null) {
            Double[] range = getPreferenceLevelRange(preferenceLevel);
            postPage = postRepository.findByPreferenceLevelBetween(range[0], range[1], pageable);
        } else {
            postPage = postRepository.findAll(pageable);
        }

        return postPage.map(this::mapToPostDto);
    }

    // 청탁주 페이지
    public Page<PostDto> getCheongTakjuPage(int page, int size, List<String> areas, String preferenceLevel) {
        Pageable pageable = PageRequest.of(page, size);
        validateAreas(areas);

        Page<Post> postPage;

        if (preferenceLevel != null && areas != null && !areas.isEmpty()) {
            Double[] range = getPreferenceLevelRange(preferenceLevel);
            postPage = postRepository.findByTypeInAndAreaInAndPreferenceLevelBetween(
                    List.of("청주", "탁주"), areas, range[0], range[1], pageable);
        } else if (areas != null && !areas.isEmpty()) {
            postPage = postRepository.findByTypeInAndAreaIn(List.of("청주", "탁주"), areas, pageable);
        } else if (preferenceLevel != null) {
            Double[] range = getPreferenceLevelRange(preferenceLevel);
            postPage = postRepository.findByTypeInAndPreferenceLevelBetween(List.of("청주", "탁주"), range[0], range[1], pageable);
        } else {
            postPage = postRepository.findByTypeIn(List.of("청주", "탁주"), pageable);
        }

        return postPage.map(this::mapToPostDto);
    }

    // 과실주 페이지
    public Page<PostDto> getFruitWinePage(int page, int size, List<String> areas, String preferenceLevel) {
        Pageable pageable = PageRequest.of(page, size);
        validateAreas(areas);

        Page<Post> postPage;

        if (preferenceLevel != null && areas != null && !areas.isEmpty()) {
            Double[] range = getPreferenceLevelRange(preferenceLevel);
            postPage = postRepository.findByTypeAndAreaInAndPreferenceLevelBetween(
                    "과실주", areas, range[0], range[1], pageable);
        } else if (areas != null && !areas.isEmpty()) {
            postPage = postRepository.findByTypeAndAreaIn("과실주", areas, pageable);
        } else if (preferenceLevel != null) {
            Double[] range = getPreferenceLevelRange(preferenceLevel);
            postPage = postRepository.findByTypeAndPreferenceLevelBetween("과실주", range[0], range[1], pageable);
        } else {
            postPage = postRepository.findByType("과실주", pageable);
        }

        return postPage.map(this::mapToPostDto);
    }

    // 유효성 검사: 지역
    private void validateAreas(List<String> areas) {
        if (areas != null) {
            List<String> validAreas = List.of("서울특별시", "부산광역시", "대구광역시", "인천광역시",
                    "광주광역시", "대전광역시", "울산광역시", "세종특별자치시", "경기도", "강원도", "충청북도",
                    "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주특별자치도");

            // 여러 지역이 들어오는 경우에도 잘 처리되도록 검증
            for (String area : areas) {
                if (!validAreas.contains(area)) {
                    throw new IllegalArgumentException("잘못된 지역 값입니다: " + area);
                }
            }
        }
    }

    // Post -> PostDto 매핑 메서드
    private PostDto mapToPostDto(Post post) {
        return PostDto.builder()
                .postId(post.getPostId())
                .drinkName(post.getDrinkName())
                .preferenceLevel(post.getPreferenceLevel())
                .postImage("https://foreign-papagena-wap2024-2-web3-0d04a01a.koyeb.app" + post.getPostImage())
                .type(post.getType())
                .area(post.getArea())
                .rating(0.0) // 기본 rating 0.0 설정
                .build();
    }

    // preferenceLevel을 범위로 변환
    private Double[] getPreferenceLevelRange(String preferenceLevel) {
        switch (preferenceLevel) {
            case "0-5":
                return new Double[]{0.0, 5.0};
            case "5-10":
                return new Double[]{5.0, 10.0};
            case "10-15":
                return new Double[]{10.0, 15.0};
            case "15-50":
                return new Double[]{15.0, 50.0};
            default:
                throw new IllegalArgumentException("잘못된 preferenceLevel 값입니다: " + preferenceLevel);
        }
    }

    //검색 기능을 페이징 처리
    public Page<PostDto> searchPostByName(String drinkName,int page,int size){
        PageRequest pageRequest = PageRequest.of(page,size);
        return postRepository.findByDrinkNameContainingIgnoreCase(drinkName,pageRequest)
                .map(post-> PostDto.builder()
                        .postId(post.getPostId())
                        .drinkName(post.getDrinkName())
                        .preferenceLevel(post.getPreferenceLevel())
                        .postImage("https://foreign-papagena-wap2024-2-web3-0d04a01a.koyeb.app" + post.getPostImage())
                        .type(post.getType())
                        .area(post.getArea())
                        .rating(0.0) //rating을 사용하지 않으므로 기본값으로 설정
                        .build());
    }
}