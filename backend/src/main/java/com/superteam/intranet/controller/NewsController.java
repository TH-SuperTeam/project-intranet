package com.superteam.intranet.controller;

import com.superteam.intranet.dto.CreateNewsRequest;
import com.superteam.intranet.dto.NewsResponse;
import com.superteam.intranet.dto.UpdateNewsRequest;
import com.superteam.intranet.service.NewsService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.superteam.intranet.dto.UserResponse;
import com.superteam.intranet.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.data.domain.Page;
import org.springframework.web.server.ResponseStatusException;

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
 // Endpoint för att hämta publicerade nyheter med paginering.
    @GetMapping
    public Page<NewsResponse> getPublishedNews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search,
            Authentication authentication) {

        if (page < 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Page must be 0 or greater."
            );
        }

        if (size < 1 || size > 10) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Size must be between 1 and 10."
            );
        }

        if (search != null && search.trim().length() > 100) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Search term must not exceed 100 characters."
            );
        }

        Long userId = (Long) authentication.getPrincipal();

        UserResponse user = userService.getUserById(userId);

        return newsService.getPublishedNews(
                user.userType(),
                user.accessRole(),
                page,
                size,
                search
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