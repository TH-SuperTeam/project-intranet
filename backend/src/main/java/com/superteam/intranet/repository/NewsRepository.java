package com.superteam.intranet.repository;

import com.superteam.intranet.model.News;
import com.superteam.intranet.model.TargetAudience;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface NewsRepository extends JpaRepository<News, Long> {

    //Metoden innebär att den:
    //- endast hämtar nyheter där isPublished är true,
    //- filtrerar på de målgrupper vi skickar in,
    //- sorterar nyheterna med senaste publicering först.
    List<News> findByIsPublishedTrueAndTargetAudienceInOrderByCreatedAtDesc(
            Collection<TargetAudience> targetAudiences
    );
}
