import { beforeEach, describe, expect, it } from "vitest";
import type {
  CreateFeatureRequest,
  CreateProjectRequest,
  FeatureListResponse,
  FeatureResponse,
  ProjectResponse
} from "@software-delivery-planner/shared";
import { buildApp } from "../app.js";
import { featureRepository } from "../modules/features/repository.js";
import { projectRepository } from "../modules/projects/repository.js";

const validCreateProjectRequest: CreateProjectRequest = {
  name: "Customer Portal Rebuild",
  description: "Rebuild the legacy customer portal.",
  businessGoal: "Improve delivery predictability.",
  startDate: "2026-01-01",
  targetEndDate: "2026-03-31",
  teamSize: 4,
  estimatedTotalEffort: 240
};

const validCreateFeatureRequest: Omit<
  CreateFeatureRequest,
  "projectId"
> = {
  title: "Project dashboard",
  description: "Show the current project delivery summary.",
  businessValue: "Make delivery status visible.",
  priority: "high",
  status: "proposed",
  isMvp: true
};

beforeEach(() => {
  featureRepository.clear();
  projectRepository.clear();
});

async function createProject(
  app: Awaited<ReturnType<typeof buildApp>>,
  name = validCreateProjectRequest.name
): Promise<ProjectResponse> {
  const response = await app.inject({
    method: "POST",
    url: "/projects",
    payload: {
      ...validCreateProjectRequest,
      name
    }
  });

  return JSON.parse(response.body) as ProjectResponse;
}

describe("feature routes", () => {
  it("creates a feature and lists it only for its project", async () => {
    const app = await buildApp();

    try {
      const project = await createProject(app);
      const otherProject = await createProject(app, "Internal platform");

      const createResponse = await app.inject({
        method: "POST",
        url: `/projects/${project.id}/features`,
        payload: validCreateFeatureRequest
      });

      expect(createResponse.statusCode).toBe(201);

      const createdFeature = JSON.parse(
        createResponse.body
      ) as FeatureResponse;

      expect(createdFeature.id).toEqual(expect.any(String));
      expect(createdFeature.projectId).toBe(project.id);
      expect(createdFeature.title).toBe(validCreateFeatureRequest.title);
      expect(createdFeature.createdAt).toEqual(expect.any(String));
      expect(createdFeature.updatedAt).toEqual(expect.any(String));

      const projectListResponse = await app.inject({
        method: "GET",
        url: `/projects/${project.id}/features`
      });
      const projectList = JSON.parse(
        projectListResponse.body
      ) as FeatureListResponse;

      expect(projectListResponse.statusCode).toBe(200);
      expect(projectList.features).toHaveLength(1);
      expect(projectList.features[0]?.id).toBe(createdFeature.id);

      const otherProjectListResponse = await app.inject({
        method: "GET",
        url: `/projects/${otherProject.id}/features`
      });
      const otherProjectList = JSON.parse(
        otherProjectListResponse.body
      ) as FeatureListResponse;

      expect(otherProjectListResponse.statusCode).toBe(200);
      expect(otherProjectList.features).toEqual([]);
    } finally {
      await app.close();
    }
  });

  it("updates feature priority and status", async () => {
    const app = await buildApp();

    try {
      const project = await createProject(app);
      const createResponse = await app.inject({
        method: "POST",
        url: `/projects/${project.id}/features`,
        payload: validCreateFeatureRequest
      });
      const createdFeature = JSON.parse(
        createResponse.body
      ) as FeatureResponse;

      const updateResponse = await app.inject({
        method: "PATCH",
        url: `/features/${createdFeature.id}`,
        payload: {
          priority: "medium",
          status: "in_progress"
        }
      });

      expect(updateResponse.statusCode).toBe(200);

      const updatedFeature = JSON.parse(
        updateResponse.body
      ) as FeatureResponse;

      expect(updatedFeature.id).toBe(createdFeature.id);
      expect(updatedFeature.projectId).toBe(project.id);
      expect(updatedFeature.priority).toBe("medium");
      expect(updatedFeature.status).toBe("in_progress");
      expect(updatedFeature.createdAt).toBe(createdFeature.createdAt);
    } finally {
      await app.close();
    }
  });

  it("rejects invalid feature values", async () => {
    const app = await buildApp();

    try {
      const project = await createProject(app);
      const response = await app.inject({
        method: "POST",
        url: `/projects/${project.id}/features`,
        payload: {
          ...validCreateFeatureRequest,
          priority: "urgent"
        }
      });

      expect(response.statusCode).toBe(400);
    } finally {
      await app.close();
    }
  });

  it("returns 404 when the project does not exist", async () => {
    const app = await buildApp();

    try {
      const createResponse = await app.inject({
        method: "POST",
        url: "/projects/missing-project-id/features",
        payload: validCreateFeatureRequest
      });
      const listResponse = await app.inject({
        method: "GET",
        url: "/projects/missing-project-id/features"
      });

      expect(createResponse.statusCode).toBe(404);
      expect(listResponse.statusCode).toBe(404);
    } finally {
      await app.close();
    }
  });

  it("returns 404 when the feature does not exist", async () => {
    const app = await buildApp();

    try {
      const response = await app.inject({
        method: "PATCH",
        url: "/features/missing-feature-id",
        payload: {
          status: "done"
        }
      });

      expect(response.statusCode).toBe(404);

      const body = JSON.parse(response.body) as { message: string };

      expect(body.message).toContain("missing-feature-id");
    } finally {
      await app.close();
    }
  });
});
