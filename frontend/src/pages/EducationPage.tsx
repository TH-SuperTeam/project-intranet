import { usePrograms } from "../hooks/EducationHooks/usePrograms";
import { useAllClasses } from "../hooks/EducationHooks/useAllClasses";
import { ListSkeleton } from "../components/Loaders/Skeletons/ListSkeleton";

const EducationPage = () => {
    const programsQuery = usePrograms();
    const classesQuery = useAllClasses();

    return (
        <section>
            <div>
                <h1>Utbildningar</h1>
                <p>Hantera skolornas utbildningsprogram och klasser.</p>
            </div>

            {programsQuery.isPending || classesQuery.isPending ? (
                <ListSkeleton variant="list" count={4} />
            ) : programsQuery.isError || classesQuery.isError ? (
                <p>Kunde inte hämta utbildningar.</p>
            ) : (
                <div>
                    <p>Antal program: {programsQuery.data?.length}</p>
                    <p>Antal klasser: {classesQuery.data?.length}</p>
                </div>
            )}
        </section>
    );
};

export default EducationPage;
