package com.example.demo.dto;

import com.example.demo.domain.Game;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameResponse {
    private String id;
    private String title;
    private String coverImageUrl;
    private String studio;
    private Object genres;
    private boolean favorite;
    private int rating;

    public GameResponse(Game game, boolean favorite, int rating) {
        this.id = game.getId();
        this.title = game.getTitle();
        this.coverImageUrl = game.getCoverImageUrl();
        this.studio = game.getStudio();
        this.genres = game.getGenres();
        this.favorite = favorite;
        this.rating = rating;
    }
}
