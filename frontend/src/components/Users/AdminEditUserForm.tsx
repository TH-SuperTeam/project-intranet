import { useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UserProfile } from "../../types/UserProfile";
import { UserType } from "../../types/UserType";
import { getPrograms, getClassesByProgramId } from "../../services/programApi";
import useUpdateUserByAdmin from "../../hooks/UsersHooks/useUpdateUserByAdmin";
import SubmitButton from "../common/SubmitButton";
import styles from "./Users.module.css";

type AdminEditUserFormProps = {
    profile: UserProfile;
    onCancel: () => void;
    onSuccess: () => void;
};

const AdminEditUserForm = ({
    profile,
    onCancel,
    onSuccess,
}: AdminEditUserFormProps) => {
    const [firstName, setFirstName] = useState(profile.firstName);
    const [lastName, setLastName] = useState(profile.lastName);
    const [email, setEmail] = useState(profile.email);
    const [password, setPassword] = useState("");
    const [programId, setProgramId] = useState<number | null>(
        profile.programId,
    );
    const [classId, setClassId] = useState<number | null>(profile.classId);
    const [validationError, setValidationError] = useState("");

    const isStudent = profile.userType === UserType.STUDENT;
    const mutation = useUpdateUserByAdmin();

    const programsQuery = useQuery({
        queryKey: ["programs"],
        queryFn: getPrograms,
    });

    const classesQuery = useQuery({
        queryKey: ["classes", programId],
        queryFn: () => getClassesByProgramId(programId!),
        enabled: isStudent && programId !== null,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidationError("");

        if (!firstName.trim() || !lastName.trim() || !email.trim()) {
            setValidationError("Fyll i alla obligatoriska fält.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setValidationError("Ange en giltig e-postadress.");
            return;
        }

        if (password.length > 0 && password.length < 12) {
            setValidationError("Lösenordet måste vara minst 12 tecken.");
            return;
        }

        if (programId === null) {
            setValidationError("Välj en utbildning.");
            return;
        }

        if (isStudent && classId === null) {
            setValidationError("Välj en klass.");
            return;
        }

        mutation.mutate(
            {
                userId: profile.id,
                user: {
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    email: email.trim(),
                    password,
                    programId,
                    classId: isStudent ? classId : null,
                },
            },
            { onSuccess },
        );
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="adminFirstName">
                    Förnamn
                </label>
                <input
                    className={styles.input}
                    id="adminFirstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    maxLength={100}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="adminLastName">
                    Efternamn
                </label>
                <input
                    className={styles.input}
                    id="adminLastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    maxLength={100}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="adminEmail">
                    E-postadress
                </label>
                <input
                    className={styles.input}
                    id="adminEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="adminPassword">
                    Nytt lösenord (valfritt)
                </label>
                <input
                    className={styles.input}
                    id="adminPassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    maxLength={255}
                />
                <p>Lämna tomt för att behålla befintligt lösenord.</p>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Användartyp</label>
                <p>{isStudent ? "Student" : "Personal"}</p>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="adminProgram">
                    Utbildning
                </label>
                <select
                    className={styles.select}
                    id="adminProgram"
                    value={programId ?? ""}
                    disabled={programsQuery.isPending || programsQuery.isError}
                    onChange={(e) => {
                        setProgramId(
                            e.target.value ? Number(e.target.value) : null,
                        );
                        setClassId(null);
                    }}
                    required
                >
                    <option value="">Välj utbildning</option>
                    {programsQuery.data?.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program.name}
                        </option>
                    ))}
                </select>
                {programsQuery.isError && (
                    <p role="alert">Kunde inte hämta utbildningar.</p>
                )}
            </div>

            {isStudent && (
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="adminClass">
                        Klass
                    </label>
                    <select
                        className={styles.select}
                        id="adminClass"
                        value={classId ?? ""}
                        disabled={
                            programId === null ||
                            classesQuery.isPending ||
                            classesQuery.isError
                        }
                        onChange={(e) =>
                            setClassId(
                                e.target.value ? Number(e.target.value) : null,
                            )
                        }
                        required
                    >
                        <option value="">Välj klass</option>
                        {classesQuery.data?.map((schoolClass) => (
                            <option key={schoolClass.id} value={schoolClass.id}>
                                {schoolClass.name}
                            </option>
                        ))}
                    </select>
                    {classesQuery.isError && (
                        <p role="alert">Kunde inte hämta klasser.</p>
                    )}
                </div>
            )}

            {(validationError || mutation.isError) && (
                <p role="alert" className="text-(--color-error)">
                    {validationError || mutation.error?.message}
                </p>
            )}

            <div className="flex flex-wrap items-center justify-end gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={mutation.isPending}
                    className="rounded-lg border border-(--color-border) px-4 py-2"
                >
                    Avbryt
                </button>

                <SubmitButton
                    isPending={mutation.isPending}
                    isDisabled={
                        programsQuery.isPending ||
                        programsQuery.isError ||
                        (isStudent &&
                            (classesQuery.isPending || classesQuery.isError))
                    }
                    submitLabel="Spara ändringar"
                    pendingLabel="Sparar..."
                />
            </div>
        </form>
    );
};

export default AdminEditUserForm;
