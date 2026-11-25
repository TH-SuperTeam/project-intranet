import type { SchoolName } from "./SchoolName";

export interface Program {
    id: number;
    name: string;
    schoolId: number;
    school: SchoolName;
    isActive: boolean;
}
