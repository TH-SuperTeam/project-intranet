import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type FormModalProps = {
    children: ReactNode;
    onClose: () => void;
    isPending?: boolean;
    title: string;
};

const FormModal = ({
    children,
    onClose,
    isPending = false,
    title,
}: FormModalProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;

        dialog?.showModal();

        return () => {
            dialog?.close();
        };
    }, []);

    return (
        <dialog
            ref={dialogRef}
            aria-label={title}
            onCancel={(e) => {
                e.preventDefault();

                if (!isPending) {
                    onClose();
                }
            }}
            className="m-auto w-[calc(100%-2rem)] max-w-lg max-h-[90dvh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl backdrop:bg-black/50"
        >
            {children}
        </dialog>
    );
};

export default FormModal;
