import type { FormEvent, Dispatch, SetStateAction } from "react";
import { TargetAudience } from "../../types/TargetAudience";
import styles from "./CreateNews.module.css";

// Dispatch<SetStateAction<T>> är Reacts typ för en state-setter från useState.
// Den kan uppdatera state med ett nytt värde eller en funktion som utgår från föregående värde.
type NewsFormProps = {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    targetAudience: TargetAudience;
    setTargetAudience: Dispatch<SetStateAction<TargetAudience>>;
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
                    onChange={e => setTitle(e.target.value)}
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
                    onChange={e => setContent(e.target.value)}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="targetAudience">
                    Målgrupp:
                </label>
                <select
                    className={styles.select}
                    id="targetAudience"
                    name="targetAudience"
                    value={targetAudience}
                    onChange={e =>
                        setTargetAudience(e.target.value as TargetAudience)
                    }
                >
                    <option value={TargetAudience.STUDENT}>Student</option>
                    <option value={TargetAudience.TEACHER}>Lärare</option>
                    <option value={TargetAudience.ALL}>Alla</option>
                </select>
            </div>

            {/* Visar valideringsfel */}
            {validationError && <p role="alert">{validationError}</p>}

            {/* Visar fel om API-anropet misslyckas */}
            {mutation.isError && <p role="alert">{errorMessage}</p>}

            {mutation.isSuccess && <p role="status">{successMessage}</p>}

            <button
                className={styles.submitButton}
                type="submit"
                disabled={mutation.isPending}
            >
                {mutation.isPending ? pendingLabel : submitLabel}
            </button>

            <button
                className={styles.submitButton}
                type="submit"
                disabled={mutation.isPending}
            >
                {mutation.isPending ? pendingLabel : submitLabel}
            </button>
        </form>
    );
};

export default NewsForm;
