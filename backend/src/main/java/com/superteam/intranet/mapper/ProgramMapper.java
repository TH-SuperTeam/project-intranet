package com.superteam.intranet.mapper;

import com.superteam.intranet.dto.ProgramRequest;
import com.superteam.intranet.dto.ProgramResponse;
import com.superteam.intranet.model.Program;
import com.superteam.intranet.model.School;

public class ProgramMapper {

    public static ProgramResponse toResponse(Program program) {
        return new ProgramResponse(
                program.getId(),
                program.getName(),
                program.getSchool().getId()
        );
    }

    public static Program toEntity(ProgramRequest request, School school) {
        Program program = new Program();

        program.setName(request.name());
        program.setSchool(school);

        return program;
    }
}