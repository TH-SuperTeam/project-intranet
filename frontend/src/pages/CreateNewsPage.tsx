import { useState } from "react";
import type { FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publishNews } from "../services/newsApi";
import { TargetAudience } from "../types/TargetAudience";
import BackLink from "../components/common/BackLink";
import styles from "../components/CreateNews/CreateNews.module.css";
import NewsForm from "../components/CreateNews/NewsForm";

const CreateNewsPage = () => {
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

            <NewsForm
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                targetAudience={targetAudience}
                setTargetAudience={setTargetAudience}
                validationError={validationError}
                mutation={mutation}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default CreateNewsPage;
