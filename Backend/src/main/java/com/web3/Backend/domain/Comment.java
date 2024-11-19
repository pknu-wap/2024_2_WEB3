package com.web3.Backend.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO_INCREMENT 설정
    @Column(name = "commentId") // 데이터베이스 필드와 매핑
    private Long commentId; // 기본 키

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "postId", nullable = false)
    private Post post; // 댓글이 속한 게시물

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", nullable = false)
    private User user; // 댓글을 작성한 사용자

    @Column(nullable = false, length = 500)
    private String content; // 댓글 내용

}