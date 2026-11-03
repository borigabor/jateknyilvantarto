package com.example.demo.service;

import com.example.demo.repository.UserGameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.GameRepository;
import com.example.demo.domain.User;
import com.example.demo.domain.Game;
import com.example.demo.domain.UserGame;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class UserGameService {

    @Autowired
    private UserGameRepository userGameRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GameRepository gameRepository;

    public UserGame updateFavorite(String userId, String gameId, boolean favorite) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new EntityNotFoundException("Game not found"));

        UserGame userGame = userGameRepository
                .findByUserIdAndGameId(userId, gameId)
                .orElseGet(() -> {
                    UserGame newUserGame = new UserGame();
                    newUserGame.setUser(user);
                    newUserGame.setGame(game);
                    return newUserGame;
                });

        userGame.setFavorite(favorite);

        return userGameRepository.save(userGame);
    }

    public UserGame updateFavoriteByUsername(
            String username, String gameId, boolean favorite) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new EntityNotFoundException("User not found"));

        return updateFavorite(user.getId(), gameId, favorite);
    }

    public UserGame updateRating(String userId, String gameId, int rating) {
        if (rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Az értékelésnek 1 és 5 között kell lennie!");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new EntityNotFoundException("Game not found"));

        UserGame userGame = userGameRepository
                .findByUserIdAndGameId(userId, gameId)
                .orElseGet(() -> {
                    UserGame newUserGame = new UserGame();
                    newUserGame.setUser(user);
                    newUserGame.setGame(game);
                    return newUserGame;
                });

        userGame.setRating(rating);

        System.out.println("Kapott userId: " + userId);
        System.out.println("Kapott gameId: " + gameId);

        return userGameRepository.save(userGame);
    }

    public UserGame updateRatingByUsername(
            String username, String gameId, int rating) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new EntityNotFoundException("User not found"));

        return updateRating(user.getId(), gameId, rating);
    }

    public List<UserGame> getFavoriteGames(String userId) {
        return userGameRepository.findByUserIdAndFavoriteTrue(userId);
    }

    public List<UserGame> getFavoriteGamesByUsername(String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new EntityNotFoundException("User not found"));

        return getFavoriteGames(user.getId());
    }


}