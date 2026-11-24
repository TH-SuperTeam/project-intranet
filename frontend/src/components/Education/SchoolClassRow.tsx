import { Users } from "lucide-react";
import type { SchoolClass } from "../../types/SchoolClass";
import EditButton from "../common/EditButton";
import ArchiveButton from "../common/ArchiveButton";
import DeleteButton from "../common/DeleteButton";
import styles from "./Education.module.css";

type SchoolClassRowProps = {
    schoolClass: SchoolClass;
    isProgramActive: boolean;
    onEdit: (schoolClass: SchoolClass) => void;
    onToggleArchive: (schoolClass: SchoolClass) => void;
    onDelete: (schoolClass: SchoolClass) => void;
};

const SchoolClassRow = ({
    schoolClass,
    isProgramActive,
    onEdit,
    onToggleArchive,
    onDelete,
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
            <div className={styles.rowActions}>
                <EditButton iconOnly onClick={() => onEdit(schoolClass)} />

                <ArchiveButton
                    isActive={schoolClass.isActive}
                    onClick={() => onToggleArchive(schoolClass)}
                />

                {!schoolClass.isActive && (
                    <DeleteButton
                        iconOnly
                        onClick={() => onDelete(schoolClass)}
                    />
                )}
            </div>
        </div>
    );
};

export default SchoolClassRow;
