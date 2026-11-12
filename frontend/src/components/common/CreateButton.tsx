import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type CreateButtonProps = {
    to: string;
    children: ReactNode;
};

const CreateButton = ({ to, children }: CreateButtonProps) => {
    return (
        <Link
            to={to}
            className="inline-flex items-center justify-center rounded-lg bg-(--color-secondary-light) px-6 py-3 font-semibold text-(--color-secondary-dark) no-underline transition-colors duration-200 hover:bg-(--color-secondary) hover:text-(--color-text-white) focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-(--color-secondary-dark)"
        >
            {children}
        </Link>
    );
};

export default CreateButton;
