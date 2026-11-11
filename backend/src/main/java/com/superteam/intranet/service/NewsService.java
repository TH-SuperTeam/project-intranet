
package com.superteam.intranet.service;

import com.superteam.intranet.dto.CreateNewsRequest;
import com.superteam.intranet.dto.NewsResponse;
import com.superteam.intranet.dto.UpdateNewsRequest;
import com.superteam.intranet.mapper.NewsMapper;
import com.superteam.intranet.model.News;

import com.superteam.intranet.model.TargetAudience;
import com.superteam.intranet.model.UserType;
import com.superteam.intranet.repository.NewsRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import com.superteam.intranet.model.AccessRole;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

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

    // Publicera en nyhet.
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

    // Hämta publicerade nyheter utifrån användarens roll med paginering.
        @Transactional(readOnly = true)
        public Page<NewsResponse> getPublishedNews(
                UserType userType,
                AccessRole accessRole,
                int page,
                int size) {

        List<TargetAudience> audiences;

        if (accessRole == AccessRole.ADMIN) {
                audiences = List.of(
                        TargetAudience.ALL,
                        TargetAudience.STUDENT,
                        TargetAudience.TEACHER
                );
        } else {
                audiences = List.of(
                        TargetAudience.ALL,
                        TargetAudience.valueOf(userType.name())
                );
        }

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.DESC, "createdAt")
        );

        return newsRepository
                .findByIsPublishedTrueAndTargetAudienceIn(
                        audiences,
                        pageable
                )
                .map(newsMapper::toResponse);
        }
 

    // Hämta en specifik publicerad nyhet utifrån användarens användartyp.
    @Transactional(readOnly = true)
    public NewsResponse getPublishedNewsById(
            Long id,
            UserType userType,
            AccessRole accessRole) {

        List<TargetAudience> audiences;

        if (accessRole == AccessRole.ADMIN) {
            audiences = List.of(
                    TargetAudience.ALL,
                    TargetAudience.STUDENT,
                    TargetAudience.TEACHER
            );
        } else {
            audiences = List.of(
                    TargetAudience.ALL,
                    TargetAudience.valueOf(userType.name())
            );
        }

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

    // Ändra en publicerad nyhet.
    @Transactional
    public NewsResponse updatePublishedNews(
            Long id,
            UpdateNewsRequest request) {

        News news = newsRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "News not found."
                ));

        if (!news.isPublished()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Only published news can be edited."
            );
        }

        news.setTitle(request.title().trim());
        news.setContent(request.content().trim());
        news.setTargetAudience(request.targetAudience());

        News updatedNews = newsRepository.save(news);

        return newsMapper.toResponse(updatedNews);
    }

    // Ta bort en nyhet.
    @Transactional
    public void deleteNews(Long id) {

        News news = newsRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "News not found."
                ));

        newsRepository.delete(news);
    }
}
