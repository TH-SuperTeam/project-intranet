import { createContext } from "react";
import type { TargetAudience } from "../types/TargetAudience";

// Beskriver vad som ligger i "lådan" som delas mellan sidorna:
// det valda värdet och en funktion för att ändra det.
export type AudienceContextValue = {
    audience: TargetAudience;
    setAudience: (audience: TargetAudience) => void;
};

// createContext skapar själva lådan. Den är tom (null) från början.
// Providern (nästa fil) fyller den med ett riktigt värde.
// Typen "| null" behövs eftersom lådan kan vara tom om någon
// råkar använda den utanför en Provider.
export const AudienceContext = createContext<AudienceContextValue | null>(null);
