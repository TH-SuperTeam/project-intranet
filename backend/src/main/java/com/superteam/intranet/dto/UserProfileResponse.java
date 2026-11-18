
package com.superteam.intranet.dto;

import com.superteam.intranet.model.SchoolName;
import com.superteam.intranet.model.UserType;
import com.superteam.intranet.model.AccessRole;
import com.superteam.intranet.model.UserStatus;

public record UserProfileResponse(
        Long id,
        String firstName,
        String lastName,
        String profileImageUrl,
        String email,
        UserType userType,
        AccessRole accessRole,
        UserStatus status,
        String bio,
        SchoolName school,
        Long programId,
        String programName,
        Long classId,
        String className
) {
}
