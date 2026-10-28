
package com.superteam.intranet.mapper;

import com.superteam.intranet.dto.CreateNewsRequest;
import com.superteam.intranet.dto.NewsResponse;
import com.superteam.intranet.model.News;
import com.superteam.intranet.model.TargetAudience;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class NewsMapperTest {

    private final NewsMapper newsMapper = new NewsMapper();

    @Test
    void toEntityShouldMapCreateNewsRequestCorrectly() {
        // Arrange
        CreateNewsRequest request = new CreateNewsRequest(
                "Viktig information",
                "Skolan håller stängt på fredag.",
                TargetAudience.STUDENT
        );

        // Act
        News news = newsMapper.toEntity(request);

        // Assert
        assertEquals("Viktig information", news.getTitle());
        assertEquals(
                "Skolan håller stängt på fredag.",
                news.getContent()
        );
        assertEquals(TargetAudience.STUDENT, news.getTargetAudience());
        assertFalse(news.isPublished());
    }

    @Test
    void toResponseShouldMapNewsCorrectly() {
        // Arrange
        News news = new News();
        news.setTitle("Viktig information");
        news.setContent("Skolan håller stängt på fredag.");
        news.setUserId(5L);
        news.setPublished(true);
        news.setTargetAudience(TargetAudience.TEACHER);

        // Act
        NewsResponse response = newsMapper.toResponse(news);

        // Assert
        assertEquals("Viktig information", response.title());
        assertEquals(
                "Skolan håller stängt på fredag.",
                response.content()
        );
        assertEquals(5L, response.userId());
        assertTrue(response.isPublished());
        assertEquals(TargetAudience.TEACHER, response.targetAudience());
        assertEquals(news.getCreatedAt(), response.createdAt());
    }
}
