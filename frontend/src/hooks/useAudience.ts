import { useContext } from "react";
import { AudienceContext } from "../contexts/AudienceContext";

// Egen hook som sidorna anropar för att läsa värdet.
// Då behöver ingen sida känna till hur contexten är uppbyggd.
export const useAudience = () => {
    // useContext hämtar värdet från närmaste Provider ovanför i trädet.
    const context = useContext(AudienceContext);

    // Om context är null används hooken utanför en Provider,
    // vilket är ett programmeringsfel. Vi kastar ett tydligt fel
    // så att det upptäcks direkt i stället för att ge konstiga buggar.
    if (!context) {
        throw new Error("useAudience måste användas inom AudienceProvider.");
    }

    // Returnerar { audience, setAudience }. Tack vare kontrollen ovan
    // vet TypeScript att det aldrig är null här.
    return context;
};
