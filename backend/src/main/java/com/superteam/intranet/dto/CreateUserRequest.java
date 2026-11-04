package com.superteam.intranet.dto;

import com.superteam.intranet.model.UserType;
import com.superteam.intranet.model.AccessRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateUserRequest(

        @NotBlank(message = "First name is required")
        String firstName,

        @NotBlank(message = "Last name is required")
        String lastName,

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        String email,

        @NotBlank(message = "Password is required")
        @Size(min = 12, message = "Password must be at least 12 characters")
        String password,

        @NotNull(message = "User type is required")
        UserType userType,

        @NotNull(message = "Access role is required")
        AccessRole accessRole

) {}
