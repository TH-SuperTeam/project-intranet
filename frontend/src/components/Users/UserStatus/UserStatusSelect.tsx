import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Status, statusLabels, statusColors } from "../../../types/Status";

type UserStatusSelectProps = {
    value: Status;
    onChange: (newStatus: Status) => void;
    disabled?: boolean;
};

const UserStatusSelect = ({
    value,
    onChange,
    disabled = false,
}: UserStatusSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (status: Status) => {
        setIsOpen(false);

        if (status !== value) {
            onChange(status);
        }
    };

    return (
        <div ref={dropdownRef} className="relative w-45 shrink-0">
            {/* Selected status */}
            <button
                type="button"
                aria-label="Användarstatus"
                aria-haspopup="listbox"
                aria-expanded={isOpen && !disabled}
                disabled={disabled}
                onClick={() => setIsOpen((prev) => !prev)}
                className={`
                    flex h-10.5 w-full items-center justify-between
                    rounded-lg border px-3 text-sm font-medium
                    cursor-pointer
                    focus:outline-none focus:ring-2
                    focus:ring-(--color-primary-soft)
                    disabled:cursor-not-allowed disabled:opacity-50
                    ${statusColors[value]}
                `}
            >
                <span>{statusLabels[value]}</span>
                <ChevronDown
                    size={16}
                    className={`transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {/* Dropdown options */}
            {isOpen && !disabled && (
                <div
                    role="listbox"
                    aria-label="Välj användarstatus"
                    className="
                        absolute left-0 top-full z-20 mt-2
                        w-full rounded-lg border
                        border-(--color-border)
                        bg-(--color-surface)
                        p-1.5 shadow-lg
                    "
                >
                    {Object.values(Status).map((status) => (
                        <button
                            key={status}
                            type="button"
                            role="option"
                            aria-selected={status === value}
                            onClick={() => handleSelect(status)}
                            className={`
                                mb-1 flex w-full items-center justify-between
                                rounded-md border px-2.5 py-2
                                text-left text-sm font-medium
                                transition-opacity hover:opacity-80
                                last:mb-0
                                ${statusColors[status]}
                            `}
                        >
                            <span>{statusLabels[status]}</span>

                            {status === value && (
                                <Check size={15} aria-hidden="true" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserStatusSelect;
