import type {
  CreateProjectRequest,
  ProjectListResponse,
  ProjectResponse
} from "@software-delivery-planner/shared";

const API_BASE_URL = "http://127.0.0.1:3001";

type ApiErrorResponse = {
  message?: string;
};

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const body = (await response.json()) as unknown;

  if (!response.ok) {
    const errorBody = body as ApiErrorResponse;

    throw new Error(errorBody.message ?? "Unexpected API error");
  }

  return body as T;
}

export async function fetchProjects(): Promise<ProjectListResponse> {
  const response = await fetch(`${API_BASE_URL}/projects`);

  return parseJsonResponse<ProjectListResponse>(response);
}

export async function createProject(
  payload: CreateProjectRequest
): Promise<ProjectResponse> {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return parseJsonResponse<ProjectResponse>(response);
}