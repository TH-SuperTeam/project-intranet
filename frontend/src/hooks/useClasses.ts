import { useQuery } from "@tanstack/react-query";
import { getClassesByProgramId } from "../services/programApi";

const useClasses = (programId: number | null) => {
    return useQuery({
        queryKey: ["classes", programId],
        queryFn: () => getClassesByProgramId(programId!),
        enabled: programId !== null,
    });
};

export { useClasses };
