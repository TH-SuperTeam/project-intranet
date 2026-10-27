import type { CreateNewsRequest } from "../types/CreateNewsRequest";
import type { News } from "../types/News";

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

export const getNews = async (): Promise<News[]> => {
    const res = await fetch("http://localhost:8080/api/news");

    if (!res.ok) {
        throw new Error("Kunde inte hämta nyheter.");
    }
    const news: News[] = await res.json();
    return news;
};
