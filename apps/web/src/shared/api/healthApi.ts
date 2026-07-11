export type HealthResponse = {
  status: string;
  service: string;
};

const API_BASE_URL = "http://127.0.0.1:3001";

export async function getApiHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/health`);

  if (!response.ok) {
    throw new Error("Unable to fetch API health status");
  }

  return response.json() as Promise<HealthResponse>;
}