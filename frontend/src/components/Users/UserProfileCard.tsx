
import { Mail } from "lucide-react";
import UserAvatar from "../common/UserAvatar";
import type { UserProfile } from "../../types/UserProfile";
import { UserType } from "../../types/UserType";
import styles from "./UserProfileCard.module.css";

interface UserProfileCardProps {
    profile: UserProfile;
}

const userTypeLabels: Record<UserType, string> = {
    [UserType.TEACHER]: "Personal",
    [UserType.STUDENT]: "Student",
};

const UserProfileCard = ({ profile }: UserProfileCardProps) => {
    return (
        <>
            {/* Profile header */}
            <div className={styles.profileHeader}>
                <UserAvatar
                    size={130}
                    profileImageUrl={profile.profileImageUrl}
                />

                <div className={styles.profileInfo}>
                    <h2>
                        {profile.firstName} {profile.lastName}
                    </h2>

                    <span className={styles.userType}>
                        {userTypeLabels[profile.userType]}
                    </span>
                </div>
            </div>

            {/* Profile content */}
            <div className={styles.profileContent}>
                {/* Biography */}
                <div className={styles.profileCard}>
                    <h3>Om mig</h3>

                    <p className={styles.bio}>
                        {profile.bio || "Ingen biografi tillgänglig."}
                    </p>
                </div>

                {/* Contact information */}
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
        </>
    );
};

export default UserProfileCard;
