import ConfirmDialog from "../common/ConfirmDialog";
import type { useEducationActions } from "../../hooks/EducationHooks/useEducationActions";

type EducationConfirmDialogsProps = {
    actions: ReturnType<typeof useEducationActions>;
};

const EducationConfirmDialogs = ({ actions }: EducationConfirmDialogsProps) => {
    const {
        archiveTarget,
        deleteTarget,
        selectedArchiveMutation,
        selectedDeleteMutation,
        closeArchiveDialog,
        handleArchiveConfirm,
        closeDeleteDialog,
        handleDeleteConfirm,
    } = actions;

    return (
        <>
            {archiveTarget && (
                <ConfirmDialog
                    variant={
                        archiveTarget.item.isActive ? "warning" : "success"
                    }
                    title={
                        archiveTarget.item.isActive
                            ? "Bekräfta arkivering"
                            : "Bekräfta återställning"
                    }
                    message={
                        <>
                            <p>
                                Vill du{" "}
                                {archiveTarget.item.isActive
                                    ? "arkivera"
                                    : "återställa"}{" "}
                                <strong>{archiveTarget.item.name}</strong>?
                            </p>

                            {archiveTarget.type === "program" &&
                                archiveTarget.item.isActive && (
                                    <p className="mt-2">
                                        Programmets klasser kommer inte längre
                                        att vara valbara. Befintlig information
                                        bevaras.
                                    </p>
                                )}

                            {archiveTarget.type === "class" &&
                                archiveTarget.item.isActive && (
                                    <p className="mt-2">
                                        Klassen kommer inte längre att vara
                                        valbar. Befintlig information bevaras.
                                    </p>
                                )}
                        </>
                    }
                    confirmLabel={
                        archiveTarget.item.isActive ? "Arkivera" : "Återställ"
                    }
                    onConfirm={handleArchiveConfirm}
                    onCancel={closeArchiveDialog}
                    isPending={selectedArchiveMutation?.isPending}
                    errorMessage={selectedArchiveMutation?.error?.message}
                />
            )}

            {deleteTarget && (
                <ConfirmDialog
                    variant="danger"
                    title="Bekräfta permanent radering"
                    message={
                        <>
                            <p>
                                Vill du verkligen radera{" "}
                                <strong>{deleteTarget.item.name}</strong>?
                            </p>

                            <p className="mt-2">
                                Informationen tas bort permanent. Denna åtgärd
                                går inte att ångra.
                            </p>

                            {deleteTarget.type === "program" && (
                                <p className="mt-2">
                                    Programmet kan inte raderas om det har
                                    tillhörande klasser eller andra beroenden.
                                </p>
                            )}
                        </>
                    }
                    confirmLabel="Radera"
                    onConfirm={handleDeleteConfirm}
                    onCancel={closeDeleteDialog}
                    isPending={selectedDeleteMutation?.isPending}
                    errorMessage={selectedDeleteMutation?.error?.message}
                />
            )}
        </>
    );
};

export default EducationConfirmDialogs;
