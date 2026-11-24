import { useState } from "react";
import { Plus } from "lucide-react";
import { usePrograms } from "../hooks/EducationHooks/usePrograms";
import { useAllClasses } from "../hooks/EducationHooks/useAllClasses";
import { useSchools } from "../hooks/EducationHooks/useSchools";
import { useProgramMutations } from "../hooks/EducationHooks/useProgramMutations";
import { useProgramForm } from "../hooks/EducationHooks/useProgramForm";
import { useSchoolClassForm } from "../hooks/EducationHooks/useSchoolClassForm";
import { useEducationActions } from "../hooks/EducationHooks/useEducationActions";
import { ListSkeleton } from "../components/Loaders/Skeletons/ListSkeleton";
import ProgramCard from "../components/Education/ProgramCard";
import ProgramForm from "../components/Education/ProgramForm";
import FormModal from "../components/common/FormModal";
import CreateButton from "../components/common/CreateButton";
import EducationConfirmDialogs from "../components/Education/EducationConfirmDialogs";
import SchoolClassForm from "../components/Education/SchoolClassForm";
import { useSchoolClassMutations } from "../hooks/EducationHooks/useSchoolClassMutations";
import styles from "../components/Education/Education.module.css";

const schools = [
    { code: "TH", name: "Teknikhögskolan" },
    { code: "VH", name: "Vårdyrkeshögskolan" },
] as const;

const EducationPage = () => {
    const [includeArchived, setIncludeArchived] = useState(false);

    const programsQuery = usePrograms(includeArchived);
    const classesQuery = useAllClasses(includeArchived);
    const schoolsQuery = useSchools();

    const programMutations = useProgramMutations();

    const {
        isProgramFormOpen,
        editingProgram,
        isFormPending,
        formError,
        openCreateProgram,
        openEditProgram,
        closeProgramForm,
        handleProgramSubmit,
    } = useProgramForm(programMutations);

    const schoolClassMutations = useSchoolClassMutations();

    const educationActions = useEducationActions(
        programMutations,
        schoolClassMutations,
    );

    const { openArchiveDialog, openDeleteDialog } = educationActions;

    const {
        isClassFormOpen,
        editingClass,
        defaultProgramId,
        isClassFormPending,
        classFormError,
        openCreateClass,
        openEditClass,
        closeClassForm,
        handleClassSubmit,
    } = useSchoolClassForm(schoolClassMutations);

    const programs = programsQuery.data ?? [];
    const classes = classesQuery.data ?? [];

    const isPending =
        programsQuery.isPending ||
        classesQuery.isPending ||
        schoolsQuery.isPending;

    const isError =
        programsQuery.isError || classesQuery.isError || schoolsQuery.isError;

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
                                            onDelete={(program) =>
                                                openDeleteDialog({
                                                    type: "program",
                                                    item: program,
                                                })
                                            }
                                            onDeleteClass={(schoolClass) =>
                                                openDeleteDialog({
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

            <EducationConfirmDialogs actions={educationActions} />
        </section>
    );
};

export default EducationPage;
