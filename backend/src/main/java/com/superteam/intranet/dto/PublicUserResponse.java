package com.superteam.intranet.dto;

import com.superteam.intranet.model.UserType;

public record PublicUserResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        String profileImageUrl,
        UserType userType
) {
}