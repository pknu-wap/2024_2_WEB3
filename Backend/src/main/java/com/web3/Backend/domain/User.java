package com.web3.Backend.domain;
import jakarta.persistence.*;


@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String userName;
    private String userId;
    private String password;
    private Double preferenceLevel;
    private String profileImageUrl;

    // Getters and Setters
}
