package com.superteam.intranet.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChangePasswordRequest(

        @NotBlank(message = "Nuvarande lösenord måste anges.")
        String currentPassword,

        @NotBlank(message = "Nytt lösenord måste anges.")
        @Size(min = 12, message = "Det nya lösenordet måste vara minst 12 tecken.")
        String newPassword

) {}
