import { Users } from "lucide-react";
import type { SchoolClass } from "../../types/SchoolClass";
import EditButton from "../common/EditButton";
import styles from "./Education.module.css";

type SchoolClassRowProps = {
    schoolClass: SchoolClass;
    isProgramActive: boolean;
    onEdit: (schoolClass: SchoolClass) => void;
};

const SchoolClassRow = ({
    schoolClass,
    isProgramActive,
    onEdit,
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
            <EditButton iconOnly onClick={() => onEdit(schoolClass)} />
        </div>
    );
};

export default SchoolClassRow;
