import { useState, type FormEvent } from "react";
import BackLink from "../components/common/BackLink";
import UsersForm from "../components/Users/UsersForm";
import { AccessRole } from "../types/AccessRole";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserType } from "../types/UserType";
import { createUser } from "../services/usersApi";
import styles from "../components/Users/Users.module.css";

const capitalize = (value: string) => {
    const trimmed = value.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

const CreateUsersPage = () => {
    // State för formulärets värden
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState<UserType>(UserType.STUDENT);
    const [accessRole, setAccessRole] = useState<AccessRole>(AccessRole.USER);
    const [validationError, setValidationError] = useState("");

    const queryClient = useQueryClient();

    // Hanterar skapandet av användare via TanStack Query. Fungerar som useQuery men för POST/PUT/DELETE-anrop. mutationFn är den funktion som körs när användaren klickar på Publicera.
    const mutation = useMutation({
        mutationFn: createUser,

        onSuccess: () => {
            // Markerar användarlistan som inaktuell så att den hämtas om.
            queryClient.invalidateQueries({ queryKey: ["users"] });

            // Återställer formuläret
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setUserType(UserType.STUDENT);
            setAccessRole(AccessRole.USER);
            setValidationError("");
        },
    });

    // Körs när användaren klickar på Publicera. Den här funktionen tar emot en händelse från ett formulär.
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        //Vi vill preventa att formuläre utför sitt vanliga standardbeteende. Vi hanterar det själv med JavaScript
        e.preventDefault();

        setValidationError("");

        // Kontrollerar att obligatoriska fält är ifyllda
        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !email.trim() ||
            !password.trim()
        ) {
            setValidationError("Alla fält måste fyllas i.");
            return;
        }

        if (firstName.trim().length > 100) {
            setValidationError("Förnamn får innehålla max 100 tecken.");
            return;
        }
        if (lastName.trim().length > 100) {
            setValidationError("Efternamn får innehålla max 100 tecken.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setValidationError("Ange en giltig e-postadress.");
            return;
        }

        if (password.length < 12) {
            setValidationError("Lösenord måste innehålla minst 12 tecken.");
            return;
        }
        if (password.trim().length > 255) {
            setValidationError("Lösenord får innehålla max 255 tecken.");
            return;
        }

        // Skickar användaren till backend via POST /api/users
        mutation.mutate(
            {
                firstName: capitalize(firstName),
                lastName: capitalize(lastName),
                email: email.trim(),
                password: password,
                userType,
                accessRole,
            },
            {
                onError: (error) => {
                    setValidationError(error.message);
                },
            },
        );
    };

    return (
        <section className={styles.usersSection}>
            <div className={styles.header}>
                <BackLink to="/users" />
                <h1>Skapa ny användare</h1>
            </div>
            <UsersForm
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                userType={userType}
                setUserType={setUserType}
                accessRole={accessRole}
                setAccessRole={setAccessRole}
                validationError={validationError}
                mutation={mutation}
                handleSubmit={handleSubmit}
                submitLabel="Skapa"
                pendingLabel="Skapar..."
                errorMessage="Kunde inte skapa användare."
                successMessage="Användaren är skapad!"
            />
        </section>
    );
};

export default CreateUsersPage;
