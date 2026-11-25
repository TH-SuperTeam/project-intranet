import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";

type EditButtonProps = {
    iconOnly?: boolean;
} & ({ to: string; onClick?: never } | { to?: never; onClick: () => void });

const buttonStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg bg-(--color-primary-soft) px-3 py-2 text-sm font-medium text-(--color-primary) transition-colors hover:bg-(--color-surface-hover)";

const EditButton = (props: EditButtonProps) => {
    const content = (
        <>
            <Pencil size={16} />
            {!props.iconOnly && "Redigera"}
        </>
    );

    if (props.to !== undefined) {
        return (
            <Link
                to={props.to}
                className={buttonStyles}
                aria-label="Redigera"
                title="Redigera"
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            type="button"
            onClick={props.onClick}
            className={buttonStyles}
            aria-label="Redigera"
            title="Redigera"
        >
            {content}
        </button>
    );
};

export default EditButton;
