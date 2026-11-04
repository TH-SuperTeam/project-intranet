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
import com.superteam.intranet.dto.UserResponse;
import com.superteam.intranet.service.UserService;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins="http://localhost:5173")
public class NewsController {

    private final NewsService newsService;
    private final UserService userService;

    public NewsController(
            NewsService newsService,
            UserService userService) {

        this.newsService = newsService;
        this.userService = userService;
    }
    //Endpoint för att hämta alla nyheter
    @GetMapping
    public List<NewsResponse> getPublishedNews(
            Authentication authentication) {

        Long userId = (Long) authentication.getPrincipal();

        UserResponse user = userService.getUserById(userId);

        return newsService.getPublishedNews(
                user.userType(),
                user.accessRole()
        );
    }

    //Endpoint för att hämta en nyhet
    @GetMapping("/{id}")
    public NewsResponse getPublishedNewsById(
            @PathVariable Long id,
            Authentication authentication) {

        Long userId = (Long) authentication.getPrincipal();

        UserResponse user = userService.getUserById(userId);

        return newsService.getPublishedNewsById(
                id,
                user.userType(),
                user.accessRole()
        );
    }

    //Endpoint för att publicera en nyhet
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public NewsResponse publishNews(
            @Valid @RequestBody CreateNewsRequest request,
            Authentication authentication) {

        Long userId = (Long) authentication.getPrincipal();

        return newsService.publishNews(request, userId);
    }


    //Endpoint för att ändra en nyhet
    @PutMapping("/{id}")
    public NewsResponse updatePublishedNews(
            @PathVariable Long id,
            @Valid @RequestBody UpdateNewsRequest request) {

        return newsService.updatePublishedNews(id, request);
    }

    // Endpoint för att ta bort en nyhet
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteNews(@PathVariable Long id) {
        newsService.deleteNews(id);
    }

}