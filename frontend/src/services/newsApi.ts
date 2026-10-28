import type { CreateNewsRequest } from "../types/CreateNewsRequest";
import type { News } from "../types/News";
import type { TargetAudience } from "../types/TargetAudience";

export const publishNews = async (news: CreateNewsRequest) => {
    const res = await fetch("http://localhost:8080/api/news", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(news),
    });

    if (!res.ok) {
        throw new Error("Kunde inte publicera nyheten.");
    }

    return res.json();
};

export const getNews = async (audience: TargetAudience): Promise<News[]> => {
    const params = new URLSearchParams({ targetAudience: audience });
    const res = await fetch(`http://localhost:8080/api/news?${params}`);

    if (!res.ok) {
        throw new Error(`Kunde inte hämta nyheter (${res.status}).`);
    }

    return res.json();
};

export const deleteNews = async (id: number): Promise<void> => {
    const res = await fetch(`http://localhost:8080/api/news/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Kunde inte ta bort nyheten.");
    }
};
