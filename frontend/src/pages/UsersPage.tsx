import { useEffect, useState } from "react";
import CreateButton from "../components/common/CreateButton";
import SearchInput from "../components/common/SearchInput";
import UsersList from "../components/Users/UsersList";
import styles from "../components/Users/Users.module.css";
import { useAuth } from "../hooks/useAuth";
import { usePrograms } from "../hooks/usePrograms";
import { useUsers } from "../hooks/UsersHooks/useUsers";
import { useUserFilters } from "../hooks/UsersHooks/useUserFilters";
import UsersFilterBar from "../components/Users/UsersFilterBar";
import type { UserFilters } from "../types/UserFilters";
import Pagination from "../components/common/Pagination";
import { SlidersHorizontal } from "lucide-react";

const PAGE_SIZE = 10;

const UsersPage = () => {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [page, setPage] = useState(0);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const { user: currentUser } = useAuth();
    const isAdmin = currentUser?.accessRole === "ADMIN";

    const { data: programs } = usePrograms();
    const filters = useUserFilters(programs);

    const activeFilters: UserFilters = {
        school: filters.school,
        programId: filters.programId,
        classId: filters.classId,
        status: isAdmin ? filters.status : null,
        userType: filters.userType,
    };

    const activeFilterCount = Object.values(activeFilters).filter(
        value => value !== null,
    ).length;

    const {
        data: users,
        isPending,
        isError,
    } = useUsers({
        search: debouncedSearch,
        page,
        size: PAGE_SIZE,
        filters: activeFilters,
    });

    const hasActiveFilters = activeFilterCount > 0 || search.trim() !== "";

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(0);
    };

    const handleResetFilters = () => {
        filters.reset();
        setPage(0);
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
                    <div className={styles.searchRow}>
                        <SearchInput
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="Sök namn eller e-post..."
                        />
                        <button
                            type="button"
                            onClick={() => setShowFilters(prev => !prev)}
                            aria-expanded={showFilters}
                            aria-controls="user-filters"
                            aria-label={
                                activeFilterCount > 0
                                    ? `Filtrera, ${activeFilterCount} aktiva filter`
                                    : "Filtrera"
                            }
                            className={styles.filterToggle}
                        >
                            <SlidersHorizontal size={18} aria-hidden="true" />
                            Filtrera
                            {activeFilterCount > 0 && (
                                <span
                                    className={styles.filterBadge}
                                    aria-hidden="true"
                                >
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {showFilters && (
                        <div id="user-filters">
                            <UsersFilterBar
                                filters={activeFilters}
                                programs={programs}
                                isAdmin={isAdmin}
                                onSchoolChange={value => {
                                    filters.changeSchool(value);
                                    setPage(0);
                                }}
                                onProgramChange={value => {
                                    filters.changeProgram(value);
                                    setPage(0);
                                }}
                                onClassChange={value => {
                                    filters.changeClass(value);
                                    setPage(0);
                                }}
                                onStatusChange={value => {
                                    filters.changeStatus(value);
                                    setPage(0);
                                }}
                                onUserTypeChange={value => {
                                    filters.changeUserType(value);
                                    setPage(0);
                                }}
                                onReset={handleResetFilters}
                                canReset={activeFilterCount > 0}
                            />
                        </div>
                    )}
                </div>

                <div className={styles.resultsBar}>
                    {!isPending && !isError && users && (
                        <p role="status" className={styles.resultsCount}>
                            {users.totalElements === 0
                                ? "Visar 0 av 0 användare"
                                : `Visar ${users.number * PAGE_SIZE + 1}–${Math.min(
                                      (users.number + 1) * PAGE_SIZE,
                                      users.totalElements,
                                  )} av ${users.totalElements} användare`}
                        </p>
                    )}
                </div>

                <UsersList
                    users={users?.content ?? []}
                    isPending={isPending}
                    isError={isError}
                    hasActiveFilters={hasActiveFilters}
                />

                {users && (
                    <Pagination
                        currentPage={users.number}
                        totalPages={users.totalPages}
                        onPageChange={setPage}
                        ariaLabel="Användarsidor"
                    />
                )}
            </div>
        </section>
    );
};

export default UsersPage;
