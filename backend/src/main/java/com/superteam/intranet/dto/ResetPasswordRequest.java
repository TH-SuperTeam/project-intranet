package com.superteam.intranet.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ResetPasswordRequest(

        @NotBlank(message = "Token krävs")
        String token,

        @NotBlank(message = "Nytt lösenord krävs")
        @Size (min = 12, message = "Det nya lösenordet måste vara minst 12 tecken.")
        String newPassword
) {
}
