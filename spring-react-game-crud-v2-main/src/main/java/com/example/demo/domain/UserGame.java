package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@Entity
@Table(
        name = "user_game",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_user_game",
                columnNames = {"user_id", "game_id"}
        )
)

@Getter
@Setter
public class UserGame {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "password"})
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Game game;

    @Column(nullable = false)
    private boolean favorite = false;

    private int rating;

}
