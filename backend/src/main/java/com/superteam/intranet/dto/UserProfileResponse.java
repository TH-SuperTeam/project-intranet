
package com.superteam.intranet.dto;

import com.superteam.intranet.model.UserType;

public record UserProfileResponse(
        Long id,
        String firstName,
        String lastName,
        String profileImageUrl,
        String email,
        UserType userType,
        String bio
) {
}
