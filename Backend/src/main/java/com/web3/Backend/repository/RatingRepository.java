package com.web3.Backend.repository;

import com.web3.Backend.domain.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import com.web3.Backend.domain.Post;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    Rating findByPostAndUserId(Post post, int userId);
}
