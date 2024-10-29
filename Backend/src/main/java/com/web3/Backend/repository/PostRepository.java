package com.web3.Backend.repository;
import com.web3.Backend.domain.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    Page<Post> findByType(String type, Pageable pageable);
    Page<Post> findByDrinkNameContainingIgnoreCase(String drinkName, Pageable pageable);

}

