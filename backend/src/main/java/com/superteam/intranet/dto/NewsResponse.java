package com.superteam.intranet.dto;

import com.superteam.intranet.model.TargetAudience;
import java.time.LocalDateTime;
import java.util.Set;

//En record genererar automatiskt:
//- En konstruktor som tar emot alla fält.
//- Accessormetoder för att läsa värdena.
//- equals(), hashCode() och toString().


public record NewsResponse(
        Long id,
        String title,
        String content,
        Long userId,
        boolean isPublished,
        Set<TargetAudience> targetAudience,
        LocalDateTime createdAt
) {}
