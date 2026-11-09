import { useState } from "react";
import CreateButton from "../components/common/CreateButton";
import SearchInput from "../components/common/SearchInput";
import UsersList from "../components/Users/UsersList";

const UsersPage = () => {
    const [search, setSearch] = useState("");

    return (
        <div>
            <h1>Användare</h1>

            <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Sök användare..."
            />
            <UsersList search={search}></UsersList>
            <CreateButton to="/users/create">+ Skapa ny användare</CreateButton>
        </div>
    );
};

export default UsersPage;
