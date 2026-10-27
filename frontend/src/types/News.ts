import type { TargetAudience } from "./TargetAudience";

export interface News {
    id: number;
    title: string;
    content: string;
    userId: number;
    isPublished: boolean;
    targetAudience: TargetAudience;
    createdAt: string;
}
