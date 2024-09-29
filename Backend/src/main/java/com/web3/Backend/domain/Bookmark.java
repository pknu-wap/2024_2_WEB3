package com.web3.Backend.domain;
import jakarta.persistence.*;

@Entity
@Table(name = "bookmark")
public class Bookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tableId;

    private int id; // user ID
    private int postId; // post ID

    @ManyToOne
    @JoinColumn(name = "id", insertable = false, updatable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "postId", insertable = false, updatable = false)
    private Post post;

    // Getters and Setters
}