import { useState } from "react";
import type { Program } from "../../types/Program";
import type { SchoolName } from "../../types/SchoolName";
import type { Status } from "../../types/Status";
import type { UserType } from "../../types/UserType";

const useUserFilters = (programs: Program[] | undefined) => {
    // Valda filter. null = standardalternativet (Alla skolor, Alla program osv.)
    const [school, setSchool] = useState<SchoolName | null>(null);
    const [programId, setProgramId] = useState<number | null>(null);
    const [classId, setClassId] = useState<number | null>(null);
    const [status, setStatus] = useState<Status | null>(null);
    const [userType, setUserType] = useState<UserType | null>(null);

    const changeSchool = (newSchool: SchoolName | null) => {
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
        setStatus(null);
        setUserType(null);
    };

    return {
        school,
        programId,
        classId,
        status,
        userType,
        changeSchool,
        changeProgram,
        changeClass: setClassId,
        changeStatus: setStatus,
        changeUserType: setUserType,
        reset,
    };
};

export { useUserFilters };
