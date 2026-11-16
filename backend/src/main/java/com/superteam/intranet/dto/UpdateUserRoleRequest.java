package com.superteam.intranet.dto;

import com.superteam.intranet.model.AccessRole;
import jakarta.validation.constraints.NotNull;

public record UpdateUserRoleRequest(
        @NotNull AccessRole accessRole
) {}