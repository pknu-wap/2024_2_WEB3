package com.web3.Backend.repository;
import com.web3.Backend.domain.Bookmark;
import com.web3.Backend.domain.Post;
import com.web3.Backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    // 사용자와 게시물에 해당하는 북마크를 찾는 메서드
    Bookmark findByUserAndPost(User user, Post post);
    List<Bookmark> findByUserId(int userId);
}