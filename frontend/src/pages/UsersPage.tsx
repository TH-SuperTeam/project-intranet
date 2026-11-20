import { useState } from "react";
import CreateButton from "../components/common/CreateButton";
import SearchInput from "../components/common/SearchInput";
import UsersList from "../components/Users/UsersList";
import styles from "../components/Users/Users.module.css";
import { useAuth } from "../hooks/useAuth";
import { usePrograms } from "../hooks/usePrograms";
import { useUsers } from "../hooks/UsersHooks/useUsers";
import { useUserFilters } from "../hooks/UsersHooks/useUserFilters";
import { filterUsers } from "../utils/filterUsers";
import UsersFilterBar from "../components/Users/UsersFilterBar";
import type { UserFilters } from "../types/UserFilters";

const UsersPage = () => {
    const [search, setSearch] = useState("");
    const { user: currentUser } = useAuth();
    const isAdmin = currentUser?.accessRole === "ADMIN";
    const { data: programs } = usePrograms();
    const filters = useUserFilters(programs);
    const { data: users, isPending, isError } = useUsers(search);

    const activeFilters: UserFilters = {
        school: filters.school,
        programId: filters.programId,
        classId: filters.classId,
        status: isAdmin ? filters.status : "ALL",
    };

    const filteredUsers = filterUsers(users ?? [], activeFilters);

    const hasActiveFilters =
        filters.school !== null ||
        filters.programId !== null ||
        filters.classId !== null ||
        filters.status !== "ALL" ||
        search.trim() !== "";

    const handleReset = () => {
        filters.reset();
        setSearch("");
    };

    return (
        <section className={styles.usersSection}>
            <div className={styles.pageHeader}>
                <div>
                    <h1>Användare</h1>
                    <p>Hitta och hantera användare i skolportalen.</p>
                </div>

                {isAdmin && (
                    <CreateButton to="/users/create">
                        + Skapa användare
                    </CreateButton>
                )}
            </div>

            <div className={styles.listContainer}>
                <div className={styles.listHeader}>
                    <h2>Användarlista</h2>

                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Sök namn eller e-post..."
                    />
                    <UsersFilterBar
                        filters={activeFilters}
                        programs={programs}
                        isAdmin={isAdmin}
                        onSchoolChange={filters.changeSchool}
                        onProgramChange={filters.changeProgram}
                        onClassChange={filters.changeClass}
                        onStatusChange={filters.changeStatus}
                    />
                </div>
                <div className={styles.resultsBar}>
                    {!isPending && !isError && (
                        <p role="status" className={styles.resultsCount}>
                            {filteredUsers.length} användare
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={handleReset}
                        disabled={!hasActiveFilters}
                        className={styles.clearButton}
                    >
                        Rensa filter
                    </button>
                </div>

                <UsersList
                    users={filteredUsers}
                    isPending={isPending}
                    isError={isError}
                    hasActiveFilters={hasActiveFilters}
                />
            </div>
        </section>
    );
};

export default UsersPage;
