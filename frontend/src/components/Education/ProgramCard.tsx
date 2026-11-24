import { GraduationCap } from "lucide-react";
import type { Program } from "../../types/Program";
import type { SchoolClass } from "../../types/SchoolClass";
import SchoolClassRow from "./SchoolClassRow";
import styles from "./Education.module.css";

type ProgramCardProps = {
    program: Program;
    classes: SchoolClass[];
};

const ProgramCard = ({ program, classes }: ProgramCardProps) => {
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
                        />
                    ))
                )}
            </div>
        </article>
    );
};

export default ProgramCard;
