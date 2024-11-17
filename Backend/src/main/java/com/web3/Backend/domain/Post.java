package com.web3.Backend.domain;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "postId")
    private int postId;

    private String drinkName;
    private Double preferenceLevel;
    private String postImage;
    private String type;
    private String area;
    private String food;

    @Column(nullable = false)
    private Double rating = 0.0;

    @Column(nullable = false)
    private int ratingCount = 0; // 별점 개수


}