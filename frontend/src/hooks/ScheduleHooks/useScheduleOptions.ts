import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../useAuth";
import { usePrograms } from "../EducationHooks/usePrograms";
import { useAllClasses } from "../EducationHooks/useAllClasses";
import { getClassrooms } from "../../services/classroomApi";

export const useScheduleOptions = (includeAllSchools = false) => {
    const { user } = useAuth();

    const programsQuery = usePrograms();
    const classesQuery = useAllClasses();

    const classroomsQuery = useQuery({
        queryKey: ["classrooms"],
        queryFn: getClassrooms,
    });

    const programs = programsQuery.data ?? [];

    const visiblePrograms = includeAllSchools
        ? programs
        : programs.filter((program) => program.school === user?.school);

    const schoolProgramIds = new Set(
        visiblePrograms.map((program) => program.id),
    );

    const allClasses = classesQuery.data ?? [];

    const classes = allClasses.filter((schoolClass) =>
        schoolProgramIds.has(schoolClass.programId),
    );

    return {
        programs,
        allClasses,
        classes,
        classrooms: classroomsQuery.data ?? [],
        isLoading:
            programsQuery.isLoading ||
            classesQuery.isLoading ||
            classroomsQuery.isLoading,
        isError:
            programsQuery.isError ||
            classesQuery.isError ||
            classroomsQuery.isError,
    };
};
