package com.superteam.intranet.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateProfileRequest(

        @NotBlank(message = "Förnamn är obligatoriskt")
        String firstName,

        @NotBlank(message = "Efternamn är obligatoriskt")
        String lastName,

        @NotBlank(message = "E-postadress är obligatorisk")
        @Email(message = "Ogiltigt e-postformat")
        String email,

        @Size(max = 500, message = "Biografin får inte överstiga 500 tecken")
        String bio,

        String profileImageUrl

) {}
