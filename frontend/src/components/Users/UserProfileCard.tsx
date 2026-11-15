import { useEffect, useState } from "react";
import { ChevronDown, Mail } from "lucide-react";
import UserAvatar from "../common/UserAvatar";
import ConfirmDialog from "../common/ConfirmDialog";
import UserStatusSelect from "./UserStatus/UserStatusSelect";
import useUpdateUserStatus from "../../hooks/UsersHooks/useUpdateUserStatus";
import useUpdateUserRole from "../../hooks/UsersHooks/useUpdateUserRole";
import { useAuth } from "../../hooks/useAuth";
import type { UserProfile } from "../../types/UserProfile";
import { UserType } from "../../types/UserType";
import { Status, statusLabels } from "../../types/Status";
import { AccessRole } from "../../types/AccessRole";
import styles from "./UserProfileCard.module.css";

interface UserProfileCardProps {
    profile: UserProfile;
}

const userTypeLabels: Record<UserType, string> = {
    [UserType.TEACHER]: "Personal",
    [UserType.STUDENT]: "Student",
};

const roleLabels: Record<AccessRole, string> = {
    [AccessRole.USER]: "Användare",
    [AccessRole.ADMIN]: "Administratör",
};

const UserProfileCard = ({ profile }: UserProfileCardProps) => {
    const { user: currentUser } = useAuth();

    const isAdmin = currentUser?.accessRole === AccessRole.ADMIN;
    const isOwnProfile = currentUser?.id === profile.id;
    const canEdit = isAdmin && !isOwnProfile;

    const userName = `${profile.firstName} ${profile.lastName}`;

    const [pendingStatus, setPendingStatus] = useState<Status | null>(null);
    const [pendingRole, setPendingRole] = useState<AccessRole | null>(null);
    const [error, setError] = useState("");
    const [feedback, setFeedback] = useState("");

    const statusMutation = useUpdateUserStatus();
    const roleMutation = useUpdateUserRole();

    useEffect(() => {
        if (!feedback) return;

        const timer = setTimeout(() => setFeedback(""), 4000);
        return () => clearTimeout(timer);
    }, [feedback]);

    const handleStatusChange = (newStatus: Status) => {
        if (!canEdit || !profile.status || newStatus === profile.status) {
            return;
        }

        setError("");
        setFeedback("");
        setPendingStatus(newStatus);
    };

    const handleRoleChange = (newRole: AccessRole) => {
        if (!canEdit || newRole === profile.accessRole) return;

        setError("");
        setFeedback("");
        setPendingRole(newRole);
    };

    const handleCancel = () => {
        setPendingStatus(null);
        setPendingRole(null);
        setError("");
    };

    const handleConfirmStatus = () => {
        if (!pendingStatus || !canEdit) return;

        statusMutation.mutate(
            { userId: profile.id, status: pendingStatus },
            {
                onSuccess: () => {
                    setPendingStatus(null);
                    setError("");
                    setFeedback(`Statusen för ${userName} har uppdaterats.`);
                },
                onError: (error) => {
                    setError(
                        error instanceof TypeError
                            ? "Kunde inte ansluta till servern. Försök igen."
                            : error.message,
                    );
                },
            },
        );
    };

    const handleConfirmRole = () => {
        if (!pendingRole || !canEdit) return;

        roleMutation.mutate(
            { userId: profile.id, accessRole: pendingRole },
            {
                onSuccess: () => {
                    setPendingRole(null);
                    setError("");
                    setFeedback(
                        `Behörigheten för ${userName} har uppdaterats.`,
                    );
                },
                onError: (error) => {
                    setError(
                        error instanceof TypeError
                            ? "Kunde inte ansluta till servern. Försök igen."
                            : error.message,
                    );
                },
            },
        );
    };

    return (
        <>
            <div
                className={`${styles.profileTop} ${
                    !isAdmin ? styles.profileTopSingle : ""
                }`}
            >
                <div className={styles.profileHeader}>
                    <UserAvatar
                        size={130}
                        profileImageUrl={profile.profileImageUrl}
                    />

                    <div className={styles.profileInfo}>
                        <h2>{userName}</h2>
                        <span className={styles.userType}>
                            {userTypeLabels[profile.userType]}
                        </span>
                    </div>
                </div>

                {isAdmin && (
                    <div
                        className={`${styles.profileCard} ${styles.adminCard}`}
                    >
                        <h3>Administrera användare</h3>

                        {feedback && (
                            <p role="status" className={styles.successMessage}>
                                {feedback}
                            </p>
                        )}

                        <div className={styles.adminFields}>
                            {profile.status && (
                                <div className={styles.adminField}>
                                    <label>Kontostatus</label>

                                    {canEdit ? (
                                        <UserStatusSelect
                                            value={profile.status}
                                            onChange={handleStatusChange}
                                            disabled={
                                                statusMutation.isPending ||
                                                roleMutation.isPending
                                            }
                                        />
                                    ) : (
                                        <span>
                                            {statusLabels[profile.status]}
                                        </span>
                                    )}
                                </div>
                            )}

                            <div className={styles.adminField}>
                                <label>Behörighet</label>

                                {canEdit ? (
                                    <div className={styles.selectWrapper}>
                                        <select
                                            aria-label="Behörighet"
                                            className={styles.roleSelect}
                                            value={profile.accessRole}
                                            onChange={(event) =>
                                                handleRoleChange(
                                                    event.target
                                                        .value as AccessRole,
                                                )
                                            }
                                            disabled={
                                                statusMutation.isPending ||
                                                roleMutation.isPending
                                            }
                                        >
                                            <option value={AccessRole.USER}>
                                                Användare
                                            </option>
                                            <option
                                                value={AccessRole.ADMIN}
                                                disabled={
                                                    profile.userType ===
                                                    UserType.STUDENT
                                                }
                                            >
                                                Administratör
                                            </option>
                                        </select>

                                        <ChevronDown
                                            size={16}
                                            aria-hidden="true"
                                            className={styles.selectIcon}
                                        />
                                    </div>
                                ) : (
                                    <span>
                                        {roleLabels[profile.accessRole]}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.profileContent}>
                <div className={styles.profileCard}>
                    <h3>Om mig</h3>
                    <p className={styles.bio}>
                        {profile.bio || "Ingen biografi tillgänglig."}
                    </p>
                </div>

                <div className={styles.profileCard}>
                    <h3>Kontaktuppgifter</h3>

                    <div className={styles.accountInfo}>
                        <div className={styles.accountInfoItem}>
                            <Mail size={19} />
                            <div>
                                <span>E-postadress</span>
                                <a href={`mailto:${profile.email}`}>
                                    {profile.email}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {canEdit && profile.status && pendingStatus && (
                <ConfirmDialog
                    title="Bekräfta statusändring"
                    message={
                        <>
                            Vill du ändra status för <strong>{userName}</strong>{" "}
                            från <strong>{statusLabels[profile.status]}</strong>{" "}
                            till <strong>{statusLabels[pendingStatus]}</strong>?
                            {pendingStatus !== Status.ACTIVE && (
                                <span className="mt-3 block">
                                    Användaren kommer inte kunna logga in med
                                    denna status.
                                </span>
                            )}
                        </>
                    }
                    confirmLabel="Bekräfta"
                    onConfirm={handleConfirmStatus}
                    onCancel={handleCancel}
                    isPending={statusMutation.isPending}
                    errorMessage={error}
                />
            )}

            {canEdit && pendingRole && (
                <ConfirmDialog
                    title="Bekräfta behörighetsändring"
                    message={
                        <>
                            Vill du ändra behörigheten för{" "}
                            <strong>{userName}</strong> från{" "}
                            <strong>{roleLabels[profile.accessRole]}</strong>{" "}
                            till <strong>{roleLabels[pendingRole]}</strong>?
                        </>
                    }
                    confirmLabel="Bekräfta"
                    onConfirm={handleConfirmRole}
                    onCancel={handleCancel}
                    isPending={roleMutation.isPending}
                    errorMessage={error}
                />
            )}
        </>
    );
};

export default UserProfileCard;
