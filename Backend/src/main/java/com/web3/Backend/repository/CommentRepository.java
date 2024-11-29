package com.web3.Backend.repository;

import com.web3.Backend.domain.Comment;
import com.web3.Backend.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post);
}