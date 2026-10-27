import type { CreateNewsRequest } from "../types/CreateNewsRequest";

export const publishNews = async (news: CreateNewsRequest) => {
    const response = await fetch("http://localhost:8080/api/news", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(news),
    });

    if (!response.ok) {
        throw new Error("Kunde inte publicera nyheten.");
    }

    return response.json();
};
