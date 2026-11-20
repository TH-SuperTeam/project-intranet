import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import THStacked from "../../assets/logo-th-stacked.svg?react";
import THHorizontal from "../../assets/logo-th-horizontal.svg?react";
import VHStacked from "../../assets/logo-vh-stacked.svg?react";
import VHHorizontal from "../../assets/logo-vh-horizontal.svg?react";

type LogoProps = {
    variant?: "stacked" | "horizontal";
    className?: string;
};

export default function Logo({ variant = "stacked", className }: LogoProps) {
    const { user } = useAuth();
    const { pathname } = useLocation();

    const isPublicPage = pathname === "/login" || pathname === "/public";

    const school = isPublicPage ? null : user?.school;

    const THLogo = variant === "horizontal" ? THHorizontal : THStacked;
    const VHLogo = variant === "horizontal" ? VHHorizontal : VHStacked;

    if (school === "TH") {
        return (
            <THLogo
                className={className}
                role="img"
                aria-label="Teknikhögskolan"
            />
        );
    }

    if (school === "VH") {
        return (
            <VHLogo
                className={className}
                role="img"
                aria-label="Vårdyrkeshögskolan"
            />
        );
    }

    return (
        <div className={`flex items-center gap-6 ${className ?? ""}`}>
            <THLogo
                className="h-10 min-[1600px]:h-14 w-auto"
                role="img"
                aria-label="Teknikhögskolan"
            />
            <VHLogo
                className="h-10 min-[1600px]:h-14 w-auto"
                role="img"
                aria-label="Vårdyrkeshögskolan"
            />
        </div>
    );
}
