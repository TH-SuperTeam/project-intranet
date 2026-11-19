package com.superteam.intranet.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AdminUpdateUserRequest(

        @NotBlank(message = "Förnamn krävs")
        String firstName,

        @NotBlank(message = "Efternamn krävs")
        String lastName,

        @NotBlank(message = "E-postadress krävs")
        @Email(message = "Ogiltig e-postadress")
        String email,

        String password,

        @NotNull(message = "Program krävs")
        Long programId,

        Long classId

) {
}