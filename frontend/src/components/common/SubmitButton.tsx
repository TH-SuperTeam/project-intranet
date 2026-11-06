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
            className="self-start rounded-lg bg-(--color-secondary) px-4 py-2 text-sm font-semibold text-(--color-text-white) transition-colors duration-200 hover:bg-(--color-secondary-hover) disabled:cursor-not-allowed disabled:opacity-50"
        >
            {isPending ? pendingLabel : submitLabel}
        </button>
    );
};
export default SubmitButton;
