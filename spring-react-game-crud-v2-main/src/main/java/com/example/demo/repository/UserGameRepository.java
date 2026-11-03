package com.example.demo.repository;

import com.example.demo.domain.UserGame;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface UserGameRepository extends JpaRepository<UserGame, String> {

    Optional<UserGame> findByUserIdAndGameId(String userId, String gameId);

    List<UserGame> findByUserIdAndFavoriteTrue(String userId);

    List<UserGame> findByUserId(String userId);

    void deleteByGameId(String gameId);
}
