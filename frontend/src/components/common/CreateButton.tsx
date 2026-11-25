import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type CreateButtonProps = {
    children: ReactNode;
} & (
    | { to: string; onClick?: never; disabled?: never }
    | { to?: never; onClick: () => void; disabled?: boolean }
);

const buttonStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg bg-(--color-secondary-light) px-6 py-3 font-semibold text-(--color-secondary-dark) no-underline transition-colors duration-200 hover:bg-(--color-secondary) hover:text-(--color-text-white) focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-(--color-secondary-dark) disabled:opacity-50 disabled:cursor-not-allowed";

const CreateButton = (props: CreateButtonProps) => {
    if (props.to !== undefined) {
        return (
            <Link to={props.to} className={buttonStyles}>
                {props.children}
            </Link>
        );
    }

    return (
        <button
            type="button"
            onClick={props.onClick}
            disabled={props.disabled}
            className={buttonStyles}
        >
            {props.children}
        </button>
    );
};

export default CreateButton;
