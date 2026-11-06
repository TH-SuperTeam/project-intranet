import CreateButton from "../components/common/CreateButton";

const UsersPage = () => {
    return (
        <div>
            <h1>Users Page</h1>
            <p>This is a placeholder for the Users Page.</p>

            <CreateButton to="/users/create">+ Skapa ny användare</CreateButton>
        </div>
    );
};

export default UsersPage;
