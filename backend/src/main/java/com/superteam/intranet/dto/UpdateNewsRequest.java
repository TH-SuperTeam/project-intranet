
package com.superteam.intranet.dto;

import com.superteam.intranet.model.TargetAudience;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Set;

public record UpdateNewsRequest(

        @NotBlank
        @Size(max = 255)
        String title,

        @NotBlank
        String content,

        @NotEmpty(message = "Minst en målgrupp måste väljas")
        Set<TargetAudience> targetAudience

) {}
