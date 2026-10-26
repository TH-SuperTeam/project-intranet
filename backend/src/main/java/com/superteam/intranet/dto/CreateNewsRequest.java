package com.superteam.intranet.dto;

import com.superteam.intranet.model.TargetAudience;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

//En record genererar automatiskt:
//- En konstruktor som tar emot alla fält.
//- Accessormetoder för att läsa värdena.
//- equals(), hashCode() och toString().

public record CreateNewsRequest(
        @NotBlank
        @Size(max = 255)
        String title,

        @NotBlank
        String content,

        @NotNull
        TargetAudience targetAudience
) {}