import { Archive, ArchiveRestore } from "lucide-react";

type ArchiveButtonProps = {
    isActive: boolean;
    onClick: () => void;
    disabled?: boolean;
};

const ArchiveButton = ({
    isActive,
    onClick,
    disabled = false,
}: ArchiveButtonProps) => {
    const label = isActive ? "Arkivera" : "Återställ";
    const Icon = isActive ? Archive : ArchiveRestore;

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={label}
            aria-label={label}
            className="inline-flex items-center justify-center rounded-lg bg-(--color-primary-soft) px-3 py-2 text-(--color-primary) transition-colors hover:bg-(--color-surface-hover) disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <Icon size={16} />
        </button>
    );
};

export default ArchiveButton;
