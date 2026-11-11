import { UserRound } from "lucide-react";

interface UserAvatarProps {
    size?: number;
    profileImageUrl?: string | null;
}

const UserAvatar = ({ size = 48, profileImageUrl }: UserAvatarProps) => {
    return (
        <div
            className="flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[var(--color-primary-light)] bg-[var(--color-secondary-soft)] text-[var(--color-primary)]"
            style={{ width: size, height: size }}
        >
            {profileImageUrl ? (
                <img
                    src={profileImageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                />
            ) : (
                <UserRound
                    size={size * 0.65}
                    strokeWidth={2}
                    aria-hidden="true"
                />
            )}
        </div>
    );
};

export default UserAvatar;
