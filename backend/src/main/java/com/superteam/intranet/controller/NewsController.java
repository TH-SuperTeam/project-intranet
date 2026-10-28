package com.superteam.intranet.controller;

import com.superteam.intranet.dto.CreateNewsRequest;
import com.superteam.intranet.dto.NewsResponse;
import com.superteam.intranet.dto.UpdateNewsRequest;
import com.superteam.intranet.service.NewsService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.superteam.intranet.model.TargetAudience;
import java.util.List;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins="http://localhost:5173")
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    //Endpoint för att hämta alla nyheter
    @GetMapping
    public List<NewsResponse> getPublishedNews(
            @RequestParam TargetAudience targetAudience) {

        return newsService.getPublishedNews(targetAudience);
    }

    //Endpoint för att hämta en nyhet
    @GetMapping("/{id}")
    public NewsResponse getPublishedNewsById(
            @PathVariable Long id,
            @RequestParam TargetAudience targetAudience) {

        return newsService.getPublishedNewsById(
                id,
                targetAudience
        );
    }

    //Endpoint för att publicera en nyhet
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public NewsResponse publishNews(
            @Valid @RequestBody CreateNewsRequest request) {

        Long userId = 1L; // Tillfälligt för lokal testning

        return newsService.publishNews(request, userId);
    }


    //Endpoint för att ändra en nyhet
    @PutMapping("/{id}")
    public NewsResponse updatePublishedNews(
            @PathVariable Long id,
            @Valid @RequestBody UpdateNewsRequest request) {

        return newsService.updatePublishedNews(id, request);
    }

    @GetMapping("/{id}")
    public NewsResponse getPublishedNewsById(
            @PathVariable Long id,
            @RequestParam TargetAudience targetAudience) {

        return newsService.getPublishedNewsById(
                id,
                targetAudience
        );
    }
}