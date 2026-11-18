
package com.superteam.intranet.dto;

import com.superteam.intranet.model.AccessRole;
import com.superteam.intranet.model.SchoolName;
import com.superteam.intranet.model.UserStatus;
import com.superteam.intranet.model.UserType;

import java.time.LocalDateTime;

public record MyProfileResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        String profileImageUrl,
        UserType userType,
        String bio,
        AccessRole accessRole,
        UserStatus status,
        LocalDateTime createdAt,
        SchoolName school,
        Long programId,
        String programName,
        Long classId,
        String className
) {}

