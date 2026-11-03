import { Trash2 } from "lucide-react";

type DeleteButtonProps = {
    onClick: () => void;
    isPending?: boolean;
};

export default function DeleteButton({
    onClick,
    isPending = false,
}: DeleteButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-lg bg-(--color-error-light) px-3 py-2 text-sm font-medium text-(--color-error) transition-colors hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
            <Trash2 size={16} />
            {isPending ? "Raderar..." : "Radera"}
        </button>
    );
}
