package com.superteam.intranet.service;

import com.superteam.intranet.dto.CreateNewsRequest;
import com.superteam.intranet.dto.NewsResponse;
import com.superteam.intranet.mapper.NewsMapper;
import com.superteam.intranet.model.News;
import com.superteam.intranet.repository.NewsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NewsService {

    private final NewsRepository newsRepository;
    private final NewsMapper newsMapper;

    public NewsService(
            NewsRepository newsRepository,
            NewsMapper newsMapper) {
        this.newsRepository = newsRepository;
        this.newsMapper = newsMapper;
    }

    @Transactional
    public NewsResponse publishNews(
            CreateNewsRequest request,
            Long userId) {

        News news = newsMapper.toEntity(request);

        news.setUserId(userId);
        news.setPublished(true);

        News savedNews = newsRepository.save(news);

        return newsMapper.toResponse(savedNews);
    }
}
