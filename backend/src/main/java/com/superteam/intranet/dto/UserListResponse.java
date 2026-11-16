
package com.superteam.intranet.dto;

import com.superteam.intranet.model.AccessRole;
import com.superteam.intranet.model.UserStatus;
import com.superteam.intranet.model.UserType;

public record UserListResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        String profileImageUrl,
        UserType userType,
        AccessRole accessRole,
        UserStatus status
) {
}
