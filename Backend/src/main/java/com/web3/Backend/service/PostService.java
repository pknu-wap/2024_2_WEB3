package com.web3.Backend.service;

import com.web3.Backend.domain.Post;
import com.web3.Backend.dto.PostDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.web3.Backend.repository.PostRepository;

import java.util.List;
import java.util.Optional;


@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

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
}