import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserRole } from "../../services/usersApi";
import type { AccessRole } from "../../types/AccessRole";

const useUpdateUserRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            userId,
            accessRole,
        }: {
            userId: number;
            accessRole: AccessRole;
        }) => updateUserRole(userId, accessRole),

        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({
                queryKey: ["userProfile", variables.userId],
            });
        },
    });
};

export default useUpdateUserRole;
