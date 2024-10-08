package com.web3.Backend.service;

import com.web3.Backend.domain.Bookmark;
import com.web3.Backend.domain.Post;
import com.web3.Backend.domain.User;
import com.web3.Backend.dto.PostDto;
import com.web3.Backend.exception.CustomException;
import com.web3.Backend.exception.ErrorCode;
import com.web3.Backend.repository.BookmarkRepository;
import com.web3.Backend.repository.UserRepository;
import com.web3.Backend.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.web3.Backend.repository.PostRepository;

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


    public String clickBookmark(UserPrincipal userPrincipal, int postId) throws CustomException {

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(ErrorCode.POST_NOT_FOUND));

        User user = userRepository.findById(Math.toIntExact(userPrincipal.getId()))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));


        Bookmark bookmarkEntry = bookmarkRepository.findByUserAndPost(user, post);

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
}