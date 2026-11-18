import type { UserType } from "../../types/UserType";
import { formatEducation } from "../../utils/formatEducation";

type UserBadgesProps = {
    userType: UserType;
    school: "TH" | "VH" | null;
    programName: string | null;
    className: string | null;
};

export default function UserBadges({
    userType,
    school,
    programName,
    className,
}: UserBadgesProps) {
    const schoolColor =
        school === "VH" ? "bg-(--color-vh-primary)" : "bg-(--color-th-primary)";

    return (
        <div className="flex flex-wrap items-center gap-2">
            {/* Användartyp */}
            <span className="inline-flex w-fit rounded-full bg-(--color-primary-soft) px-3 py-1 text-sm font-semibold text-(--color-primary)">
                {userType === "STUDENT" ? "Student" : "Lärare"}
            </span>

            {/* Skoltillhörighet */}
            {school && (
                <span
                    className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-semibold text-(--color-text-white) ${schoolColor}`}
                    title={
                        school === "TH" ? "Teknikhögskolan" : "Vårdhögskolan"
                    }
                >
                    {school}
                </span>
            )}

            {/* Utbildning och klass */}
            {programName && (
                <span className="inline-flex w-fit max-w-full rounded-full bg-(--color-primary-light) px-3 py-1 text-sm font-semibold text-(--color-text-white) wrap-break-word">
                    {formatEducation(programName, className)}
                </span>
            )}
        </div>
    );
}
