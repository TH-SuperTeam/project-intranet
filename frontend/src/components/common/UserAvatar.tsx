import { useState } from "react";
import { UserRound } from "lucide-react";

interface UserAvatarProps {
    size?: number;
    profileImageUrl?: string | null;
}

const UserAvatar = ({ size = 48, profileImageUrl }: UserAvatarProps) => {
    const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);

    const showImage = !!profileImageUrl && failedImageUrl !== profileImageUrl;

    return (
        <div
            className="flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-(--color-primary-light)] bg-(--color-secondary-soft)] text-(--color-primary)]"
            style={{ width: size, height: size }}
        >
            {showImage ? (
                <img
                    src={profileImageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                    onError={() => setFailedImageUrl(profileImageUrl)}
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
