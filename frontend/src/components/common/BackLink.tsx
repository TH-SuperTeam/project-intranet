import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

type BackLinkProps = {
    to: string;
    label?: string;
};

const BackLink = ({ to, label = "Tillbaka" }: BackLinkProps) => {
    return (
        <Link
            to={to}
            className="
                group inline-flex w-fit items-center gap-2
                rounded-lg pl-1.5 pr-2.5 py-2.5
                bg-(--color-primary-soft)
                text-(--color-primary)
                text-sm font-medium no-underline
                transition-all duration-200
                hover:bg-(--color-surface-hover)
                hover:-translate-x-0.5
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-(--color-primary)
                motion-reduce:transform-none
                motion-reduce:transition-none
            "
        >
            <ChevronLeft
                size={18}
                strokeWidth={2}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:transition-none"
            />

            <span>{label}</span>
        </Link>
    );
};

export default BackLink;
