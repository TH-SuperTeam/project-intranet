import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createProgram,
    updateProgram,
    archiveProgram,
    restoreProgram,
    deleteProgram,
} from "../../services/programApi";
import type { ProgramRequest } from "../../types/ProgramRequest";

export const useProgramMutations = () => {
    const queryClient = useQueryClient();

    const invalidateEducation = async () => {
        await Promise.all([
            queryClient.invalidateQueries({ queryKey: ["programs"] }),
            queryClient.invalidateQueries({ queryKey: ["classes"] }),
        ]);
    };

    const createMutation = useMutation({
        mutationFn: createProgram,
        onSuccess: invalidateEducation,
    });

    const updateMutation = useMutation({
        mutationFn: ({
            id,
            program,
        }: {
            id: number;
            program: ProgramRequest;
        }) => updateProgram(id, program),
        onSuccess: invalidateEducation,
    });

    const archiveMutation = useMutation({
        mutationFn: archiveProgram,
        onSuccess: invalidateEducation,
    });

    const restoreMutation = useMutation({
        mutationFn: restoreProgram,
        onSuccess: invalidateEducation,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteProgram,
        onSuccess: invalidateEducation,
    });

    return {
        createMutation,
        updateMutation,
        archiveMutation,
        restoreMutation,
        deleteMutation,
    };
};
