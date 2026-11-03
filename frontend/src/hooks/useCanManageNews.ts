import { useAudience } from "./useAudience";

const useCanManageNews = () => {
    const { role } = useAudience();

    return role === "ADMIN";
};

export { useCanManageNews };
