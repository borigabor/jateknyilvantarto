package com.example.demo.service;

import com.example.demo.domain.Game;
import com.example.demo.exception.NoSuchEntityException;
import com.example.demo.repository.GameRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.domain.Game;
import com.example.demo.domain.User;
import com.example.demo.domain.UserGame;
import com.example.demo.dto.GameResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.List;
import java.util.Optional;
import jakarta.persistence.EntityNotFoundException;
import com.example.demo.repository.UserGameRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private UserGameRepository userGameRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public List<GameResponse> getAllGamesForUser(String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        List<Game> games = gameRepository.findAll();

        List<UserGame> userGames =
                userGameRepository.findByUserId(user.getId());

        List<GameResponse> result = new ArrayList<>();

        for (Game game : games) {

            UserGame userGame = userGames.stream()
                    .filter(ug -> ug.getGame().getId().equals(game.getId()))
                    .findFirst()
                    .orElse(null);

            boolean favorite = userGame != null && userGame.isFavorite();

            int rating = userGame != null ? userGame.getRating() : 0;

            result.add(new GameResponse(game, favorite, rating));
        }

        return result;
    }


    public List<Game> searchByTitle(String title) {
        return gameRepository.findByTitleContainingIgnoreCase(title);
    }

    public List<GameResponse> searchGamesForUser(String username, String title) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        List<Game> games = gameRepository.findByTitleContainingIgnoreCase(title);

        List<UserGame> userGames =
                userGameRepository.findByUserId(user.getId());

        List<GameResponse> result = new ArrayList<>();

        for (Game game : games) {

            UserGame userGame = userGames.stream()
                    .filter(ug -> ug.getGame().getId().equals(game.getId()))
                    .findFirst()
                    .orElse(null);

            boolean favorite = userGame != null && userGame.isFavorite();
            int rating = userGame != null ? userGame.getRating() : 0;

            result.add(new GameResponse(game, favorite, rating));
        }

        return result;
    }

    public Game save(Game game)  {
       return gameRepository.save(game);
    }


    public Game edit(Game game) {
        return gameRepository.save(game);
    }

    public Game findById(String id) {
        Optional<Game> optionalGame = gameRepository.findById(id);
        if (optionalGame.isPresent()) {
            return optionalGame.get();
        } else {
            throw new NoSuchEntityException("There was no game with id: " +id);
        }
    }

    @Transactional
    public void deleteById(String id) {
        userGameRepository.deleteByGameId(id);
        gameRepository.deleteById(id);
    }

}
