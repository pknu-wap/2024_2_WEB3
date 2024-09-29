package com.web3.Backend.repository;
import com.web3.Backend.domain.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Integer> {
    List<Bookmark> findByUserId(Integer userId);// 사용자의 ID로 북마크 목록 조회
}