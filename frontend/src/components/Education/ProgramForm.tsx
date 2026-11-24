import { useId, useState } from "react";
import type { FormEvent } from "react";
import type { Program } from "../../types/Program";
import type { ProgramRequest } from "../../types/ProgramRequest";
import SubmitButton from "../common/SubmitButton";
import styles from "./Education.module.css";

type SchoolOption = {
    id: number;
    name: string;
};

type ProgramFormProps = {
    program?: Program;
    schools: SchoolOption[];
    isPending: boolean;
    errorMessage?: string;
    onSubmit: (request: ProgramRequest) => void;
    onCancel: () => void;
};

const ProgramForm = ({
    program,
    schools,
    isPending,
    errorMessage,
    onSubmit,
    onCancel,
}: ProgramFormProps) => {
    const nameId = useId();
    const schoolFieldId = useId();

    const [name, setName] = useState(program?.name ?? "");
    const [schoolId, setSchoolId] = useState<number | null>(
        program?.schoolId ?? null,
    );
    const [validationError, setValidationError] = useState("");

    const isEditing = program !== undefined;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidationError("");

        if (!name.trim()) {
            setValidationError("Ange ett utbildningsnamn.");
            return;
        }

        if (name.trim().length > 100) {
            setValidationError("Utbildningsnamnet får vara max 100 tecken.");
            return;
        }

        if (schoolId === null) {
            setValidationError("Välj en skola.");
            return;
        }

        onSubmit({
            name: name.trim(),
            schoolId,
        });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <h2>{isEditing ? "Redigera utbildning" : "Skapa utbildning"}</h2>

            <div className={styles.formGroup}>
                <label htmlFor={nameId}>Utbildningsnamn</label>

                <input
                    id={nameId}
                    className={styles.input}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    disabled={isPending}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor={schoolFieldId}>Skola</label>

                <select
                    id={schoolFieldId}
                    className={styles.select}
                    value={schoolId ?? ""}
                    onChange={(e) =>
                        setSchoolId(
                            e.target.value ? Number(e.target.value) : null,
                        )
                    }
                    disabled={isEditing || isPending}
                    required
                >
                    <option value="" disabled>
                        Välj skola
                    </option>

                    {schools.map((school) => (
                        <option key={school.id} value={school.id}>
                            {school.name === "TH"
                                ? "Teknikhögskolan"
                                : school.name === "VH"
                                  ? "Vårdyrkeshögskolan"
                                  : school.name}
                        </option>
                    ))}
                </select>

                {isEditing && (
                    <span className={styles.fieldHint}>
                        Skoltillhörighet kan inte ändras.
                    </span>
                )}
            </div>

            {(validationError || errorMessage) && (
                <p className={styles.formError} role="alert">
                    {validationError || errorMessage}
                </p>
            )}

            <div className={styles.formActions}>
                <button type="button" onClick={onCancel} disabled={isPending}>
                    Avbryt
                </button>

                <SubmitButton
                    isPending={isPending}
                    submitLabel={
                        isEditing ? "Spara ändringar" : "Skapa utbildning"
                    }
                    pendingLabel={isEditing ? "Sparar..." : "Skapar..."}
                />
            </div>
        </form>
    );
};

export default ProgramForm;
