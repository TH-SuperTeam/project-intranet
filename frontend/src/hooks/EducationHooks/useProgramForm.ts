import { useState } from "react";
import { useProgramMutations } from "./useProgramMutations";
import type { Program } from "../../types/Program";
import type { ProgramRequest } from "../../types/ProgramRequest";

type ProgramMutations = ReturnType<typeof useProgramMutations>;

export const useProgramForm = ({
    createMutation,
    updateMutation,
}: ProgramMutations) => {
    const [isProgramFormOpen, setIsProgramFormOpen] = useState(false);

    const [editingProgram, setEditingProgram] = useState<Program | undefined>(
        undefined,
    );

    const isFormPending = createMutation.isPending || updateMutation.isPending;

    const formError = editingProgram
        ? updateMutation.error?.message
        : createMutation.error?.message;

    const openCreateProgram = () => {
        createMutation.reset();
        updateMutation.reset();

        setEditingProgram(undefined);
        setIsProgramFormOpen(true);
    };

    const openEditProgram = (program: Program) => {
        createMutation.reset();
        updateMutation.reset();

        setEditingProgram(program);
        setIsProgramFormOpen(true);
    };

    const closeProgramForm = () => {
        setIsProgramFormOpen(false);
        setEditingProgram(undefined);
    };

    const handleProgramSubmit = (request: ProgramRequest) => {
        if (editingProgram) {
            updateMutation.mutate(
                {
                    id: editingProgram.id,
                    program: request,
                },
                {
                    onSuccess: closeProgramForm,
                },
            );
        } else {
            createMutation.mutate(request, {
                onSuccess: closeProgramForm,
            });
        }
    };

    return {
        isProgramFormOpen,
        editingProgram,
        isFormPending,
        formError,
        openCreateProgram,
        openEditProgram,
        closeProgramForm,
        handleProgramSubmit,
    };
};
