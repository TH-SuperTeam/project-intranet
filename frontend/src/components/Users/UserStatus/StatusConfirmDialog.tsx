import { useEffect, useId } from "react";
import { TriangleAlert } from "lucide-react";
import type { Status } from "../../../types/Status";

type StatusConfirmDialogProps = {
    userName: string;
    currentStatus: Status;
    newStatus: Status;
    onConfirm: () => void;
    onCancel: () => void;
    isPending: boolean;
};

const statusLabels: Record<Status, string> = {
    ACTIVE: "Aktiv",
    SUSPENDED: "Avstängd",
    GRADUATED: "Exameninerad",
    WITHDRAWN: "Avbruten",
    TERMINATED: "Avslutad",
    ON_LEAVE: "Tjänstledig",
    PAUSED: "Pausad",
};

const StatusConfirmDialog = ({
    userName,
    currentStatus,
    newStatus,
    onConfirm,
    onCancel,
    isPending,
}: StatusConfirmDialogProps) => {
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
                    <TriangleAlert
                        size={22}
                        className="text-(--color-error)"
                    />
                    <h2
                        id={titleId}
                        className="text-lg font-semibold"
                    >
                        Bekräfta statusändring
                    </h2>
                </div>

                <p
                    id={messageId}
                    className="mb-6 text-sm text-gray-600"
                >
                    Vill du ändra status för <strong>{userName}</strong> från{" "}
                    <strong>{statusLabels[currentStatus]}</strong> till{" "}
                    <strong>{statusLabels[newStatus]}</strong>?
                    {newStatus !== "ACTIVE" && (
                        <span className="mt-3 block">
                            Användaren kommer inte kunna logga in
                            med denna status.
                        </span>
                    )}
                </p>

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
                        {isPending ? "Sparar..." : "Bekräfta"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StatusConfirmDialog;




