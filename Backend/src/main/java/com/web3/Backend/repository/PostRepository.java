package com.web3.Backend.repository;
import com.web3.Backend.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findByDrinkName(String drinkName); // 음료 이름으로 게시물 조회

    List<Post> findByType(String type); // 특정 타입의 게시물 조회

}