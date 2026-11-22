import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Mail, CalendarDays, ShieldCheck, Pencil } from "lucide-react";

import { useMyProfile } from "../hooks/useMyProfile";
import useUpdateMyProfile from "../hooks/UsersHooks/useUpdateMyProfile";
import useChangePassword from "../hooks/UsersHooks/useChangePassword";
import type { UpdateProfileRequest } from "../types/UpdateProfileRequest";
import { AccessRole } from "../types/AccessRole";
import AvatarPicker from "../components/common/AvatarPicker";
import { AVATAR_IDS } from "../utils/avatarUtils";
import type { AvatarId } from "../utils/avatarUtils";
import styles from "./MyProfilePage.module.css";
import UserBadges from "../components/common/UserBadges";
import { ProfileSkeleton } from "../components/Loaders/Skeletons/ProfileSkeleton";
import UserAvatar from "../components/common/UserAvatar";

// Reusable password visibility button
type PasswordToggleProps = {
    isVisible: boolean;
    onToggle: () => void;
};

const PasswordToggle = ({ isVisible, onToggle }: PasswordToggleProps) => (
    <button
        type="button"
        className={styles.passwordToggle}
        aria-label={isVisible ? "Dölj lösenord" : "Visa lösenord"}
        aria-pressed={isVisible}
        onClick={onToggle}
    >
        {isVisible ? (
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
            >
                <path d="M3 3l18 18" />
                <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                <path d="M9.9 5.3A10.8 10.8 0 0 1 12 5c5 0 9 7 9 7a15 15 0 0 1-3.2 3.7" />
                <path d="M6.1 6.1C3.7 7.8 3 12 3 12s4 7 9 7a9 9 0 0 0 4.2-1" />
            </svg>
        ) : (
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
            >
                <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        )}
    </button>
);

const MyProfilePage = () => {
    const { data: profile, isLoading, isError } = useMyProfile();
    const updateProfile = useUpdateMyProfile();
    const changePassword = useChangePassword();

    // Separate editing states
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingAccount, setIsEditingAccount] = useState(false);

    const [showAvatarPicker, setShowAvatarPicker] = useState(false);
    const [selectedAvatarId, setSelectedAvatarId] = useState<AvatarId | null>(
        null,
    );

    // Password visibility states
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Profile form
    const [formData, setFormData] = useState<UpdateProfileRequest>({
        firstName: "",
        lastName: "",
        email: "",
        bio: "",
        profileImageUrl: null,
    });

    // Account form
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleEditProfile = () => {
        if (!profile) return;

        setFormData({
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            bio: profile.bio,
            profileImageUrl: profile.profileImageUrl,
        });

        const savedAvatar =
            AVATAR_IDS.find(
                (avatarId) =>
                    profile.profileImageUrl === `dicebear:${avatarId}`,
            ) ?? null;

        setSelectedAvatarId(savedAvatar);
        setShowAvatarPicker(false);
        updateProfile.reset();
        setIsEditingProfile(true);
    };

    const handleEditAccount = () => {
        if (!profile) return;

        setEmail(profile.email);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordError("");

        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);

        updateProfile.reset();
        changePassword.reset();
        setIsEditingAccount(true);
    };

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    // Save personal information
    const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateProfile.mutate(
            {
                ...formData,
                bio: formData.bio?.trim() || null,
                profileImageUrl: selectedAvatarId
                    ? `dicebear:${selectedAvatarId}`
                    : formData.profileImageUrl,
            },
            {
                onSuccess: () => {
                    setIsEditingProfile(false);
                    setShowAvatarPicker(false);
                },
            },
        );
    };

    // Save email address
    const handleEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!profile) return;

        updateProfile.mutate({
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: email.trim(),
            bio: profile.bio,
            profileImageUrl: profile.profileImageUrl,
        });
    };

    // Change password
    const handlePasswordSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPasswordError("");

        if (newPassword.length < 12) {
            setPasswordError("Det nya lösenordet måste vara minst 12 tecken.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError("De nya lösenorden matchar inte.");
            return;
        }

        if (newPassword === currentPassword) {
            setPasswordError(
                "Det nya lösenordet måste skilja sig från det nuvarande.",
            );
            return;
        }

        changePassword.mutate(
            {
                currentPassword,
                newPassword,
            },
            {
                onSuccess: () => {
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setPasswordError("");
                    setShowCurrentPassword(false);
                    setShowNewPassword(false);
                    setShowConfirmPassword(false);
                },
            },
        );
    };

    const handleCancelProfile = () => {
        setIsEditingProfile(false);
        setShowAvatarPicker(false);
        setSelectedAvatarId(null);
        updateProfile.reset();
    };

    const handleCancelAccount = () => {
        setIsEditingAccount(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordError("");

        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);

        updateProfile.reset();
        changePassword.reset();
    };

    if (isLoading) {
        return <ProfileSkeleton />;
    }

    if (isError || !profile) {
        return (
            <section className={styles.profilePage}>
                <div className={styles.errorMessage}>
                    Kunde inte hämta din profil. Försök igen senare.
                </div>
            </section>
        );
    }

    const createdAt = new Date(profile.createdAt).toLocaleDateString("sv-SE", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <section className={styles.profilePage}>
            <header className={styles.pageHeader}>
                <h1>Min profil</h1>
                <p>Här kan du se dina profil- och kontouppgifter.</p>
            </header>

            {/* Profile header */}
            <div className={styles.profileHeader}>
                <div className={styles.avatarSection}>
                    <UserAvatar
                        size={96}
                        profileImageUrl={
                            isEditingProfile && selectedAvatarId
                                ? `dicebear:${selectedAvatarId}`
                                : profile.profileImageUrl
                        }
                    />

                    {isEditingProfile && (
                        <button
                            type="button"
                            className={styles.avatarButton}
                            onClick={() =>
                                setShowAvatarPicker((previous) => !previous)
                            }
                        >
                            <Pencil size={16} />
                            {showAvatarPicker
                                ? "Dölj avatarer"
                                : "Byt profilbild"}
                        </button>
                    )}
                </div>

                <div className={styles.profileInfo}>
                    <h2>
                        {isEditingProfile
                            ? `${formData.firstName} ${formData.lastName}`
                            : `${profile.firstName} ${profile.lastName}`}
                    </h2>

                    <UserBadges
                        userType={profile.userType}
                        school={profile.school}
                        programName={profile.programName}
                        className={profile.className}
                    />
                </div>

                {!isEditingProfile && (
                    <button
                        type="button"
                        className={styles.editButton}
                        onClick={handleEditProfile}
                    >
                        <Pencil size={17} />
                        Redigera profil
                    </button>
                )}
            </div>

            {/* Edit personal information */}
            {isEditingProfile ? (
                <div className={styles.profileCard}>
                    <h3>Redigera personuppgifter</h3>

                    <form
                        className={styles.editForm}
                        onSubmit={handleProfileSubmit}
                    >
                        {showAvatarPicker && (
                            <AvatarPicker
                                selectedAvatarId={selectedAvatarId}
                                onSelect={setSelectedAvatarId}
                            />
                        )}

                        <label className={styles.formField}>
                            Förnamn
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label className={styles.formField}>
                            Efternamn
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label className={styles.formField}>
                            Om mig
                            <textarea
                                name="bio"
                                value={formData.bio ?? ""}
                                onChange={handleChange}
                                maxLength={500}
                                rows={5}
                            />
                        </label>

                        {updateProfile.isError && (
                            <div className={styles.errorMessage}>
                                {updateProfile.error.message}
                            </div>
                        )}

                        <div className={styles.formActions}>
                            <button
                                type="submit"
                                className={styles.saveButton}
                                disabled={updateProfile.isPending}
                            >
                                {updateProfile.isPending
                                    ? "Sparar..."
                                    : "Spara ändringar"}
                            </button>

                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={handleCancelProfile}
                            >
                                Avbryt
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className={styles.profileContent}>
                    {/* Personal information */}
                    <div className={styles.profileCard}>
                        <h3>Om mig</h3>

                        <p className={styles.bio}>
                            {profile.bio || "Berätta lite om dig själv."}
                        </p>
                    </div>

                    {/* Account information */}
                    <div className={styles.profileCard}>
                        <div className={styles.cardHeader}>
                            <h3>Kontouppgifter</h3>

                            {!isEditingAccount && (
                                <button
                                    type="button"
                                    className={styles.editButton}
                                    onClick={handleEditAccount}
                                >
                                    <Pencil size={15} />
                                    Ändra
                                </button>
                            )}
                        </div>

                        {isEditingAccount ? (
                            <div className={styles.accountEditForms}>
                                {/* Email */}
                                <form
                                    className={styles.editForm}
                                    onSubmit={handleEmailSubmit}
                                >
                                    <h4>Ändra e-postadress</h4>

                                    <label className={styles.formField}>
                                        E-postadress
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(event) =>
                                                setEmail(event.target.value)
                                            }
                                            required
                                        />
                                    </label>

                                    {updateProfile.isError && (
                                        <div className={styles.errorMessage}>
                                            {updateProfile.error.message}
                                        </div>
                                    )}

                                    {updateProfile.isSuccess && (
                                        <div className={styles.successMessage}>
                                            E-postadressen har uppdaterats!
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className={styles.saveButton}
                                        disabled={
                                            updateProfile.isPending ||
                                            email.trim() === profile.email
                                        }
                                    >
                                        {updateProfile.isPending
                                            ? "Sparar..."
                                            : "Spara e-postadress"}
                                    </button>
                                </form>

                                <div className={styles.sectionDivider} />

                                {/* Password */}
                                <form
                                    className={styles.editForm}
                                    onSubmit={handlePasswordSubmit}
                                >
                                    <h4>Ändra lösenord</h4>

                                    <label className={styles.formField}>
                                        Nuvarande lösenord
                                        <div
                                            className={
                                                styles.passwordInputWrapper
                                            }
                                        >
                                            <input
                                                type={
                                                    showCurrentPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={currentPassword}
                                                onChange={(event) =>
                                                    setCurrentPassword(
                                                        event.target.value,
                                                    )
                                                }
                                                autoComplete="current-password"
                                                required
                                            />

                                            <PasswordToggle
                                                isVisible={showCurrentPassword}
                                                onToggle={() =>
                                                    setShowCurrentPassword(
                                                        (previous) => !previous,
                                                    )
                                                }
                                            />
                                        </div>
                                    </label>

                                    <label className={styles.formField}>
                                        Nytt lösenord
                                        <div
                                            className={
                                                styles.passwordInputWrapper
                                            }
                                        >
                                            <input
                                                type={
                                                    showNewPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={newPassword}
                                                onChange={(event) =>
                                                    setNewPassword(
                                                        event.target.value,
                                                    )
                                                }
                                                autoComplete="new-password"
                                                minLength={12}
                                                required
                                            />

                                            <PasswordToggle
                                                isVisible={showNewPassword}
                                                onToggle={() =>
                                                    setShowNewPassword(
                                                        (previous) => !previous,
                                                    )
                                                }
                                            />
                                        </div>
                                    </label>

                                    <label className={styles.formField}>
                                        Bekräfta nytt lösenord
                                        <div
                                            className={
                                                styles.passwordInputWrapper
                                            }
                                        >
                                            <input
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={confirmPassword}
                                                onChange={(event) =>
                                                    setConfirmPassword(
                                                        event.target.value,
                                                    )
                                                }
                                                autoComplete="new-password"
                                                minLength={12}
                                                required
                                            />

                                            <PasswordToggle
                                                isVisible={showConfirmPassword}
                                                onToggle={() =>
                                                    setShowConfirmPassword(
                                                        (previous) => !previous,
                                                    )
                                                }
                                            />
                                        </div>
                                    </label>

                                    {passwordError && (
                                        <div className={styles.errorMessage}>
                                            {passwordError}
                                        </div>
                                    )}

                                    {changePassword.isError && (
                                        <div className={styles.errorMessage}>
                                            {changePassword.error.message}
                                        </div>
                                    )}

                                    {changePassword.isSuccess && (
                                        <div className={styles.successMessage}>
                                            Lösenordet har ändrats!
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className={styles.saveButton}
                                        disabled={changePassword.isPending}
                                    >
                                        {changePassword.isPending
                                            ? "Ändrar lösenord..."
                                            : "Ändra lösenord"}
                                    </button>
                                </form>

                                <div className={styles.sectionDivider} />

                                <button
                                    type="button"
                                    className={styles.cancelButton}
                                    onClick={handleCancelAccount}
                                >
                                    Stäng
                                </button>
                            </div>
                        ) : (
                            <div className={styles.accountInfo}>
                                <div className={styles.accountInfoItem}>
                                    <Mail size={19} />
                                    <div>
                                        <span>E-postadress</span>
                                        <p>{profile.email}</p>
                                    </div>
                                </div>

                                <div className={styles.accountInfoItem}>
                                    <CalendarDays size={19} />
                                    <div>
                                        <span>Kontot skapades</span>
                                        <p>{createdAt}</p>
                                    </div>
                                </div>

                                {profile.accessRole === AccessRole.ADMIN && (
                                    <div className={styles.accountInfoItem}>
                                        <ShieldCheck size={19} />
                                        <div>
                                            <span>Behörighetsroll</span>
                                            <p>Administratör</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default MyProfilePage;
