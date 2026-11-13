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
        <div className="relative w-36 shrink-0">
            <select
                aria-label="Användarstatus"
                value={value}
                onChange={(event) => onChange(event.target.value as Status)}
                disabled={disabled}
                className="w-full appearance-none rounded-lg border border-(--color-border)] bg-(--color-surface)] py-2 pl-3 pr-9 text-sm font-medium text-(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
                {Object.values(Status).map((status) => (
                    <option
                        key={status}
                        value={status}
                        className={statusColors[status]}
                    >
                        {statusLabels[status]}
                    </option>
                ))}
            </select>

            <ChevronDown
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            />
        </div>
    );
};

export default UserStatusSelect;
