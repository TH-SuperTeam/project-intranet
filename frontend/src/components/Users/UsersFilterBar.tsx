import FilterSelect from "../common/FilterSelect";
import { useClasses } from "../../hooks/useClasses";
import type { Program } from "../../types/Program";
import type { UserFilters } from "../../types/UserFilters";
import styles from "./UsersFilterBar.module.css";
import type { SchoolName } from "../../types/SchoolName";
import { Status, statusLabels } from "../../types/Status";
import { UserType } from "../../types/UserType";

interface UsersFilterBarProps {
    filters: UserFilters;
    programs: Program[] | undefined;
    isAdmin: boolean;
    onSchoolChange: (school: SchoolName | null) => void;
    onProgramChange: (programId: number | null) => void;
    onClassChange: (classId: number | null) => void;
    onStatusChange: (status: Status | null) => void;
    onUserTypeChange: (userType: UserType | null) => void;
}

// Fasta alternativ. Ligger utanför komponenten så de inte skapas om vid varje render.
// value = det som lagras, label = det användaren ser.
const schoolOptions = [
    { value: "TH", label: "Teknikhögskolan" },
    { value: "VH", label: "Vårdyrkeshögskolan" },
];

const statusOptions = Object.values(Status).map(status => ({
    value: status,
    label: statusLabels[status],
}));

const userTypeOptions: { value: UserType | null; label: string }[] = [
    { value: null, label: "Alla" },
    { value: UserType.STUDENT, label: "Studenter" },
    { value: UserType.TEACHER, label: "Lärare" },
];

const UsersFilterBar = ({
    filters,
    programs,
    isAdmin,
    onSchoolChange,
    onProgramChange,
    onClassChange,
    onStatusChange,
    onUserTypeChange,
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
                    onSchoolChange(value === "" ? null : (value as SchoolName))
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

            <div
                role="group"
                aria-label="Användartyp"
                className={styles.userTypeGroup}
            >
                {userTypeOptions.map(option => (
                    <button
                        key={option.value ?? "ALL"}
                        type="button"
                        aria-pressed={filters.userType === option.value}
                        onClick={() => onUserTypeChange(option.value)}
                        className={styles.userTypeButton}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            {/* Status visas bara för admin. null visas som standardalternativet (""). */}
            {isAdmin && (
                <FilterSelect
                    label="Status"
                    value={filters.status === null ? "" : filters.status}
                    options={statusOptions}
                    defaultLabel="Alla"
                    onChange={value =>
                        onStatusChange(value === "" ? null : (value as Status))
                    }
                />
            )}
        </div>
    );
};

export default UsersFilterBar;
