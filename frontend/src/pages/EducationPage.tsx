import { useState } from "react";
import { Plus } from "lucide-react";
import { usePrograms } from "../hooks/EducationHooks/usePrograms";
import { useAllClasses } from "../hooks/EducationHooks/useAllClasses";
import { useSchools } from "../hooks/EducationHooks/useScools";
import { useProgramMutations } from "../hooks/EducationHooks/useProgramMutations";
import { ListSkeleton } from "../components/Loaders/Skeletons/ListSkeleton";
import ProgramCard from "../components/Education/ProgramCard";
import ProgramForm from "../components/Education/ProgramForm";
import FormModal from "../components/common/FormModal";
import CreateButton from "../components/common/CreateButton";
import ConfirmDialog from "../components/common/ConfirmDialog";
import type { Program } from "../types/Program";
import type { ProgramRequest } from "../types/ProgramRequest";
import SchoolClassForm from "../components/Education/SchoolClassForm";
import { useSchoolClassMutations } from "../hooks/EducationHooks/useSchoolClassMutations";
import type { SchoolClass } from "../types/SchoolClass";
import type { SchoolClassRequest } from "../types/SchoolClassRequest";
import styles from "../components/Education/Education.module.css";

const schools = [
    { code: "TH", name: "Teknikhögskolan" },
    { code: "VH", name: "Vårdyrkeshögskolan" },
] as const;

type ArchiveTarget =
    | { type: "program"; item: Program }
    | { type: "class"; item: SchoolClass };

const EducationPage = () => {
    const [archiveTarget, setArchiveTarget] = useState<ArchiveTarget | null>(
        null,
    );

    const [includeArchived, setIncludeArchived] = useState(false);

    const [isProgramFormOpen, setIsProgramFormOpen] = useState(false);

    const [editingProgram, setEditingProgram] = useState<Program | undefined>(
        undefined,
    );

    const [isClassFormOpen, setIsClassFormOpen] = useState(false);

    const [editingClass, setEditingClass] = useState<SchoolClass | undefined>(
        undefined,
    );

    const [defaultProgramId, setDefaultProgramId] = useState<
        number | undefined
    >(undefined);

    const programsQuery = usePrograms(includeArchived);
    const classesQuery = useAllClasses(includeArchived);
    const schoolsQuery = useSchools();

    const {
        createMutation,
        updateMutation,
        archiveMutation: archiveProgramMutation,
        restoreMutation: restoreProgramMutation,
    } = useProgramMutations();

    const {
        createMutation: createClassMutation,
        updateMutation: updateClassMutation,
        archiveMutation: archiveClassMutation,
        restoreMutation: restoreClassMutation,
    } = useSchoolClassMutations();

    const selectedArchiveMutation = archiveTarget
        ? archiveTarget.type === "program"
            ? archiveTarget.item.isActive
                ? archiveProgramMutation
                : restoreProgramMutation
            : archiveTarget.item.isActive
              ? archiveClassMutation
              : restoreClassMutation
        : null;

    const openArchiveDialog = (target: ArchiveTarget) => {
        archiveProgramMutation.reset();
        restoreProgramMutation.reset();
        archiveClassMutation.reset();
        restoreClassMutation.reset();

        setArchiveTarget(target);
    };

    const closeArchiveDialog = () => {
        setArchiveTarget(null);
    };

    const handleArchiveConfirm = () => {
        if (!archiveTarget || !selectedArchiveMutation) {
            return;
        }

        selectedArchiveMutation.mutate(archiveTarget.item.id, {
            onSuccess: closeArchiveDialog,
        });
    };

    const isClassFormPending =
        createClassMutation.isPending || updateClassMutation.isPending;

    const classFormError = editingClass
        ? updateClassMutation.error?.message
        : createClassMutation.error?.message;

    const programs = programsQuery.data ?? [];
    const classes = classesQuery.data ?? [];

    const isPending =
        programsQuery.isPending ||
        classesQuery.isPending ||
        schoolsQuery.isPending;

    const isError =
        programsQuery.isError || classesQuery.isError || schoolsQuery.isError;

    const isFormPending = createMutation.isPending || updateMutation.isPending;

    const formError = editingProgram
        ? updateMutation.error?.message
        : createMutation.error?.message;

    const openCreateProgram = () => {
        createMutation.reset();
        updateMutation.reset();

        setEditingProgram(undefined);
        setIsProgramFormOpen(true);
    };

    const openEditProgram = (program: Program) => {
        createMutation.reset();
        updateMutation.reset();

        setEditingProgram(program);
        setIsProgramFormOpen(true);
    };

    const closeProgramForm = () => {
        setIsProgramFormOpen(false);
        setEditingProgram(undefined);
    };

    const handleProgramSubmit = (request: ProgramRequest) => {
        if (editingProgram) {
            updateMutation.mutate(
                {
                    id: editingProgram.id,
                    program: request,
                },
                {
                    onSuccess: closeProgramForm,
                },
            );
        } else {
            createMutation.mutate(request, {
                onSuccess: closeProgramForm,
            });
        }
    };

    const openCreateClass = (programId: number) => {
        createClassMutation.reset();
        updateClassMutation.reset();

        setEditingClass(undefined);
        setDefaultProgramId(programId);
        setIsClassFormOpen(true);
    };

    const openEditClass = (schoolClass: SchoolClass) => {
        createClassMutation.reset();
        updateClassMutation.reset();

        setEditingClass(schoolClass);
        setDefaultProgramId(undefined);
        setIsClassFormOpen(true);
    };

    const closeClassForm = () => {
        setIsClassFormOpen(false);
        setEditingClass(undefined);
        setDefaultProgramId(undefined);
    };

    const handleClassSubmit = (request: SchoolClassRequest) => {
        if (editingClass) {
            updateClassMutation.mutate(
                {
                    id: editingClass.id,
                    schoolClass: request,
                },
                {
                    onSuccess: closeClassForm,
                },
            );
        } else {
            createClassMutation.mutate(request, {
                onSuccess: closeClassForm,
            });
        }
    };

    return (
        <section className={styles.educationPage}>
            <div className={styles.pageHeader}>
                <div>
                    <h1>Utbildningar</h1>
                    <p>Hantera skolornas utbildningsprogram och klasser.</p>
                </div>

                <div className={styles.headerActions}>
                    <label className={styles.archiveFilter}>
                        <input
                            type="checkbox"
                            checked={includeArchived}
                            onChange={(e) =>
                                setIncludeArchived(e.target.checked)
                            }
                        />
                        Visa arkiverade
                    </label>

                    <CreateButton
                        onClick={openCreateProgram}
                        disabled={
                            schoolsQuery.isPending || schoolsQuery.isError
                        }
                    >
                        <Plus size={18} />
                        Skapa utbildning
                    </CreateButton>
                </div>
            </div>

            {isPending ? (
                <ListSkeleton variant="list" count={4} />
            ) : isError ? (
                <p>Kunde inte hämta utbildningar.</p>
            ) : (
                schools.map((school) => {
                    const schoolPrograms = programs.filter(
                        (program) => program.school === school.code,
                    );

                    return (
                        <section
                            key={school.code}
                            className={styles.schoolSection}
                        >
                            <h2>{school.name}</h2>

                            <div className={styles.programList}>
                                {schoolPrograms.length === 0 ? (
                                    <p className={styles.emptyPrograms}>
                                        Inga utbildningar att visa.
                                    </p>
                                ) : (
                                    schoolPrograms.map((program) => (
                                        <ProgramCard
                                            key={program.id}
                                            program={program}
                                            classes={classes.filter(
                                                (schoolClass) =>
                                                    schoolClass.programId ===
                                                    program.id,
                                            )}
                                            onEdit={openEditProgram}
                                            onCreateClass={openCreateClass}
                                            onEditClass={openEditClass}
                                            onToggleArchive={(program) =>
                                                openArchiveDialog({
                                                    type: "program",
                                                    item: program,
                                                })
                                            }
                                            onToggleClassArchive={(
                                                schoolClass,
                                            ) =>
                                                openArchiveDialog({
                                                    type: "class",
                                                    item: schoolClass,
                                                })
                                            }
                                        />
                                    ))
                                )}
                            </div>
                        </section>
                    );
                })
            )}

            {isProgramFormOpen && (
                <FormModal
                    title={
                        editingProgram
                            ? "Redigera utbildning"
                            : "Skapa utbildning"
                    }
                    onClose={closeProgramForm}
                    isPending={isFormPending}
                >
                    <ProgramForm
                        key={editingProgram?.id ?? "create"}
                        program={editingProgram}
                        schools={schoolsQuery.data ?? []}
                        isPending={isFormPending}
                        errorMessage={formError}
                        onSubmit={handleProgramSubmit}
                        onCancel={closeProgramForm}
                    />
                </FormModal>
            )}

            {isClassFormOpen && (
                <FormModal
                    title={editingClass ? "Redigera klass" : "Skapa klass"}
                    onClose={closeClassForm}
                    isPending={isClassFormPending}
                >
                    <SchoolClassForm
                        key={editingClass?.id ?? "create"}
                        schoolClass={editingClass}
                        defaultProgramId={defaultProgramId}
                        programs={programs}
                        isPending={isClassFormPending}
                        errorMessage={classFormError}
                        onSubmit={handleClassSubmit}
                        onCancel={closeClassForm}
                    />
                </FormModal>
            )}

            {archiveTarget && (
                <ConfirmDialog
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
        </section>
    );
};

export default EducationPage;
