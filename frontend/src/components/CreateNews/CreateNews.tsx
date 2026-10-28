import { useState } from "react";
import type { FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publishNews } from "../../services/newsApi";
import { TargetAudience } from "../../types/TargetAudience";
import styles from "./CreateNews.module.css";
import BackLink from "../common/BackLink";

const CreateNews = () => {
    // State för formulärets värden
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [targetAudience, setTargetAudience] = useState<TargetAudience>(
        TargetAudience.ALL,
    );
    const [validationError, setValidationError] = useState("");

    const queryClient = useQueryClient();

    // Hanterar publicering av nyheter via TanStack Query. Fungerar som useQuery men för POST/PUT/DELETE-anrop. mutationFn är den funktion som körs när användaren klickar på Publicera.
    const mutation = useMutation({
        mutationFn: publishNews,

        onSuccess: () => {
            // Markerar nyhetslistan som inaktuell så att den hämtas om.
            queryClient.invalidateQueries({ queryKey: ["news"] });

            // Återställer formuläret
            setTitle("");
            setContent("");
            setTargetAudience(TargetAudience.ALL);
            setValidationError("");
        },
    });

    // Körs när användaren klickar på Publicera. Den här funktionen tar emot en händelse från ett formulär.
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        //Vi vill preventa att formuläre utför sitt vanliga standardbeteende. Vi hanterar det själv med JavaScript
        e.preventDefault();

        setValidationError("");

        // Kontrollerar att obligatoriska fält är ifyllda
        if (!title.trim() || !content.trim()) {
            setValidationError("Titel och innehåll måste fyllas i.");
            return;
        }

        if (title.trim().length > 255) {
            setValidationError("Titeln får innehålla max 255 tecken.");
            return;
        }

        // Skickar nyheten till backend via POST /api/news
        mutation.mutate({
            title: title.trim(),
            content: content.trim(),
            targetAudience,
        });
    };

    return (
        <div className={styles.container}>
            <BackLink to="/news" />
            <h1 className={styles.title}>Skapa en nyhet</h1>

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

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="targetAudience">
                        Målgrupp:
                    </label>
                    <select
                        className={styles.select}
                        id="targetAudience"
                        name="targetAudience"
                        value={targetAudience}
                        onChange={(e) =>
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
        </div>
    );
};

export default CreateNews;
