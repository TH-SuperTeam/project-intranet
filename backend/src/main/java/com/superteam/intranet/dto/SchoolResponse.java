package com.superteam.intranet.dto;

import com.superteam.intranet.model.SchoolName;

public record SchoolResponse(
        Long id,
        SchoolName name
) {
}