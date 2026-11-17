import type { Program } from "../../types/Program";
import type { SchoolClass } from "../../types/SchoolClass";
import type { FormEvent, Dispatch, SetStateAction } from "react";
import SubmitButton from "../common/SubmitButton";
import styles from "./Users.module.css";
import { UserType } from "../../types/UserType";
import { AccessRole } from "../../types/AccessRole";

// Dispatch<SetStateAction<T>> är Reacts typ för en state-setter från useState.
// Den kan uppdatera state med ett nytt värde eller en funktion som utgår från föregående värde.
type UsersFormProps = {
    firstName: string;
    setFirstName: Dispatch<SetStateAction<string>>;
    lastName: string;
    setLastName: Dispatch<SetStateAction<string>>;
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    userType: UserType;
    setUserType: Dispatch<SetStateAction<UserType>>;
    accessRole: AccessRole;
    setAccessRole: Dispatch<SetStateAction<AccessRole>>;
    programId: number | null;
    setProgramId: Dispatch<SetStateAction<number | null>>;
    classId: number | null;
    setClassId: Dispatch<SetStateAction<number | null>>;
    programs: Program[];
    programsLoading: boolean;
    programsError: boolean;

    classes: SchoolClass[];
    classesLoading: boolean;
    classesError: boolean;
    validationError: string;
    mutation: {
        isPending: boolean;
        isError: boolean;
        isSuccess: boolean;
    };
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    submitLabel: string;
    pendingLabel: string;
    errorMessage: string;
    successMessage: string;
};

const UsersForm = ({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    userType,
    setUserType,
    accessRole,
    setAccessRole,
    programId,
    setProgramId,
    classId,
    setClassId,
    validationError,
    mutation,
    handleSubmit,
    submitLabel,
    pendingLabel,
    errorMessage,
    successMessage,
    programs,
    programsLoading,
    programsError,
    classes,
    classesLoading,
    classesError,
}: UsersFormProps) => {
    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="firstName">
                    Förnamn:
                </label>
                <input
                    className={styles.input}
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    maxLength={100}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="lastName">
                    Efternamn:
                </label>
                <input
                    className={styles.input}
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    maxLength={100}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="email">
                    Email:
                </label>
                <input
                    className={styles.input}
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="password">
                    Lösenord:
                </label>
                <input
                    className={styles.input}
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    maxLength={255}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="userType">
                    Användartyp:
                </label>
               <select
                    className={styles.select}
                    id="userType"
                    name="userType"
                    value={userType}
                    onChange={(e) => {
                        const newUserType = e.target.value as UserType;
                        setUserType(newUserType);

                        if (newUserType === UserType.TEACHER) {
                            setClassId(null);
                        }
                    }}
                >
                    <option value={UserType.STUDENT}>Student</option>
                    <option value={UserType.TEACHER}>Personal</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="program">
                    Utbildning:
                </label>

                <select
                    className={styles.select}
                    id="program"
                    name="program"
                    value={programId ?? ""}
                    onChange={(e) => {
                        setProgramId(
                            e.target.value ? Number(e.target.value) : null
                        );
                        setClassId(null);
                    }}
                    disabled={programsLoading || programsError}
                    required
                >

                    <option value="" disabled hidden>
                        {programsLoading
                            ? "Hämtar utbildningar..."
                            : "Välj utbildning"}
                    </option>

                    {programs.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program.name}
                        </option>
                    ))}
                </select>

                {programsError && (
                    <p role="alert">Kunde inte hämta utbildningar.</p>
                )}
            </div>

           {userType === UserType.STUDENT && (
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="schoolClass">
                        Klass:
                    </label>

                    <select
                        className={styles.select}
                        id="schoolClass"
                        name="schoolClass"
                        value={classId ?? ""}
                        onChange={(e) =>
                            setClassId(
                                e.target.value ? Number(e.target.value) : null
                            )
                        }
                        disabled={
                            programId === null ||
                            classesLoading ||
                            classesError
                        }
                        required
                    >
                        <option value="" disabled hidden>
                            {programId === null
                                ? "Välj utbildning först"
                                : classesLoading
                                ? "Hämtar klasser..."
                                : "Välj klass"}
                        </option>

                        {classes.map((schoolClass) => (
                            <option key={schoolClass.id} value={schoolClass.id}>
                                {schoolClass.name}
                            </option>
                        ))}
                    </select>

                    {classesError && (
                        <p role="alert">Kunde inte hämta klasser.</p>
                    )}

                    {!classesLoading &&
                        !classesError &&
                        programId !== null &&
                        classes.length === 0 && (
                            <p>Det finns inga klasser för denna utbildning.</p>
                        )}
                </div>
            )}

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="accessRole">
                    Behörighet:
                </label>
                <select
                    className={styles.select}
                    id="accessRole"
                    name="accessRole"
                    value={accessRole}
                    onChange={(e) =>
                        setAccessRole(e.target.value as AccessRole)
                    }
                >
                    <option value={AccessRole.USER}>Användare</option>
                    <option value={AccessRole.ADMIN}>Admin</option>
                </select>
            </div>

            {validationError ? (
                <p role="alert">{validationError}</p>
            ) : (
                mutation.isError && <p role="alert">{errorMessage}</p>
            )}

            {mutation.isSuccess && <p role="status">{successMessage}</p>}

            <SubmitButton
                isPending={mutation.isPending}
                submitLabel={submitLabel}
                pendingLabel={pendingLabel}
            />
        </form>
    );
};

export default UsersForm;
