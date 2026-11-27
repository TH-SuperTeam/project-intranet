package com.superteam.intranet.dto;

import jakarta.validation.constraints.NotBlank;

public record ValidateTokenRequest(
        @NotBlank(message = "Token krävs")
        String token
) {}
