import { useState } from "react";
import { useSchoolClassMutations } from "./useSchoolClassMutations";
import type { SchoolClass } from "../../types/SchoolClass";
import type { SchoolClassRequest } from "../../types/SchoolClassRequest";

type SchoolClassMutations = ReturnType<typeof useSchoolClassMutations>;

export const useSchoolClassForm = ({
    createMutation,
    updateMutation,
}: SchoolClassMutations) => {
    const [isClassFormOpen, setIsClassFormOpen] = useState(false);

    const [editingClass, setEditingClass] = useState<SchoolClass | undefined>(
        undefined,
    );

    const [defaultProgramId, setDefaultProgramId] = useState<
        number | undefined
    >(undefined);

    const isClassFormPending =
        createMutation.isPending || updateMutation.isPending;

    const classFormError = editingClass
        ? updateMutation.error?.message
        : createMutation.error?.message;

    const openCreateClass = (programId: number) => {
        createMutation.reset();
        updateMutation.reset();

        setEditingClass(undefined);
        setDefaultProgramId(programId);
        setIsClassFormOpen(true);
    };

    const openEditClass = (schoolClass: SchoolClass) => {
        createMutation.reset();
        updateMutation.reset();

        setEditingClass(schoolClass);
        setDefaultProgramId(undefined);
        setIsClassFormOpen(true);
    };

    const closeClassForm = () => {
        setIsClassFormOpen(false);
        setEditingClass(undefined);
        setDefaultProgramId(undefined);
    };

    const handleClassSubmit = (request: SchoolClassRequest) => {
        if (editingClass) {
            updateMutation.mutate(
                {
                    id: editingClass.id,
                    schoolClass: request,
                },
                {
                    onSuccess: closeClassForm,
                },
            );
        } else {
            createMutation.mutate(request, {
                onSuccess: closeClassForm,
            });
        }
    };

    return {
        isClassFormOpen,
        editingClass,
        defaultProgramId,
        isClassFormPending,
        classFormError,
        openCreateClass,
        openEditClass,
        closeClassForm,
        handleClassSubmit,
    };
};
