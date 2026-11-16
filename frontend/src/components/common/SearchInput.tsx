import { Search, X } from "lucide-react";

type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

const SearchInput = ({
    value,
    onChange,
    placeholder = "Sök...",
}: SearchInputProps) => {
    return (
        <div className="relative w-full max-w-sm">
            <Search
                size={18}
                aria-hidden="true"
                className="absolute top-1/2 left-3 -translate-y-1/2 text-(--color-text-secondary)"
            />

            <input
                type="search"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                aria-label={placeholder}
                className="w-full rounded-lg border border-(--color-border) bg-(--color-background) py-2 pr-10 pl-10 text-sm text-(--color-text-primary) outline-none transition-colors focus:border-(--color-secondary) [&::-webkit-search-cancel-button]:hidden"
            />

            {value && (
                <button
                    type="button"
                    onClick={() => onChange("")}
                    aria-label="Rensa sökning"
                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-(--color-text-secondary) hover:text-(--color-text-primary)"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
};

export default SearchInput;
