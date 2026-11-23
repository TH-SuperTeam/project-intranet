import type { StatusFilter } from "./StatusFilter";

export interface UserFilters {
    school: "TH" | "VH" | null;
    programId: number | null;
    classId: number | null;
    status: StatusFilter;
}
