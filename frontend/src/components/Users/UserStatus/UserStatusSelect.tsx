import { Status, statusLabels, statusColors } from "../../../types/Status";
import { ChevronDown } from "lucide-react";

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
    return (
        <div className="relative w-45 shrink-0">
            <select
                aria-label="Användarstatus"
                value={value}
                onChange={(event) => onChange(event.target.value as Status)}
                disabled={disabled}
                className={`
                    h-10.5 w-full appearance-none
                    rounded-lg border
                    py-2 pl-3 pr-9
                    text-sm font-medium
                    cursor-pointer
                    focus:outline-none
                    focus:ring-2 focus:ring-(--color-primary-soft)
                    disabled:cursor-not-allowed disabled:opacity-50
                    ${statusColors[value]}
                `}
            >
                {Object.values(Status).map((status) => (
                    <option key={status} value={status}>
                        {statusLabels[status]}
                    </option>
                ))}
            </select>

            <ChevronDown
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
            />
        </div>
    );
};

export default UserStatusSelect;
