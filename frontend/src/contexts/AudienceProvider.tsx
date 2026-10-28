import { useState, type ReactNode } from "react";
import { TargetAudience } from "../types/TargetAudience";
import { AudienceContext } from "./AudienceContext";

// Providern är en vanlig komponent som "äger" värdet.
// "children" är allt som ligger inuti den, i vårt fall hela appen (Routes).
export const AudienceProvider = ({ children }: { children: ReactNode }) => {
    // Här bor det faktiska värdet. Det är vanlig useState,
    // men nu kan alla komponenter inuti Providern läsa det.
    const [audience, setAudience] = useState<TargetAudience>(
        TargetAudience.STUDENT,
    );

    // value är det som delas ut. Alla som läser contexten får detta objekt.
    // Ändras audience renderas alla som läser det om automatiskt.
    return (
        <AudienceContext value={{ audience, setAudience }}>
            {children}
        </AudienceContext>
    );
};
