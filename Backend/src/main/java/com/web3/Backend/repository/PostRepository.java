package com.web3.Backend.repository;
import com.web3.Backend.domain.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    // type이 청주 또는 탁주인 데이터에서, 선택된 지역과 preferenceLevel을 적용하여 조회
    Page<Post> findByTypeInAndAreaInAndPreferenceLevelBetween(List<String> types, List<String> areas, Double min, Double max, Pageable pageable);
    // type이 청주 또는 탁주인 데이터에서, 지역 조건만 적용하여 조회
    Page<Post> findByTypeInAndAreaIn(List<String> types, List<String> areas, Pageable pageable);
    // type이 청주 또는 탁주인 데이터만 조회
    Page<Post> findByTypeIn(List<String> types, Pageable pageable);
    // 과실주 데이터 조회
    Page<Post> findByTypeAndAreaInAndPreferenceLevelBetween(String type, List<String> areas, Double min, Double max, Pageable pageable);
    // 과실주 데이터에서 지역만 적용하여 조회
    Page<Post> findByTypeAndAreaIn(String type, List<String> areas, Pageable pageable);
    // 과실주만 조회
    Page<Post> findByType(String type, Pageable pageable);
    // 지역과 preferenceLevel 범위에 맞는 데이터 조회
    Page<Post> findByAreaInAndPreferenceLevelBetween(List<String> areas, Double min, Double max, Pageable pageable);
    // 지역만 적용하여 데이터 조회
    Page<Post> findByAreaIn(List<String> areas, Pageable pageable);
    // 모든 데이터 조회
    Page<Post> findAll(Pageable pageable);
    Page<Post> findByPreferenceLevelBetween(Double min, Double max, Pageable pageable);
    Page<Post> findByTypeAndPreferenceLevelBetween(String type, Double min, Double max, Pageable pageable);
    Page<Post> findByTypeInAndPreferenceLevelBetween(List<String> types, Double min, Double max, Pageable pageable);

    Page<Post> findByDrinkNameContainingIgnoreCase(String drinkName, Pageable pageable);
}

