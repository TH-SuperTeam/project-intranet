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
import type { Program } from "../types/Program";
import type { ProgramRequest } from "../types/ProgramRequest";
import styles from "../components/Education/Education.module.css";

const schools = [
    { code: "TH", name: "Teknikhögskolan" },
    { code: "VH", name: "Vårdyrkeshögskolan" },
] as const;

const EducationPage = () => {
    const [includeArchived, setIncludeArchived] = useState(false);

    const [isProgramFormOpen, setIsProgramFormOpen] = useState(false);

    const [editingProgram, setEditingProgram] = useState<Program | undefined>(
        undefined,
    );

    const programsQuery = usePrograms(includeArchived);
    const classesQuery = useAllClasses(includeArchived);
    const schoolsQuery = useSchools();

    const { createMutation, updateMutation } = useProgramMutations();

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
        </section>
    );
};

export default EducationPage;
