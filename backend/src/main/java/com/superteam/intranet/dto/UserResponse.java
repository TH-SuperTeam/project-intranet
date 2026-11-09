package com.superteam.intranet.dto;

import com.superteam.intranet.model.UserStatus;
import com.superteam.intranet.model.UserType;
import com.superteam.intranet.model.AccessRole;
import java.time.LocalDateTime;

public record UserResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        UserType userType,
        AccessRole accessRole,
        UserStatus status,
        LocalDateTime createdAt
) {}