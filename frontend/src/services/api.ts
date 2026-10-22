
const API_URL="http://localhost:8080"

export async function testConnection(): Promise<string> {
  const response = await fetch(`${API_URL}/api/test`);

  if (!response.ok) {
    throw new Error(`Backend svarade med status ${response.status}`);
  }

  return response.text();
}