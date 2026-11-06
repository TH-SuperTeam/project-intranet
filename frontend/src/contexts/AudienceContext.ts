
import { createContext } from "react";
import type { TargetAudience } from "../types/TargetAudience";

export type AudienceContextValue = {
    audience: TargetAudience;
};

export const AudienceContext = createContext<AudienceContextValue | null>(null);
