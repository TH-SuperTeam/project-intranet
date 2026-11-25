import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createClass,
    updateClass,
    archiveClass,
    restoreClass,
    deleteClass,
} from "../../services/schoolClassApi";
import type { SchoolClassRequest } from "../../types/SchoolClassRequest";

export const useSchoolClassMutations = () => {
    const queryClient = useQueryClient();

    const invalidateClasses = async () => {
        await queryClient.invalidateQueries({
            queryKey: ["classes"],
        });
    };

    const createMutation = useMutation({
        mutationFn: createClass,
        onSuccess: invalidateClasses,
    });

    const updateMutation = useMutation({
        mutationFn: ({
            id,
            schoolClass,
        }: {
            id: number;
            schoolClass: SchoolClassRequest;
        }) => updateClass(id, schoolClass),
        onSuccess: invalidateClasses,
    });

    const archiveMutation = useMutation({
        mutationFn: archiveClass,
        onSuccess: invalidateClasses,
    });

    const restoreMutation = useMutation({
        mutationFn: restoreClass,
        onSuccess: invalidateClasses,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteClass,
        onSuccess: invalidateClasses,
    });

    return {
        createMutation,
        updateMutation,
        archiveMutation,
        restoreMutation,
        deleteMutation,
    };
};
