type SubmitButtonProps = {
    isPending: boolean;
    isDisabled?: boolean;
    submitLabel: string;
    pendingLabel: string;
};

const SubmitButton = ({
    isPending,
    isDisabled = false,
    submitLabel,
    pendingLabel,
}: SubmitButtonProps) => {
    return (
        <button
            type="submit"
            disabled={isPending || isDisabled}
            className="self-end rounded-lg bg-(--color-secondary-light) px-4 py-2 text-sm font-semibold text-(--color-secondary-dark) transition-colors duration-200 enabled:hover:bg-(--color-secondary) enabled:hover:text-(--color-text-white) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-secondary-dark) disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
        >
            {isPending ? pendingLabel : submitLabel}
        </button>
    );
};

export default SubmitButton;
