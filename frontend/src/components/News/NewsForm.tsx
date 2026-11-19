import {
    useState,
    type FormEvent,
    type Dispatch,
    type SetStateAction,
} from "react";
import { TargetAudience } from "../../types/TargetAudience";
import styles from "./NewsForm.module.css";
import SubmitButton from "../common/SubmitButton";
import { newsImages } from "../../utils/newsImageUtils";
import { ChevronDown } from "lucide-react";

// Dispatch<SetStateAction<T>> är Reacts typ för en state-setter från useState.
// Den kan uppdatera state med ett nytt värde eller en funktion som utgår från föregående värde.
type NewsFormProps = {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    targetAudience: TargetAudience[];
    setTargetAudience: Dispatch<SetStateAction<TargetAudience[]>>;
    newsImageUrl: string | null;
    setNewsImageUrl: Dispatch<SetStateAction<string | null>>;
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

const PUBLIC_CONTENT_MAX_LENGTH = 300;

const NewsForm = ({
    title,
    setTitle,
    content,
    setContent,
    targetAudience,
    setTargetAudience,
    newsImageUrl,
    setNewsImageUrl,
    validationError,
    mutation,
    handleSubmit,
    submitLabel,
    pendingLabel,
    errorMessage,
    successMessage,
}: NewsFormProps) => {
    const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
    const isPublicNews = targetAudience.includes(
        TargetAudience.PUBLIC_DASHBOARD,
    );

    const isContentTooLong =
        isPublicNews && content.length > PUBLIC_CONTENT_MAX_LENGTH;

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
                {isPublicNews && (
                    <div>
                        <span
                            className={
                                isContentTooLong
                                    ? styles.characterCountError
                                    : styles.characterCount
                            }
                        >
                            {content.length} / {PUBLIC_CONTENT_MAX_LENGTH}{" "}
                            tecken
                        </span>

                        {isContentTooLong && (
                            <p className={styles.validationError} role="alert">
                                Nyheter för informationsskärmen får innehålla
                                max 300 tecken.
                            </p>
                        )}
                    </div>
                )}
            </div>

            <fieldset className={styles.formGroup}>
                <legend className={styles.label}>Målgrupp:</legend>
                <div className={styles.audienceGrid}>
                    {[
                        { value: TargetAudience.STUDENT, label: "Studenter" },
                        { value: TargetAudience.TEACHER, label: "Lärare" },
                        {
                            value: TargetAudience.PUBLIC_DASHBOARD,
                            label: "Informationsskärm",
                        },
                    ].map(({ value, label }) => (
                        <label key={value} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                name="targetAudience"
                                value={value}
                                checked={targetAudience.includes(value)}
                                onChange={e => {
                                    setTargetAudience(prev =>
                                        e.target.checked
                                            ? [...prev, value]
                                            : prev.filter(
                                                  audience =>
                                                      audience !== value,
                                              ),
                                    );
                                }}
                            />
                            {label}
                        </label>
                    ))}
                </div>

                {targetAudience.includes(TargetAudience.PUBLIC_DASHBOARD) && (
                    <p className={styles.publicInfo}>
                        Nyheter som visas på informationsskärmarna är offentligt
                        tillgängliga utan inloggning.
                    </p>
                )}
            </fieldset>

            <div className={styles.formGroup}>
                <span className={styles.label}>Lägg till en bild:</span>

                <button
                    type="button"
                    className={styles.imagePickerToggle}
                    onClick={() => setIsImagePickerOpen(prev => !prev)}
                    aria-expanded={isImagePickerOpen}
                >
                    {isImagePickerOpen ? "Stäng bildväljaren" : "Välj bild"}
                    <ChevronDown
                        size={16}
                        aria-hidden="true"
                        className={`transition-transform ${
                            isImagePickerOpen ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {newsImageUrl ? (
                    <div className={styles.selectedImagePreview}>
                        <img src={newsImageUrl} alt="Vald nyhetsbild" />
                        <span>Bild vald</span>
                    </div>
                ) : (
                    <span className={styles.noImageSelected}>
                        Ingen bild vald
                    </span>
                )}

                {isImagePickerOpen && (
                    <div className={styles.imageGrid}>
                        <button
                            type="button"
                            onClick={() => {
                                setNewsImageUrl(null);
                                setIsImagePickerOpen(false);
                            }}
                            className={
                                newsImageUrl === null
                                    ? styles.selectedImage
                                    : styles.imageOption
                            }
                        >
                            <div className={styles.noImageOption}>
                                <span>Ingen bild</span>
                            </div>
                        </button>

                        {newsImages.map(image => (
                            <button
                                key={image.id}
                                type="button"
                                onClick={() => {
                                    setNewsImageUrl(image.url);
                                    setIsImagePickerOpen(false);
                                }}
                                className={
                                    newsImageUrl === image.url
                                        ? styles.selectedImage
                                        : styles.imageOption
                                }
                            >
                                <img src={image.url} alt={image.alt} />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Visar valideringsfel */}
            {validationError && <p role="alert">{validationError}</p>}

            {/* Visar fel om API-anropet misslyckas */}
            {mutation.isError && <p role="alert">{errorMessage}</p>}

            {mutation.isSuccess && <p role="status">{successMessage}</p>}

            <SubmitButton
                isPending={mutation.isPending}
                isDisabled={isContentTooLong}
                submitLabel={submitLabel}
                pendingLabel={pendingLabel}
            />
        </form>
    );
};

export default NewsForm;
