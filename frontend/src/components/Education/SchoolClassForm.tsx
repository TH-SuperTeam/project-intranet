import { useId, useState } from "react";
import type { FormEvent } from "react";
import type { Program } from "../../types/Program";
import type { SchoolClass } from "../../types/SchoolClass";
import type { SchoolClassRequest } from "../../types/SchoolClassRequest";
import SubmitButton from "../common/SubmitButton";
import styles from "./Education.module.css";

type SchoolClassFormProps = {
    schoolClass?: SchoolClass;
    defaultProgramId?: number;
    programs: Program[];
    isPending: boolean;
    errorMessage?: string;
    onSubmit: (request: SchoolClassRequest) => void;
    onCancel: () => void;
};

const SchoolClassForm = ({
    schoolClass,
    defaultProgramId,
    programs,
    isPending,
    errorMessage,
    onSubmit,
    onCancel,
}: SchoolClassFormProps) => {
    const nameId = useId();
    const programFieldId = useId();
    const startDateId = useId();
    const endDateId = useId();

    const [name, setName] = useState(schoolClass?.name ?? "");

    const [programId, setProgramId] = useState<number | null>(
        schoolClass?.programId ?? defaultProgramId ?? null,
    );

    const [startDate, setStartDate] = useState(schoolClass?.startDate ?? "");

    const [endDate, setEndDate] = useState(schoolClass?.endDate ?? "");

    const [validationError, setValidationError] = useState("");

    const isEditing = schoolClass !== undefined;

    const availablePrograms = programs.filter(
        (program) => program.isActive || program.id === schoolClass?.programId,
    );

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidationError("");

        if (!name.trim()) {
            setValidationError("Ange ett klassnamn.");
            return;
        }

        if (name.trim().length > 100) {
            setValidationError("Klassnamnet får vara max 100 tecken.");
            return;
        }

        if (programId === null) {
            setValidationError("Välj en utbildning.");
            return;
        }

        if (!startDate || !endDate) {
            setValidationError("Ange både startdatum och slutdatum.");
            return;
        }

        if (endDate < startDate) {
            setValidationError("Slutdatum får inte vara före startdatum.");
            return;
        }

        onSubmit({
            name: name.trim(),
            programId,
            startDate,
            endDate,
        });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <h2>{isEditing ? "Redigera klass" : "Skapa klass"}</h2>

            <div className={styles.formGroup}>
                <label htmlFor={nameId}>Klassnamn</label>

                <input
                    id={nameId}
                    className={styles.input}
                    type="text"
                    value={name}
                    maxLength={100}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isPending}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor={programFieldId}>Utbildning</label>

                <select
                    id={programFieldId}
                    className={styles.select}
                    value={programId ?? ""}
                    onChange={(e) =>
                        setProgramId(
                            e.target.value ? Number(e.target.value) : null,
                        )
                    }
                    disabled={isPending}
                    required
                >
                    <option value="" disabled>
                        Välj utbildning
                    </option>

                    {availablePrograms.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program.name} ({program.school})
                            {!program.isActive && " – Arkiverad"}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor={startDateId}>Startdatum</label>

                <input
                    id={startDateId}
                    className={styles.input}
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    disabled={isPending}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor={endDateId}>Slutdatum</label>

                <input
                    id={endDateId}
                    className={styles.input}
                    type="date"
                    value={endDate}
                    min={startDate || undefined}
                    onChange={(e) => setEndDate(e.target.value)}
                    disabled={isPending}
                    required
                />
            </div>

            {(validationError || errorMessage) && (
                <p className={styles.formError} role="alert">
                    {validationError || errorMessage}
                </p>
            )}

            <div className={styles.formActions}>
                <button
                    className={styles.cancelButton}
                    type="button"
                    onClick={onCancel}
                    disabled={isPending}
                >
                    Avbryt
                </button>

                <SubmitButton
                    isPending={isPending}
                    submitLabel={isEditing ? "Spara ändringar" : "Skapa klass"}
                    pendingLabel={isEditing ? "Sparar..." : "Skapar..."}
                />
            </div>
        </form>
    );
};

export default SchoolClassForm;
