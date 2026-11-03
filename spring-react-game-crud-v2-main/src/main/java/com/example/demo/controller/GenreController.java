package com.example.demo.controller;

import com.example.demo.domain.Genre;
import com.example.demo.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("genre")
public class GenreController {

    @Autowired
    private GenreService genreService;

    @GetMapping()
    public List<Genre> getAllGenres() {
        return genreService.getAllGenres();
    }

}
