export const formatEducation = (
    programName: string | null,
    className: string | null,
): string => {
    if (!programName) return "";

    return className ? `${programName} ${className}` : programName;
};
