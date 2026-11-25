import { TriangleAlert, Archive, ArchiveRestore } from "lucide-react";
import { useEffect, useId } from "react";
import type { ReactNode } from "react";

type ConfirmDialogVariant = "danger" | "warning" | "success";

type ConfirmDialogProps = {
    title?: string;
    message: ReactNode;
    confirmLabel?: string;
    variant?: ConfirmDialogVariant;
    onConfirm: () => void;
    onCancel: () => void;
    isPending?: boolean;
    errorMessage?: string;
};

const variants = {
    danger: {
        icon: TriangleAlert,
        iconStyle: "text-(--color-error)",
        iconBackground: "bg-(--color-error-light)",
        buttonStyle: "bg-(--color-error) text-(--color-text-white)",
    },
    warning: {
        icon: Archive,
        iconStyle: "text-(--color-warning)",
        iconBackground: "bg-(--color-warning-light)",
        buttonStyle: "bg-(--color-warning-light) text-(--color-text-primary)",
    },
    success: {
        icon: ArchiveRestore,
        iconStyle: "text-(--color-success)",
        iconBackground: "bg-(--color-success-light)",
        buttonStyle: "bg-(--color-success-light) text-(--color-text-primary)",
    },
};

const ConfirmDialog = ({
    title = "Bekräfta borttagning",
    message,
    confirmLabel = "Radera",
    variant = "danger",
    onConfirm,
    onCancel,
    isPending = false,
    errorMessage,
}: ConfirmDialogProps) => {
    const titleId = useId();
    const messageId = useId();

    const {
        icon: Icon,
        iconStyle,
        iconBackground,
        buttonStyle,
    } = variants[variant];

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
                className="w-full max-w-sm max-h-[90dvh] overflow-y-auto rounded-xl bg-(--color-surface) p-6 shadow-xl"
            >
                <div className="mb-4 flex items-center gap-3">
                    <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBackground}`}
                    >
                        <Icon
                            size={22}
                            className={iconStyle}
                            aria-hidden="true"
                        />
                    </div>

                    <h2
                        id={titleId}
                        className="text-lg font-semibold text-(--color-text-primary)"
                    >
                        {title}
                    </h2>
                </div>

                <div
                    id={messageId}
                    className="mb-6 text-sm leading-relaxed text-(--color-text-secondary)"
                >
                    {message}
                </div>

                {errorMessage && (
                    <p
                        role="alert"
                        className="mb-4 rounded-lg bg-(--color-error-light) p-3 text-sm text-(--color-error)"
                    >
                        {errorMessage}
                    </p>
                )}

                <div className="flex flex-wrap justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isPending}
                        className="rounded-lg bg-(--color-background) px-4 py-2 text-sm font-medium text-(--color-text-primary) transition-colors hover:bg-(--color-surface-hover) focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-(--color-primary) disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Avbryt
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isPending}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-(--color-primary) disabled:cursor-not-allowed disabled:opacity-50 ${buttonStyle}`}
                    >
                        {isPending ? "Sparar..." : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
