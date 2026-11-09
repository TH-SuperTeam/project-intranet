import type { TargetAudience } from "./TargetAudience";

export interface CreateNewsRequest {
    title: string;
    content: string;
    targetAudience: TargetAudience;
}
