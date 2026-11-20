import FilterSelect from "../common/FilterSelect";
import { useClasses } from "../../hooks/useClasses";
import type { Program } from "../../types/Program";
import type { UserFilters } from "../../types/UserFilters";
import type { StatusFilter } from "../../types/StatusFilter";
import styles from "./UsersFilterBar.module.css";

type School = "TH" | "VH";

interface UsersFilterBarProps {
    filters: UserFilters;
    programs: Program[] | undefined;
    isAdmin: boolean;
    onSchoolChange: (school: School | null) => void;
    onProgramChange: (programId: number | null) => void;
    onClassChange: (classId: number | null) => void;
    onStatusChange: (status: StatusFilter) => void;
}

// Fasta alternativ. Ligger utanför komponenten så de inte skapas om vid varje render.
// value = det som lagras, label = det användaren ser.
const schoolOptions = [
    { value: "TH", label: "Teknikhögskolan" },
    { value: "VH", label: "Vårdyrkeshögskolan" },
];

// "Alla" saknas här eftersom det är standardalternativet (defaultLabel) i FilterSelect
const statusOptions = [
    { value: "ACTIVE", label: "Aktiva" },
    { value: "INACTIVE", label: "Inaktiva" },
];

const UsersFilterBar = ({
    filters,
    programs,
    isAdmin,
    onSchoolChange,
    onProgramChange,
    onClassChange,
    onStatusChange,
}: UsersFilterBarProps) => {
    // Hämtar klasser för valt program. Körs inte när programId är null (enabled i hooken).
    const { data: classes } = useClasses(filters.programId);

    // Programalternativ: bara program som tillhör vald skola (alla om ingen skola vald),
    // omvandlade till { value, label } som FilterSelect förstår.
    const programOptions = (programs ?? [])
        .filter(
            program =>
                filters.school === null || program.school === filters.school,
        )
        .map(program => ({ value: String(program.id), label: program.name }));

    // Samma omvandling för klasser.
    const classOptions = (classes ?? []).map(c => ({
        value: String(c.id),
        label: c.name,
    }));

    return (
        <div className={styles.filterBar}>
            {/* Skola: null visas som "Alla skolor" (""), och "" blir null igen vid val */}
            <FilterSelect
                label="Skola"
                value={filters.school ?? ""}
                options={schoolOptions}
                defaultLabel="Alla skolor"
                onChange={value =>
                    onSchoolChange(value === "" ? null : (value as School))
                }
            />

            {/* Program: null visas som "Alla program" (""), och id:t görs om mellan tal och sträng */}
            <FilterSelect
                label="Program"
                value={
                    filters.programId === null ? "" : String(filters.programId)
                }
                options={programOptions}
                defaultLabel="Alla program"
                onChange={value =>
                    onProgramChange(value === "" ? null : Number(value))
                }
            />

            {/* Klass: samma omvandling, avstängd tills ett program är valt */}
            <FilterSelect
                label="Klass"
                value={filters.classId === null ? "" : String(filters.classId)}
                options={classOptions}
                defaultLabel="Alla klasser"
                onChange={value =>
                    onClassChange(value === "" ? null : Number(value))
                }
                disabled={filters.programId === null}
            />

            {/* Status visas bara för admin. "ALL" visas som standardalternativet (""). */}
            {isAdmin && (
                <FilterSelect
                    label="Status"
                    value={filters.status === "ALL" ? "" : filters.status}
                    options={statusOptions}
                    defaultLabel="Alla"
                    onChange={value =>
                        onStatusChange(
                            value === "" ? "ALL" : (value as StatusFilter),
                        )
                    }
                />
            )}
        </div>
    );
};

export default UsersFilterBar;
