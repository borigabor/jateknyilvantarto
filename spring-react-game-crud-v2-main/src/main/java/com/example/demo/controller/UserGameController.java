package com.example.demo.controller;

import com.example.demo.service.UserGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.domain.UserGame;
import java.util.List;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/user-games")
public class UserGameController {

    @Autowired
    private UserGameService userGameService;

    @PatchMapping("/favorite")
    public UserGame updateFavorite(
            Authentication authentication,
            @RequestParam String gameId,
            @RequestParam boolean favorite) {

        String username = authentication.getName();

        return userGameService.updateFavoriteByUsername(
                username, gameId, favorite);
    }

    @PatchMapping("/rating")
    public UserGame updateRating(
            Authentication authentication,
            @RequestParam String gameId,
            @RequestParam int rating) {

        String username = authentication.getName();

        return userGameService.updateRatingByUsername(
                username, gameId, rating);
    }

    @GetMapping("/favorites")
    public List<UserGame> getFavoriteGames(Authentication authentication) {

        String username = authentication.getName();

        return userGameService.getFavoriteGamesByUsername(username);
    }

}
