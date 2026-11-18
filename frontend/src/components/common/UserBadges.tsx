import type { UserType } from "../../types/UserType";
import { formatEducation } from "../../utils/formatEducation";

type UserBadgesProps = {
    userType: UserType;
    programName: string | null;
    className: string | null;
};

export default function UserBadges({
    userType,
    programName,
    className,
}: UserBadgesProps) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex w-fit rounded-full bg-(--color-primary-soft) px-3 py-1 text-sm font-semibold text-(--color-primary)">
                {userType === "STUDENT" ? "Student" : "Lärare"}
            </span>

            {programName && (
                <span className="inline-flex w-fit rounded-full bg-(--color-primary) px-3 py-1 text-sm font-semibold text-(--color-text-white) wrap-anywhere">
                    {formatEducation(programName, className)}
                </span>
            )}
        </div>
    );
}
