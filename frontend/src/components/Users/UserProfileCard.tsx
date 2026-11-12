
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
        <section className={styles.profileCard}>
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

            <div className={styles.profileContent}>
                {profile.bio && (
                    <div className={styles.infoSection}>
                        <h3>Om mig</h3>
                        <p>{profile.bio}</p>
                    </div>
                )}

                <div className={styles.infoSection}>
                    <h3>Kontaktuppgifter</h3>

                    <div className={styles.email}>
                        <Mail size={19} />

                        <a href={`mailto:${profile.email}`}>
                            {profile.email}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfileCard;
