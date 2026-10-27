package com.superteam.intranet.mapper;

import com.superteam.intranet.dto.CreateNewsRequest;
import com.superteam.intranet.dto.NewsResponse;
import com.superteam.intranet.model.News;
import org.springframework.stereotype.Component;

@Component
public class NewsMapper {

    public News toEntity(CreateNewsRequest request) {
        News news = new News();

        news.setTitle(request.title().trim());
        news.setContent(request.content().trim());
        news.setTargetAudience(request.targetAudience());

        return news;
    }

    public NewsResponse toResponse(News news) {
        return new NewsResponse(
                news.getId(),
                news.getTitle(),
                news.getContent(),
                news.getUserId(),
                news.isPublished(),
                news.getTargetAudience(),
                news.getCreatedAt()
        );
    }
}
