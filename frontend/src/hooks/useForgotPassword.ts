import { useMutation } from "@tanstack/react-query";
import type { ForgotPasswordRequest } from "../types/ForgotPasswordRequest";
import { forgotPassword } from "../services/authApi";

const useForgotPassword = () => {
    return useMutation({
        mutationFn: (request: ForgotPasswordRequest) => forgotPassword(request),
    });
};

export default useForgotPassword;
