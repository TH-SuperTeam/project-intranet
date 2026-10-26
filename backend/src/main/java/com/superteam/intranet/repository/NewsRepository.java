package com.superteam.intranet.repository;

import com.superteam.intranet.model.News;
import org.springframework.data.jpa.repository.JpaRepository;

// Ger standardiserad databasåtkomst för nyheter.
// Spring Data JPA skapar implementationen automatiskt.
// News är entiteten och Long är typen för dess ID.
public interface NewsRepository extends JpaRepository<News, Long> {
}
