package com.web3.Backend.repository;
import com.web3.Backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Boolean existsByUserName(String username);

    User findByUserName(String username);
    boolean existsByUserId(String userId);  // userId가 존재하는지 확인하는 메서드
}