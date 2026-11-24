import type { SchoolName } from "../../types/SchoolName";
import type { UserType } from "../../types/UserType";
import { formatEducation } from "../../utils/formatEducation";

type UserBadgesProps = {
    userType: UserType;
    school: SchoolName | null;
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

    const programColor =
        school === "VH"
            ? "bg-(--color-vh-primary-light)"
            : "bg-(--color-th-primary-light)";

    return (
        <div className="flex flex-wrap items-center gap-2">
            {/* Användartyp */}
            <span className="inline-flex w-fit rounded-full bg-(--color-primary-soft) px-3 py-1 text-sm font-semibold text-(--color-primary)">
                {userType === "STUDENT" ? "Student" : "Lärare"}
            </span>

            {/* Skoltillhörighet */}
            {school && (
                <span
                    className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-semibold text-white ${schoolColor}`}
                    title={
                        school === "TH"
                            ? "Teknikhögskolan"
                            : "Vårdyrkeshögskolan"
                    }
                >
                    {school}
                </span>
            )}

            {/* Utbildning och klass */}
            {programName && (
                <span
                    className={`inline-flex w-fit max-w-full rounded-full px-3 py-1 text-sm font-semibold text-white wrap-break-word ${programColor}`}
                >
                    {formatEducation(programName, className)}
                </span>
            )}
        </div>
    );
}
