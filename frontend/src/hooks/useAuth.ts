
import { use } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
    const context = use(AuthContext);

    if (!context) {
        throw new Error("useAuth måste användas inom AuthProvider");
    }

    return context;
};
