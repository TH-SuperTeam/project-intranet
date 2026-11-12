package com.superteam.intranet.controller;

import com.superteam.intranet.dto.NewsResponse;
import com.superteam.intranet.service.NewsService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/news")
public class PublicNewsController {

    private final NewsService newsService;

    public PublicNewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping
    public Page<NewsResponse> getPublicNews() {
        return newsService.getPublicNews();
    }
}