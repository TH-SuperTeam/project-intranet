
import { useAuth } from "../useAuth";
import { AccessRole } from "../../types/AccessRole";

const useCanManageNews = () => {
    const { user } = useAuth();

    return user?.accessRole === AccessRole.ADMIN;
};

export { useCanManageNews };
