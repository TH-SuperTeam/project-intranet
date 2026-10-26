package com.superteam.intranet.controller;

import com.superteam.intranet.dto.CreateNewsRequest;
import com.superteam.intranet.dto.NewsResponse;
import com.superteam.intranet.service.NewsService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public NewsResponse publishNews(
            @Valid @RequestBody CreateNewsRequest request) {

        Long userId = 1L; // Tillfälligt för lokal testning

        return newsService.publishNews(request, userId);
    }
}