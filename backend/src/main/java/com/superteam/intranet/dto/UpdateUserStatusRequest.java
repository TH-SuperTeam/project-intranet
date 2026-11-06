package com.superteam.intranet.dto;

import com.superteam.intranet.model.UserStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateUserStatusRequest(
        @NotNull UserStatus status
) {}
