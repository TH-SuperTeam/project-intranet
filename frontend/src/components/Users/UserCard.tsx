import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./Users.module.css";
import type { User } from "../../types/User";
import { Status } from "../../types/Status";
import { UserType } from "../../types/UserType";
import UserStatusSelect from "./UserStatus/UserStatusSelect";

import useUpdateUserStatus from "../../hooks/UsersHooks/useUpdateUserStatus";
import type { PublicUser } from "../../types/PublicUser";
import { useAuth } from "../../hooks/useAuth";
import UserAvatar from "../common/UserAvatar";
import ConfirmDialog from "../common/ConfirmDialog";

interface UserCardProps {
    user: User | PublicUser;
    onStatusFeedback: (message: string, type: "success" | "error") => void;
}

const userTypeLabels: Record<UserType, string> = {
    [UserType.TEACHER]: "Lärare",
    [UserType.STUDENT]: "Student",
};

const statusLabels: Record<Status, string> = {
    [Status.ACTIVE]: "Aktiv",
    [Status.SUSPENDED]: "Avstängd",
    [Status.GRADUATED]: "Examinerad",
    [Status.WITHDRAWN]: "Avbruten",
    [Status.TERMINATED]: "Avslutad",
    [Status.ON_LEAVE]: "Tjänstledig",
    [Status.PAUSED]: "Pausad",
};

const UserCard = ({ user, onStatusFeedback }: UserCardProps) => {
    const { user: currentUser } = useAuth();
    const isAdmin = currentUser?.accessRole === "ADMIN";

    const isOwnProfile = currentUser?.id === user.id;
    const profilePath = isOwnProfile ? "/profile" : `/users/${user.id}`;

    const userStatus = "status" in user ? user.status : undefined;
    const [selectedStatus, setSelectedStatus] = useState<Status>(
        userStatus ?? Status.ACTIVE,
    );
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const [statusError, setStatusError] = useState("");

    const updateStatusMutation = useUpdateUserStatus();

    const handleStatusChange = (status: Status) => {
        if (!isAdmin || status === userStatus) {
            return;
        }

        setStatusError("");
        setSelectedStatus(status);
        setShowConfirmDialog(true);
    };

    const handleCancel = () => {
        if (userStatus) {
            setSelectedStatus(userStatus);
        }

        setStatusError("");
        setShowConfirmDialog(false);
    };

    const handleConfirm = () => {
        updateStatusMutation.mutate(
            {
                userId: user.id,
                status: selectedStatus,
            },
            {
                onSuccess: () => {
                    setShowConfirmDialog(false);

                    onStatusFeedback(
                        `Statusen för ${user.firstName} ${user.lastName} har uppdaterats.`,
                        "success",
                    );
                },
                onError: (error) => {
                    setStatusError(
                        error instanceof TypeError
                            ? "Kunde inte ansluta till servern. Försök igen."
                            : error.message,
                    );
                },
            },
        );
    };

    return (
        <li className={styles.userCard}>
            <Link to={profilePath} className={styles.userProfileLink}>
                <UserAvatar size={48} profileImageUrl={user.profileImageUrl} />

                <div className={styles.userInfo}>
                    <h3 className={styles.userName}>
                        {user.firstName} {user.lastName}
                    </h3>

                    <p className={styles.userEmail}>{user.email}</p>

                    <span className={styles.userType}>
                        {userTypeLabels[user.userType]}
                    </span>
                </div>
            </Link>

            {isAdmin && (
                <div className={styles.statusControl}>
                    <UserStatusSelect
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        disabled={updateStatusMutation.isPending}
                    />
                </div>
            )}

            {isAdmin && showConfirmDialog && (
                <ConfirmDialog
                    title="Bekräfta statusändring"
                    message={
                        <>
                            Vill du ändra status för{" "}
                            <strong>
                                {user.firstName} {user.lastName}
                            </strong>{" "}
                            från{" "}
                            <strong>
                                {userStatus
                                    ? statusLabels[userStatus]
                                    : "Okänd"}
                            </strong>{" "}
                            till <strong>{statusLabels[selectedStatus]}</strong>
                            ?
                            {selectedStatus !== Status.ACTIVE && (
                                <span className="mt-3 block">
                                    Användaren kommer inte kunna logga in med
                                    denna status.
                                </span>
                            )}
                        </>
                    }
                    confirmLabel="Bekräfta"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    isPending={updateStatusMutation.isPending}
                    errorMessage={statusError}
                />
            )}
        </li>
    );
};

export default UserCard;
