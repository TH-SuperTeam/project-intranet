package com.superteam.intranet.dto;

import com.superteam.intranet.model.SchoolName;

public record ProgramResponse(
        Long id,
        String name,
        Long schoolId,
        SchoolName school,
        boolean isActive
) {
}