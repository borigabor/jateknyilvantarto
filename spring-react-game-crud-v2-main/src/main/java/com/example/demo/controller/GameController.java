package com.example.demo.controller;

import com.example.demo.domain.Game;
import com.example.demo.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import com.example.demo.dto.GameResponse;


import java.util.List;

@RestController()
@RequestMapping("games")
public class GameController {

    @Autowired
    private GameService gameService;

    @GetMapping()
    public List<GameResponse> getAllGames(Authentication authentication) {
        String username = authentication.getName();

        return gameService.getAllGamesForUser(username);
    }


    @GetMapping("/search")
    public List<GameResponse> searchGames(
            Authentication authentication,
            @RequestParam("q") String query) {

        String username = authentication.getName();
        return gameService.searchGamesForUser(username, query);
    }

    @GetMapping("/{id}")
    public Game getGame(@PathVariable String id) {
        return gameService.findById(id);
    }

    @PostMapping("/create")
    public Game createGame(@RequestBody Game game) {
        return gameService.save(game);
    }

    @PostMapping("/update")
    public Game updateGame(@RequestBody Game game) {
        return gameService.edit(game);
    }

    @DeleteMapping("/{id}")
    public void deleteGameById(@PathVariable String id) {
        gameService.deleteById(id);
    }

}
