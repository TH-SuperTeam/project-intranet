import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);

    const handleLogout = async () => {
        setIsPending(true);

        try {
            await logout();
        } catch (error) {
            console.error("Logout request failed:", error);
        } finally {
            navigate("/login", { replace: true });
        }
    };

    return (
        <button
            type="button"
            onClick={handleLogout}
            disabled={isPending}
            className="flex items-center gap-3 rounded-lg bg-(--color-secondary-light) px-4 py-2 text-sm font-semibold text-(--color-secondary-dark) transition-colors duration-200 hover:bg-(--color-secondary) hover:text-(--color-text-white) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-secondary-dark) disabled:cursor-not-allowed disabled:opacity-50"
        >
            <LogOut />
            {isPending ? "Loggar ut..." : "Logga ut"}
        </button>
    );
};

export default LogoutButton;
