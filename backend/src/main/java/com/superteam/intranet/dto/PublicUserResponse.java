package com.superteam.intranet.dto;

import com.superteam.intranet.model.SchoolName;
import com.superteam.intranet.model.UserType;

public record PublicUserResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        String profileImageUrl,
        UserType userType,
        SchoolName school,
        Long programId,
        String programName,
        Long classId,
        String className
) {
}