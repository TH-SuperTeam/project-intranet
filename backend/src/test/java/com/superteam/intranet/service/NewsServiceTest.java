
package com.superteam.intranet.service;

import com.superteam.intranet.mapper.NewsMapper;
import com.superteam.intranet.model.News;
import com.superteam.intranet.repository.NewsRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class NewsServiceTest {

    @Mock
    private NewsRepository newsRepository;

    @Mock
    private NewsMapper newsMapper;

    @InjectMocks
    private NewsService newsService;

    @Test
    void deleteNewsShouldDeleteExistingNews() {
        // Arrange
        News news = new News();

        when(newsRepository.findById(1L))
                .thenReturn(Optional.of(news));

        // Act
        newsService.deleteNews(1L);

        // Assert
        verify(newsRepository).delete(news);
    }

    @Test
    void deleteNewsShouldThrow404WhenNewsDoesNotExist() {
        // Arrange
        when(newsRepository.findById(999L))
                .thenReturn(Optional.empty());

        // Act
        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> newsService.deleteNews(999L)
        );

        // Assert
        assertEquals(404, exception.getStatusCode().value());
        assertEquals("News not found.", exception.getReason());

        verifyNoInteractions(newsMapper);
    }


}

