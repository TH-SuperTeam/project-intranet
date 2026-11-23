import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ThemeManager() {
    const { user, isLoading } = useAuth();
    const { pathname } = useLocation();

    useEffect(() => {
        const isPublicPage = pathname === "/login" || pathname === "/public";

        const theme =
            isPublicPage || isLoading || !user
                ? "default"
                : user.school === "TH" || user.school === "VH"
                  ? user.school
                  : "default";

        document.documentElement.dataset.theme = theme;
    }, [pathname, user, isLoading]);

    return null;
}
