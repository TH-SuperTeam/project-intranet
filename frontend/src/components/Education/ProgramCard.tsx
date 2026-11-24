import { GraduationCap, Plus } from "lucide-react";
import type { Program } from "../../types/Program";
import type { SchoolClass } from "../../types/SchoolClass";
import SchoolClassRow from "./SchoolClassRow";
import EditButton from "../common/EditButton";
import CreateButton from "../common/CreateButton";
import styles from "./Education.module.css";

type ProgramCardProps = {
    program: Program;
    classes: SchoolClass[];
    onEdit: (program: Program) => void;
    onCreateClass: (programId: number) => void;
    onEditClass: (schoolClass: SchoolClass) => void;
};

const ProgramCard = ({
    program,
    classes,
    onEdit,
    onCreateClass,
    onEditClass,
}: ProgramCardProps) => {
    return (
        <article className={styles.programCard}>
            <div className={styles.programHeader}>
                <GraduationCap size={24} />

                <div className={styles.programInfo}>
                    <h3>{program.name}</h3>

                    <span className={styles.classCount}>
                        {classes.length}{" "}
                        {classes.length === 1 ? "klass" : "klasser"}
                    </span>
                </div>

                <span
                    className={
                        program.isActive
                            ? styles.activeStatus
                            : styles.archivedStatus
                    }
                >
                    {program.isActive ? "Aktiv" : "Arkiverad"}
                </span>

                <EditButton iconOnly onClick={() => onEdit(program)} />
            </div>

            <div className={styles.classList}>
                {classes.length === 0 ? (
                    <p className={styles.emptyClasses}>
                        Inga klasser att visa.
                    </p>
                ) : (
                    classes.map((schoolClass) => (
                        <SchoolClassRow
                            key={schoolClass.id}
                            schoolClass={schoolClass}
                            isProgramActive={program.isActive}
                            onEdit={onEditClass}
                        />
                    ))
                )}
            </div>

            {program.isActive && (
                <div className={styles.programActions}>
                    <CreateButton onClick={() => onCreateClass(program.id)}>
                        <Plus size={16} />
                        Lägg till klass
                    </CreateButton>
                </div>
            )}
        </article>
    );
};

export default ProgramCard;
