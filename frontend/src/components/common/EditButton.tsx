import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";

type EditButtonProps = {
    to: string;
};

const EditButton = ({ to }: EditButtonProps) => {
    return (
        <Link
            to={to}
            className="inline-flex items-center gap-2 rounded-lg bg-(--color-primary-soft) px-3 py-2 text-sm font-medium text-(--color-primary) transition-colors hover:bg-(--color-surface-hover)"
        >
            <Pencil size={16} />
            Redigera
        </Link>
    );
};

export default EditButton;
