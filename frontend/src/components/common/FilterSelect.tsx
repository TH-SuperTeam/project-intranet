import { useId } from "react";

export interface FilterOption {
    value: string;
    label: string;
}

interface FilterSelectProps {
    label: string;
    value: string;
    options: FilterOption[];
    defaultLabel: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

const FilterSelect = ({
    label,
    value,
    options,
    defaultLabel,
    onChange,
    disabled = false,
}: FilterSelectProps) => {
    const id = useId();
    return (
        <div className="flex w-full flex-col gap-1.5">
            <label
                htmlFor={id}
                className="text-sm font-medium text-(--color-text-primary)"
            >
                {label}
            </label>
            <select
                id={id}
                value={value}
                onChange={e => onChange(e.target.value)}
                disabled={disabled}
                className={`w-full cursor-pointer rounded-lg border px-3 py-2 text-sm text-(--color-text-primary) outline-none transition-colors focus:border-(--color-secondary) disabled:cursor-not-allowed disabled:opacity-50 ${
                    value === ""
                        ? "border-(--color-border) bg-(--color-background)"
                        : "border-(--color-border) bg-(--color-primary-soft)"
                }`}
            >
                <option className="bg-(--color-surface)" value="">
                    {defaultLabel}
                </option>
                {options.map(option => (
                    <option
                        className="bg-(--color-surface)"
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterSelect;
