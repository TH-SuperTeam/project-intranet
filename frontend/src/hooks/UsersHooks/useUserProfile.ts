import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/usersApi";

const useUserProfile = (userId: number) => {
    return useQuery({
        queryKey: ["userProfile", userId],
        queryFn: () => getUserProfile(userId),
        enabled: Number.isFinite(userId) && userId > 0,
    });
};

export { useUserProfile };