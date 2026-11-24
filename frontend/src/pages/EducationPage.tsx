import { useState } from "react";
import { usePrograms } from "../hooks/EducationHooks/usePrograms";
import { useAllClasses } from "../hooks/EducationHooks/useAllClasses";
import { ListSkeleton } from "../components/Loaders/Skeletons/ListSkeleton";
import ProgramCard from "../components/Education/ProgramCard";
import styles from "../components/Education/Education.module.css";

const schools = [
    { code: "TH", name: "Teknikhögskolan" },
    { code: "VH", name: "Vårdyrkeshögskolan" },
] as const;

const EducationPage = () => {
    const [includeArchived, setIncludeArchived] = useState(false);

    const programsQuery = usePrograms(includeArchived);
    const classesQuery = useAllClasses(includeArchived);

    const programs = programsQuery.data ?? [];
    const classes = classesQuery.data ?? [];

    const isPending = programsQuery.isPending || classesQuery.isPending;

    const isError = programsQuery.isError || classesQuery.isError;

    return (
        <section className={styles.educationPage}>
            <div className={styles.pageHeader}>
                <div>
                    <h1>Utbildningar</h1>
                    <p>Hantera skolornas utbildningsprogram och klasser.</p>
                </div>

                <label className={styles.archiveFilter}>
                    <input
                        type="checkbox"
                        checked={includeArchived}
                        onChange={(e) => setIncludeArchived(e.target.checked)}
                    />
                    Visa arkiverade
                </label>
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
                                        />
                                    ))
                                )}
                            </div>
                        </section>
                    );
                })
            )}
        </section>
    );
};

export default EducationPage;
