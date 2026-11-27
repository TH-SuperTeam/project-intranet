import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../services/authApi";
import type { ResetPasswordRequest } from "../types/ResetPasswordRequest";

const useResetPassword = () => {
    return useMutation({
        mutationFn: (request: ResetPasswordRequest) => resetPassword(request),
    });
};

export default useResetPassword;
