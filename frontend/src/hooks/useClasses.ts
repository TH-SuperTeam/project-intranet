import { useQuery } from "@tanstack/react-query";
import { getClassesByProgramId } from "../services/programApi";

const useClasses = (
    programId: number | null,
    includeArchived: boolean = false,
) => {
    return useQuery({
        queryKey: ["classes", programId, includeArchived],
        queryFn: () => getClassesByProgramId(programId!, includeArchived),
        enabled: programId !== null,
    });
};

export { useClasses };
