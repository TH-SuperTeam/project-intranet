type SubmitButtonProps = {
    isPending: boolean;
    submitLabel: string;
    pendingLabel: string;
};

const SubmitButton = ({
    isPending,
    submitLabel,
    pendingLabel,
}: SubmitButtonProps) => {
    return (
        <button
            type="submit"
            disabled={isPending}
            className="self-start rounded-lg bg-(--color-secondary-light) px-4 py-2 text-sm font-semibold text-(--color-secondary-dark) transition-colors duration-200 hover:bg-(--color-secondary) hover:text-(--color-text-white) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-secondary-dark) disabled:cursor-not-allowed disabled:opacity-50"
        >
            {isPending ? pendingLabel : submitLabel}
        </button>
    );
};

export default SubmitButton;
