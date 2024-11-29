package com.web3.Backend.repository;

import com.web3.Backend.domain.RefreshEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface RefreshRepository extends JpaRepository<RefreshEntity,Long> {
    Boolean existsByRefresh(String refresh);

    //refresh token으로 사용자 찾기
    RefreshEntity findByUsername(String username);

    @Transactional
    void deleteByRefresh(String refresh);
}
