
export const API_URL = "http://localhost:8080";

export const TOKEN_KEY = "intranet_token";

export class UnauthorizedError extends Error {
    constructor() {
        super("Din inloggning är inte längre giltig.");
        this.name = "UnauthorizedError";
    }
}

export const apiFetch = async (
    path: string,
    options: RequestInit = {},
): Promise<Response> => {
    const token = sessionStorage.getItem(TOKEN_KEY);

    const headers = new Headers(options.headers);

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        sessionStorage.removeItem(TOKEN_KEY);
        window.dispatchEvent(new Event("auth:unauthorized"));
        throw new UnauthorizedError();
    }

    return response;
};

export async function testConnection(): Promise<string> {
    const response = await fetch(`${API_URL}/api/test`);

    if (!response.ok) {
        throw new Error(`Backend svarade med status ${response.status}`);
    }

    return response.text();
}
