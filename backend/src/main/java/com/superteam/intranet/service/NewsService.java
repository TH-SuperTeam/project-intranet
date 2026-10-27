package com.superteam.intranet.service;

import com.superteam.intranet.dto.CreateNewsRequest;
import com.superteam.intranet.dto.NewsResponse;
import com.superteam.intranet.mapper.NewsMapper;
import com.superteam.intranet.model.News;
import com.superteam.intranet.repository.NewsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.superteam.intranet.model.TargetAudience;
import java.util.List;

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

    //Vad händer här?
    //1. Om målgruppen är STUDENT hämtas både ALL och STUDENT.
    //2. Om målgruppen är TEACHER hämtas både ALL och TEACHER.
    //3. Om målgruppen är ALL hämtas alla publicerade nyheter.
    //4. Mappern omvandlar varje News-entitet till NewsResponse.
    //5. Resultatet returneras som en lista.
    //@Transactional(readOnly = true) markerar att metoden bara läser data från databasen.
    @Transactional(readOnly = true)
    public List<NewsResponse> getPublishedNews(TargetAudience audience) {

        List<TargetAudience> audiences;

        if (audience == TargetAudience.ALL) {
            audiences = List.of(
                    TargetAudience.ALL,
                    TargetAudience.STUDENT,
                    TargetAudience.TEACHER
            );
        } else {
            audiences = List.of(
                    TargetAudience.ALL,
                    audience
            );
        }

        return newsRepository
                .findByIsPublishedTrueAndTargetAudienceInOrderByCreatedAtDesc(audiences)
                .stream()
                .map(newsMapper::toResponse)
                .toList();
    }
}
