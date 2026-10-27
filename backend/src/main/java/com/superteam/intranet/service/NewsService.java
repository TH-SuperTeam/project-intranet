package com.superteam.intranet.service;

import com.superteam.intranet.dto.CreateNewsRequest;
import com.superteam.intranet.dto.NewsResponse;
import com.superteam.intranet.dto.UpdateNewsRequest;
import com.superteam.intranet.mapper.NewsMapper;
import com.superteam.intranet.model.News;
import com.superteam.intranet.repository.NewsRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.superteam.intranet.model.TargetAudience;
import org.springframework.web.server.ResponseStatusException;

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
//Vad gör metoden?
//1. Den kontrollerar att målgruppen är STUDENT eller TEACHER.
//2. Den tillåter nyheter riktade till ALL samt den aktuella målgruppen.
//3. Den söker efter rätt ID och filtrerar samtidigt bort opublicerade nyheter.
//4. Om ingen tillåten nyhet hittas returneras ett 404 Not Found.
//5. Om nyheten hittas omvandlas den till NewsResponse med hjälp av er befintliga mapper.
    @Transactional(readOnly = true)
    public NewsResponse getPublishedNewsById(
            Long id,
            TargetAudience audience) {

        if (audience != TargetAudience.STUDENT
                && audience != TargetAudience.TEACHER) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid target audience."
            );
        }

        List<TargetAudience> audiences = List.of(
                TargetAudience.ALL,
                audience
        );

        News news = newsRepository
                .findByIdAndIsPublishedTrueAndTargetAudienceIn(
                        id,
                        audiences
                )
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "News not found."
                ));

        return newsMapper.toResponse(news);
    }


    @Transactional
    public NewsResponse updatePublishedNews(
            Long id,
            UpdateNewsRequest request) {

        // Hämta nyheten från databasen.
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "News not found."
                ));

        // Redigering gäller endast publicerade nyheter.
        if (!news.isPublished()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Only published news can be edited."
            );
        }

        // Uppdatera endast fälten som får ändras.
        news.setTitle(request.title().trim());
        news.setContent(request.content().trim());
        news.setTargetAudience(request.targetAudience());

        // Spara ändringarna i databasen.
        News updatedNews = newsRepository.save(news);

        return newsMapper.toResponse(updatedNews);
    }





}
