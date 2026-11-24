import { Users } from "lucide-react";
import type { SchoolClass } from "../../types/SchoolClass";
import styles from "./Education.module.css";

type SchoolClassRowProps = {
    schoolClass: SchoolClass;
    isProgramActive: boolean;
};

const SchoolClassRow = ({
    schoolClass,
    isProgramActive,
}: SchoolClassRowProps) => {
    const isAvailable = schoolClass.isActive && isProgramActive;

    return (
        <div className={styles.classRow}>
            <Users size={18} />

            <div className={styles.classInfo}>
                <span className={styles.className}>{schoolClass.name}</span>

                <span className={styles.classDates}>
                    {schoolClass.startDate ?? "Ej angivet"}
                    {" – "}
                    {schoolClass.endDate ?? "Ej angivet"}
                </span>
            </div>

            <span
                className={
                    isAvailable ? styles.activeStatus : styles.archivedStatus
                }
            >
                {!schoolClass.isActive
                    ? "Arkiverad"
                    : !isProgramActive
                      ? "Ej valbar"
                      : "Aktiv"}
            </span>
        </div>
    );
};

export default SchoolClassRow;
