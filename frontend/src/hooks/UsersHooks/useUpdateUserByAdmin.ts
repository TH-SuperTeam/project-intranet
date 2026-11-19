import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserByAdmin } from "../../services/usersApi";
import type { AdminUpdateUserRequest } from "../../types/AdminUpdateUserRequest";

const useUpdateUserByAdmin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            userId,
            user,
        }: {
            userId: number;
            user: AdminUpdateUserRequest;
        }) => updateUserByAdmin(userId, user),

        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });

            queryClient.invalidateQueries({
                queryKey: ["userProfile", variables.userId],
            });
        },
    });
};

export default useUpdateUserByAdmin;
