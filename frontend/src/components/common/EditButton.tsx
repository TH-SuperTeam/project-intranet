import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";

type EditButtonProps =
    | { to: string; onClick?: never }
    | { to?: never; onClick: () => void };

const buttonStyles =
    "inline-flex items-center gap-2 rounded-lg bg-(--color-primary-soft) px-3 py-2 text-sm font-medium text-(--color-primary) transition-colors hover:bg-(--color-surface-hover)";

const EditButton = (props: EditButtonProps) => {
    const content = (
        <>
            <Pencil size={16} />
            Redigera
        </>
    );

    if (props.to !== undefined) {
        return (
            <Link to={props.to} className={buttonStyles}>
                {content}
            </Link>
        );
    }

    return (
        <button type="button" onClick={props.onClick} className={buttonStyles}>
            {content}
        </button>
    );
};

export default EditButton;
