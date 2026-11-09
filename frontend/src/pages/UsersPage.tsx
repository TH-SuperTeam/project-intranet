import { useState } from "react";
import CreateButton from "../components/common/CreateButton";
import SearchInput from "../components/common/SearchInput";
import UsersList from "../components/Users/UsersList";
import styles from "../components/Users/Users.module.css";

const UsersPage = () => {
    const [search, setSearch] = useState("");

    return (
        <section className={styles.usersSection}>
            <div className={styles.pageHeader}>
                <div>
                    <h1>Användare</h1>
                    <p>Hitta och hantera användare i skolportalen.</p>
                </div>

                <CreateButton to="/users/create">
                    + Skapa användare
                </CreateButton>
            </div>

            <div className={styles.listContainer}>
                <div className={styles.listHeader}>
                    <h2>Användarlista</h2>

                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Sök namn eller e-post..."
                    />
                </div>

                <UsersList search={search} />
            </div>
        </section>
    );
};

export default UsersPage;
