
package com.superteam.intranet.dto;

import com.superteam.intranet.model.TargetAudience;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UpdateNewsRequest(

        @NotBlank
        @Size(max = 255)
        String title,

        @NotBlank
        String content,

        @NotNull(message = "TargetAudience must not be empty")
        TargetAudience targetAudience

) {}
