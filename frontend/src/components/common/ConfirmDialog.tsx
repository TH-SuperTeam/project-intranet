import { TriangleAlert } from "lucide-react";
import { useEffect, useId } from "react";

type ConfirmDialogProps = {
    title?: string;
    message: React.ReactNode;
    confirmLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
    isPending?: boolean;
    errorMessage?: string;
};

const ConfirmDialog = ({
    title = "Bekräfta borttagning",
    message,
    confirmLabel = "Radera",
    onConfirm,
    onCancel,
    isPending = false,
    errorMessage,
}: ConfirmDialogProps) => {
    const titleId = useId();
    const messageId = useId();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !isPending) {
                onCancel();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onCancel, isPending]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={messageId}
                className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
            >
                <div className="mb-4 flex items-center gap-2">
                    <TriangleAlert size={22} className="text-(--color-error)" />
                    <h2 id={titleId} className="text-lg font-semibold">
                        {title}
                    </h2>
                </div>

                <div id={messageId} className="mb-6 text-sm text-gray-600">
                    {message}
                </div>

                {errorMessage && (
                    <p
                        role="alert"
                        className="mb-4 text-sm text-(--color-error)"
                    >
                        {errorMessage}
                    </p>
                )}

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isPending}
                        className="rounded-lg bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200 disabled:opacity-50"
                    >
                        Avbryt
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isPending}
                        className="rounded-lg bg-(--color-error) px-4 py-2 text-sm text-white hover:opacity-80 disabled:opacity-50"
                    >
                        {isPending ? "Sparar..." : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
