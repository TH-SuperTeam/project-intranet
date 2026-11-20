import { useState } from "react";
import type { Program } from "../../types/Program";
import type { StatusFilter } from "../../types/StatusFilter";

type School = "TH" | "VH";

const useUserFilters = (programs: Program[] | undefined) => {
    // Valda filter. null = standardalternativet (Alla skolor, Alla program osv.)
    const [school, setSchool] = useState<School | null>(null);
    const [programId, setProgramId] = useState<number | null>(null);
    const [classId, setClassId] = useState<number | null>(null);
    const [status, setStatus] = useState<StatusFilter>("ALL");

    const changeSchool = (newSchool: School | null) => {
        setSchool(newSchool);

        // Hitta det program som är valt just nu
        const selectedProgram = programs?.find(p => p.id === programId);

        // Programmet är giltigt om "Alla skolor" valts
        // eller om det tillhör den nya skolan
        const programStillValid =
            newSchool === null || selectedProgram?.school === newSchool;

        // Annars nollställs program och klass
        if (!programStillValid) {
            setProgramId(null);
            setClassId(null);
        }
    };

    const changeProgram = (newProgramId: number | null) => {
        setProgramId(newProgramId);
        // En klass hör till ett enda program, så den nollställs alltid
        setClassId(null);
    };

    const reset = () => {
        setSchool(null);
        setProgramId(null);
        setClassId(null);
        setStatus("ALL");
    };

    return {
        school,
        programId,
        classId,
        status,
        changeSchool,
        changeProgram,
        changeClass: setClassId,
        changeStatus: setStatus,
        reset,
    };
};

export { useUserFilters };
