import { UserRound } from "lucide-react";

interface UserAvatarProps {
    size?: number;
    profileImageUrl?: string | null;
}

const UserAvatar = ({ size = 48 }: UserAvatarProps) => {
    return (
        <div
            className="flex shrink-0 items-center justify-center rounded-full bg-(--color-primary-light)] text-white"
            style={{ width: size, height: size }}
        >
            <UserRound size={size * 0.6} strokeWidth={1.5} aria-hidden="true" />
        </div>
    );
};

export default UserAvatar;
