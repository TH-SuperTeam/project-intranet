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
        <div>
            <label htmlFor={id}>{label}</label>
            <select
                id={id}
                value={value}
                onChange={e => onChange(e.target.value)}
                disabled={disabled}
            >
                <option value="">{defaultLabel}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterSelect;
