
import type { ReactNode } from "react";
import { AudienceContext } from "./AudienceContext";
import { TargetAudience } from "../types/TargetAudience";
import { UserType } from "../types/UserType";
import { useAuth } from "../hooks/useAuth";

export const AudienceProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();

    const audience =
        user?.userType === UserType.TEACHER
            ? TargetAudience.TEACHER
            : TargetAudience.STUDENT;

    return (
        <AudienceContext value={{ audience }}>
            {children}
        </AudienceContext>
    );
};
