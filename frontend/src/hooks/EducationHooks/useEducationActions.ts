import { useState } from "react";
import type { useProgramMutations } from "./useProgramMutations";
import type { useSchoolClassMutations } from "./useSchoolClassMutations";
import type { Program } from "../../types/Program";
import type { SchoolClass } from "../../types/SchoolClass";

export type EducationTarget =
    | { type: "program"; item: Program }
    | { type: "class"; item: SchoolClass };

type ProgramMutations = ReturnType<typeof useProgramMutations>;
type SchoolClassMutations = ReturnType<typeof useSchoolClassMutations>;

export const useEducationActions = (
    programMutations: ProgramMutations,
    schoolClassMutations: SchoolClassMutations,
) => {
    const [archiveTarget, setArchiveTarget] = useState<EducationTarget | null>(
        null,
    );

    const [deleteTarget, setDeleteTarget] = useState<EducationTarget | null>(
        null,
    );

    const {
        archiveMutation: archiveProgramMutation,
        restoreMutation: restoreProgramMutation,
        deleteMutation: deleteProgramMutation,
    } = programMutations;

    const {
        archiveMutation: archiveClassMutation,
        restoreMutation: restoreClassMutation,
        deleteMutation: deleteClassMutation,
    } = schoolClassMutations;

    // Archive and restore

    const getArchiveMutation = () => {
        if (!archiveTarget) {
            return null;
        }

        if (archiveTarget.type === "program") {
            return archiveTarget.item.isActive
                ? archiveProgramMutation
                : restoreProgramMutation;
        }

        return archiveTarget.item.isActive
            ? archiveClassMutation
            : restoreClassMutation;
    };

    const selectedArchiveMutation = getArchiveMutation();

    const openArchiveDialog = (target: EducationTarget) => {
        archiveProgramMutation.reset();
        restoreProgramMutation.reset();
        archiveClassMutation.reset();
        restoreClassMutation.reset();

        setArchiveTarget(target);
    };

    const closeArchiveDialog = () => {
        setArchiveTarget(null);
    };

    const handleArchiveConfirm = () => {
        if (!archiveTarget || !selectedArchiveMutation) {
            return;
        }

        selectedArchiveMutation.mutate(archiveTarget.item.id, {
            onSuccess: closeArchiveDialog,
        });
    };

    // Permanent deletion

    const selectedDeleteMutation = deleteTarget
        ? deleteTarget.type === "program"
            ? deleteProgramMutation
            : deleteClassMutation
        : null;

    const openDeleteDialog = (target: EducationTarget) => {
        deleteProgramMutation.reset();
        deleteClassMutation.reset();

        setDeleteTarget(target);
    };

    const closeDeleteDialog = () => {
        setDeleteTarget(null);
    };

    const handleDeleteConfirm = () => {
        if (!deleteTarget || !selectedDeleteMutation) {
            return;
        }

        selectedDeleteMutation.mutate(deleteTarget.item.id, {
            onSuccess: closeDeleteDialog,
        });
    };

    return {
        archiveTarget,
        deleteTarget,
        selectedArchiveMutation,
        selectedDeleteMutation,
        openArchiveDialog,
        closeArchiveDialog,
        handleArchiveConfirm,
        openDeleteDialog,
        closeDeleteDialog,
        handleDeleteConfirm,
    };
};
