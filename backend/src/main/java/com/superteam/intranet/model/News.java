package com.superteam.intranet.model;

// JPA-annoteringar används för att koppla Java-klassen till databastabellen.
import jakarta.persistence.*;
// Datum och tider hanteras utan tidszon.
import java.time.LocalDateTime;

// Representerar en nyhet och sparas i tabellen "news".
@Entity
@Table(name = "news")
public class News {

    // Databasgenererat primärnyckel-ID.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Rubrik som måste anges.
    @Column(nullable = false)
    private String title;

    // Nyhetens innehåll; lagras som TEXT och måste anges.
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    // ID för användaren som skapade nyheten.
    @Column(name = "user_id", nullable = false)
    private Long userId;

    // Anger om nyheten har publicerats; nya nyheter är opublicerade.
    @Column(name = "is_published", nullable = false)
    private boolean isPublished = false;

    // Målgrupp lagras som enumens namn; standardvärdet är alla.
    @Enumerated(EnumType.STRING)
    @Column(name = "target_audience", nullable = false)
    private TargetAudience targetAudience = TargetAudience.ALL;

    // Tidpunkten då nyheten skapades.
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    // Valfri tidpunkt för senaste uppdatering.
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // JPA behöver en konstruktor som är åtkomlig för ORM-ramverket.
    protected News() {
    }

    // Körs automatiskt av JPA innan en ny post sparas.
    @PrePersist
    protected void onCreate() {
        // Sätt skapandetid om den inte redan har angetts.
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        // Vid skapandet är uppdateringstiden samma som skapandetiden.
        updatedAt = createdAt;
    }

    // Getters och setters ger åtkomst till fälten utan att exponera dem direkt.
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public boolean isPublished() { return isPublished; }
    public void setPublished(boolean published) {
        isPublished = published;
    }

    public TargetAudience getTargetAudience() { return targetAudience; }
    public void setTargetAudience(TargetAudience targetAudience) {
        this.targetAudience = targetAudience;
    }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
