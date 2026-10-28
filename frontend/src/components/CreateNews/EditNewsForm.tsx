import { useState, type FormEvent } from "react";
import type { News } from "../../types/News";
import type { TargetAudience } from "../../types/TargetAudience";
import { useUpdateNews } from "../../hooks/useUpdateNews";
import NewsForm from "./NewsForm";

const EditNewsForm = ({ news }: { news: News }) => {
    // State för formulärets värden, med nyhetens befintliga information
    const [title, setTitle] = useState(news.title);
    const [content, setContent] = useState(news.content);
    const [targetAudience, setTargetAudience] = useState<TargetAudience>(
        news.targetAudience,
    );
    const [validationError, setValidationError] = useState("");

    const mutation = useUpdateNews();

    // Körs när användaren klickar på Spara ändringar
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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

        // Skickar den uppdaterade nyheten till backend via PUT
        mutation.mutate({
            id: news.id,
            news: {
                title: title.trim(),
                content: content.trim(),
                targetAudience,
            },
        });
    };

    return (
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
            submitLabel="Spara ändringar"
            pendingLabel="Sparar..."
            errorMessage="Gick inte att redigera nyhet."
            successMessage="Nyheten är uppdaterad!"
        />
    );
};

export default EditNewsForm;
