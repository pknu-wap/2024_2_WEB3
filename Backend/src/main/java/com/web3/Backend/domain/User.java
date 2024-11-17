package com.web3.Backend.domain;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable=false,unique = true,length=10)
    private String userName;
    @Column(unique=true,nullable=false,length=20)
    private String userId;
    @Column(nullable=false,length=255)
    private String password;
    private Double preferenceLevel;
    private String profileImageUrl;
    @Column(nullable = true)
    private String role;
}
