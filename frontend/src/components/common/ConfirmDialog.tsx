import { TriangleAlert } from "lucide-react";
import { useEffect } from "react";

type ConfirmDialogProps = {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
};

const ConfirmDialog = ({
    message,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onCancel();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onCancel]);
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-start bg-black/50 pt-20">
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirm-title"
                aria-describedby="confirm-message"
                className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
            >
                <div className="mb-3 flex items-center gap-2">
                    <TriangleAlert size={22} className="text-(--color-error)" />

                    <h2 id="confirm-title" className="text-lg font-semibold">
                        Bekräfta borttagning
                    </h2>
                </div>

                <p id="confirm-message" className="mb-6 text-sm text-gray-600">
                    {message}
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-lg bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
                    >
                        Avbryt
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className="rounded-lg bg-(--color-error) px-4 py-2 text-sm text-white hover:opacity-80"
                    >
                        Radera
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
