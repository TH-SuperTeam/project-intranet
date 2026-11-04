import BackLink from "../components/common/BackLink";

const CreateUsersPage = () => {
    return (
        <div>
            <BackLink to="/users"></BackLink>
            <h1>Skapa Ny Användare</h1>
            <p>Detta är en platsför användarskapande.</p>
        </div>
    );
};

export default CreateUsersPage;
