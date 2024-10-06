package com.web3.Backend.service;

import com.web3.Backend.domain.Bookmark;
import com.web3.Backend.domain.Post;
import com.web3.Backend.domain.User;
import com.web3.Backend.dto.PostDto;
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
            throw new IllegalArgumentException("Post not found for id: " + postId);
        }
    }


    public String clickBookmark(UserPrincipal userPrincipal, int postId) throws RuntimeException {


        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 게시물입니다."));

        User user = userRepository.findById(Math.toIntExact(userPrincipal.getId()))
                .orElseThrow(() -> new RuntimeException("해당 사용자를 찾을 수 없습니다."));

        Bookmark bookmarkEntry = bookmarkRepository.findByUserAndPost(user, post);

        if (bookmarkEntry != null) {
            bookmarkRepository.delete(bookmarkEntry);
            return "북마크가 삭제되었습니다.";
        } else {
            Bookmark newBookmark = new Bookmark();
            newBookmark.setUser(user);
            newBookmark.setPost(post);
            bookmarkRepository.save(newBookmark);
            return "북마크가 추가되었습니다.";
        }
    }
}