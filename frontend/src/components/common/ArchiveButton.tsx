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

    const colorStyles = isActive
        ? "bg-(--color-warning-light) text-(--color-warning)"
        : "bg-(--color-success-light) text-(--color-success)";

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={label}
            aria-label={label}
            className={`inline-flex items-center justify-center rounded-lg px-3 py-2 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-(--color-primary) disabled:opacity-50 disabled:cursor-not-allowed ${colorStyles}`}
        >
            <Icon size={16} />
        </button>
    );
};

export default ArchiveButton;
