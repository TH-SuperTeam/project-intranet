import { useQuery } from "@tanstack/react-query";
import { validateResetToken } from "../services/authApi";

const useValidateResetToken = (token: string | null) => {
    return useQuery({
        queryKey: ["validateResetToken", token],
        queryFn: async () => {
            await validateResetToken(token!);
            return true;
        },
        enabled: !!token,
        retry: false,
        refetchOnWindowFocus: false,
    });
};

export default useValidateResetToken;
