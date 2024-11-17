package com.web3.Backend.repository;

import com.web3.Backend.domain.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import com.web3.Backend.domain.Post;
import com.web3.Backend.domain.User;


public interface RatingRepository extends JpaRepository<Rating, Long> {
    Rating findByPostAndUser(Post post, User user); // 사용자와 게시물을 기반으로 별점 검색
}
