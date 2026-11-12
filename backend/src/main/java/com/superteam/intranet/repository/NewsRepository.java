package com.superteam.intranet.repository;

import com.superteam.intranet.model.News;
import com.superteam.intranet.model.TargetAudience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Collection;
import java.util.Optional;

public interface NewsRepository extends JpaRepository<News, Long> {

    // Hämta publicerade nyheter som matchar minst en av målgrupperna.
    @Query("""
            SELECT DISTINCT n
            FROM News n
            JOIN n.targetAudience a
            WHERE n.isPublished = true
            AND a IN :audiences
            """)
    Page<News> findPublishedNewsByAudiences(
            @Param("audiences") Collection<TargetAudience> audiences,
            Pageable pageable
    );

    // Hämta en publicerad nyhet om den matchar minst en tillåten målgrupp.
    @Query("""
            SELECT DISTINCT n
            FROM News n
            JOIN n.targetAudience a
            WHERE n.id = :id
            AND n.isPublished = true
            AND a IN :audiences
            """)
    Optional<News> findPublishedNewsByIdAndAudiences(
            @Param("id") Long id,
            @Param("audiences") Collection<TargetAudience> audiences
    );

    @Query("""
        SELECT DISTINCT n
        FROM News n
        JOIN n.targetAudience a
        WHERE n.isPublished = true
        AND a = :audience
        """)
    Page<News> findPublishedNewsByAudience(
            @Param("audience") TargetAudience audience,
            Pageable pageable
    );
}