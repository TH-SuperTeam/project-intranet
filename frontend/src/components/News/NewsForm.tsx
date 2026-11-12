import type { FormEvent, Dispatch, SetStateAction } from "react";
import { TargetAudience } from "../../types/TargetAudience";
import styles from "./NewsForm.module.css";
import SubmitButton from "../common/SubmitButton";

// Dispatch<SetStateAction<T>> är Reacts typ för en state-setter från useState.
// Den kan uppdatera state med ett nytt värde eller en funktion som utgår från föregående värde.
type NewsFormProps = {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    targetAudience: TargetAudience[];
    setTargetAudience: Dispatch<SetStateAction<TargetAudience[]>>;
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

const NewsForm = ({
    title,
    setTitle,
    content,
    setContent,
    targetAudience,
    setTargetAudience,
    validationError,
    mutation,
    handleSubmit,
    submitLabel,
    pendingLabel,
    errorMessage,
    successMessage,
}: NewsFormProps) => {
    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="title">
                    Titel:
                </label>
                <input
                    className={styles.input}
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={255}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="content">
                    Innehåll:
                </label>
                <textarea
                    className={styles.textarea}
                    id="content"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>

            <fieldset className={styles.formGroup}>
                <legend className={styles.label}>Målgrupp:</legend>

                {[
                    { value: TargetAudience.STUDENT, label: "Studenter" },
                    { value: TargetAudience.TEACHER, label: "Lärare" },
                    {
                        value: TargetAudience.PUBLIC_DASHBOARD,
                        label: "Informationsskärmar",
                    },
                ].map(({ value, label }) => (
                    <label key={value} className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="targetAudience"
                            value={value}
                            checked={targetAudience.includes(value)}
                            onChange={(e) => {
                                setTargetAudience((prev) =>
                                    e.target.checked
                                        ? [...prev, value]
                                        : prev.filter(
                                              (audience) => audience !== value,
                                          ),
                                );
                            }}
                        />
                        {label}
                    </label>
                ))}

                {targetAudience.includes(TargetAudience.PUBLIC_DASHBOARD) && (
                    <p className={styles.publicInfo}>
                        Nyheter som visas på informationsskärmarna är offentligt
                        tillgängliga utan inloggning.
                    </p>
                )}
            </fieldset>

            {/* Visar valideringsfel */}
            {validationError && <p role="alert">{validationError}</p>}

            {/* Visar fel om API-anropet misslyckas */}
            {mutation.isError && <p role="alert">{errorMessage}</p>}

            {mutation.isSuccess && <p role="status">{successMessage}</p>}

            <SubmitButton
                isPending={mutation.isPending}
                submitLabel={submitLabel}
                pendingLabel={pendingLabel}
            />
        </form>
    );
};

export default NewsForm;
