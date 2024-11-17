package com.web3.Backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "rating")
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO_INCREMENT 설정
    @Column(name = "ratingId") // 데이터베이스 필드와 매핑
    private Long ratingId; // 기본 키

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "postId", nullable = false)
    private Post post; // 별점이 속한 게시물

    @Column(nullable = false)
    private int userId; // 별점을 남긴 사용자 ID

    @Column(nullable = false)
    private Double ratingValue; // 사용자 별점
}
