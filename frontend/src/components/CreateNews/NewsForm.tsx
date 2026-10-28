import type { FormEvent, Dispatch, SetStateAction } from "react";
import type { UseMutationResult } from "@tanstack/react-query";
import { TargetAudience } from "../../types/TargetAudience";
import type { CreateNewsRequest } from "../../types/CreateNewsRequest";
import type { News } from "../../types/News";
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
    mutation: UseMutationResult<News, Error, CreateNewsRequest>;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
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
            {mutation.isError && (
                <p role="alert">Något gick fel vid publiceringen.</p>
            )}

            {/* Visar bekräftelse när nyheten publicerats */}
            {mutation.isSuccess && (
                <p role="status">Nyheten har publicerats!</p>
            )}

            <button
                className={styles.submitButton}
                type="submit"
                disabled={mutation.isPending}
            >
                {mutation.isPending ? "Publicerar..." : "Publicera"}
            </button>
        </form>
    );
};

export default NewsForm;
