package com.superteam.intranet.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ProgramRequest(

        @NotBlank(message = "Programnamn krävs")
        @Size(max = 100, message = "Programnamnet får vara max 100 tecken")
        String name,

        @NotNull(message = "Skola måste väljas")
        Long schoolId

) {
}