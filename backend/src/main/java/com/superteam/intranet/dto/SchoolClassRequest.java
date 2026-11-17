package com.superteam.intranet.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record SchoolClassRequest(

        @NotBlank(message = "Klassnamn krävs")
        @Size(max = 100, message = "Klassnamnet får vara max 100 tecken")
        String name,

        @NotNull(message = "Startdatum krävs")
        LocalDate startDate,

        @NotNull(message = "Slutdatum krävs")
        LocalDate endDate,

        @NotNull(message = "Utbildning måste väljas")
        Long programId

) {
}