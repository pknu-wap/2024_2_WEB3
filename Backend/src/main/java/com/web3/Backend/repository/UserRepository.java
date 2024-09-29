package com.web3.Backend.repository;
import com.web3.Backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // 사용자 ID로 사용자 조회
    User findByUserId(String userId);

}