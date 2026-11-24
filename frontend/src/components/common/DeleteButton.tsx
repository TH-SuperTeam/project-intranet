import { Trash2 } from "lucide-react";

type DeleteButtonProps = {
    onClick: () => void;
    isPending?: boolean;
    iconOnly?: boolean;
};

export default function DeleteButton({
    onClick,
    isPending = false,
    iconOnly = false,
}: DeleteButtonProps) {
    const label = isPending ? "Raderar..." : "Radera";

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={isPending}
            title={label}
            aria-label={label}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-(--color-error-light) px-3 py-2 text-sm font-medium text-(--color-error) transition-colors hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
            <Trash2 size={16} />
            {!iconOnly && label}
        </button>
    );
}
