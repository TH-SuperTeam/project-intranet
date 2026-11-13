export enum Status {
    ACTIVE = "ACTIVE",
    SUSPENDED = "SUSPENDED",
    GRADUATED = "GRADUATED",
    WITHDRAWN = "WITHDRAWN",
    TERMINATED = "TERMINATED",
    ON_LEAVE = "ON_LEAVE",
    PAUSED = "PAUSED",
}

export const statusLabels: Record<Status, string> = {
    [Status.ACTIVE]: "Aktiv",
    [Status.SUSPENDED]: "Avstängd",
    [Status.GRADUATED]: "Examinerad",
    [Status.WITHDRAWN]: "Avbruten",
    [Status.TERMINATED]: "Avslutad",
    [Status.ON_LEAVE]: "Tjänstledig",
    [Status.PAUSED]: "Pausad",
};

export const statusColors: Record<Status, string> = {
    [Status.ACTIVE]: "border-[#b5d8c3] bg-[#dceee3] text-[#276749]",
    [Status.SUSPENDED]: "border-[#e5b9ba] bg-[#f3dedd] text-[#923f48]",
    [Status.GRADUATED]: "border-[#bdcfe8] bg-[#dfe8f5] text-[#345c91]",
    [Status.WITHDRAWN]: "border-[#e8cbb4] bg-[#f5e5d7] text-[#965b35]",
    [Status.TERMINATED]: "border-[#cdd0d5] bg-[#e8e9ec] text-[#4b5563]",
    [Status.ON_LEAVE]: "border-[#d2c1e2] bg-[#eae2f2] text-[#72518c]",
    [Status.PAUSED]: "border-[#e2d59c] bg-[#f2eacb] text-[#806522]",
};
