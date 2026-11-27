package com.superteam.intranet.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ForgotPasswordRequest(
     @NotBlank(message = "E-postadress krävs")
     @Email(message = "Ogiltig e-postadress")
     String email
) {
}
